// Health check for the D1 binding (replaces the old Prisma/Supabase check).
import { NextResponse } from 'next/server';
import { getDB } from '@/lib/cloudflare-env';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    const db = await getDB();

    // Try a simple query
    const test = await db.prepare('SELECT 1 AS test').first<{ test: number }>();
    const count = await db.prepare('SELECT COUNT(*) AS count FROM products').first<{ count: number }>();

    return NextResponse.json({
      success: true,
      database: 'D1 (blogweb-db)',
      test: test?.test ?? null,
      productCount: count?.count ?? null,
      message: 'D1 connection successful!'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
