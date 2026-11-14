import { NextRequest, NextResponse } from 'next/server';
import { importProducts } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// POST import products from JSON (admin only)
export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const body: any = await request.json();
    const products = Array.isArray(body) ? body : body.products;

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid data format. Expected { products: [...] }' }, { status: 400 });
    }

    const results = await importProducts(products);
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
