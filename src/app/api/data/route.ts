import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Legacy debug route. The old implementation read public/data/*.json from
// the local filesystem, which does not exist on Cloudflare Pages (Edge
// Runtime has no fs access), so it now returns an empty result.
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {},
    note: 'File-backed data (public/data/) is not available on Cloudflare Pages. Products come from /api/products (D1).',
  });
}
