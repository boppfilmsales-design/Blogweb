// Debug endpoint: reports which Cloudflare bindings are present.
// (Previously leaked the first 80 chars of DATABASE_URL — removed.)
// Admin only: it exposes deployment configuration, not public data.
import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cloudflare-env';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const env = await getEnv();
    return NextResponse.json({
      hasD1: !!env.DB,
      hasR2: !!env.IMAGES,
      hasR2PublicUrl: !!env.R2_PUBLIC_URL,
      nodeEnv: process.env.NODE_ENV,
    });
  } catch (error: any) {
    return NextResponse.json({
      hasD1: false,
      hasR2: false,
      hasR2PublicUrl: false,
      error: error.message,
      nodeEnv: process.env.NODE_ENV,
    });
  }
}
