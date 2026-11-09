// Serve uploaded images from R2 (binding IMAGES) without needing a public bucket.
// Used as the fallback URL for uploads when R2_PUBLIC_URL is not configured:
//   /api/images/images/1699999999999-photo.jpg
// Seeded product images use the public R2 URL instead; this proxy is mainly
// for admin uploads made before public access is enabled.
import { NextRequest, NextResponse } from 'next/server';
import { getR2 } from '@/lib/cloudflare-env';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(
  _request: NextRequest,
  { params }: { params: { key: string[] } }
) {
  const key = params.key.join('/');
  if (!key || key.includes('..')) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const r2 = await getR2();
    const obj = await r2.get(key);
    if (!obj) {
      return new NextResponse('Not found', { status: 404 });
    }

    const headers = new Headers();
    if (obj.httpMetadata?.contentType) headers.set('Content-Type', obj.httpMetadata.contentType);
    if (obj.httpMetadata?.contentDisposition) headers.set('Content-Disposition', obj.httpMetadata.contentDisposition);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    if (obj.httpEtag) headers.set('etag', obj.httpEtag);

    // obj.body is a Cloudflare ReadableStream; at runtime it is a valid
    // Response body, but its type differs from the DOM stream Next.js expects.
    return new NextResponse(obj.body as unknown as BodyInit, { headers });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Failed to load image', { status: 500 });
  }
}
