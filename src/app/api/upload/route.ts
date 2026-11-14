// Upload product images to Cloudflare R2 (binding IMAGES).
// Previously uploads were converted to base64 data URLs (2MB cap, stored in
// localStorage). Now the file is stored in R2 and the route returns a URL:
//   - the public R2 URL when R2_PUBLIC_URL is configured, otherwise
//   - the built-in /api/images/<key> proxy route (works with no public bucket).
import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cloudflare-env';
import { publicUrlForKey } from '@/lib/r2-url';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB (R2-backed; was 2MB for base64/localStorage)

function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() || 'upload';
  const cleaned = base.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 100);
  return cleaned || 'upload';
}

// POST upload an image (admin only: uploads write to the R2 bucket)
export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // 检查文件大小 (最大10MB，存到 R2)
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    const env = await getEnv();
    const key = `images/${Date.now()}-${sanitizeFileName(file.name)}`;
    await env.IMAGES.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });

    return NextResponse.json({
      success: true,
      url: publicUrlForKey(key, env.R2_PUBLIC_URL),
      fileName: file.name,
      key,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

// 获取已上传文件列表（R2 中 images/ 前缀下的对象，admin only）
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const env = await getEnv();
    const listed = await env.IMAGES.list({ prefix: 'images/', limit: 100 });
    const files = listed.objects.map((o) => ({
      key: o.key,
      url: publicUrlForKey(o.key, env.R2_PUBLIC_URL),
      size: o.size,
      uploaded: o.uploaded.toISOString(),
    }));
    return NextResponse.json({ files });
  } catch (error) {
    console.error('List uploads error:', error);
    return NextResponse.json({ files: [], error: 'Failed to list uploads' }, { status: 500 });
  }
}
