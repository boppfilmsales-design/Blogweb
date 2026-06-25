import { NextRequest, NextResponse } from 'next/server';
import { importProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

// POST import products from JSON
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = body.products;

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid data format. Expected { products: [...] }' }, { status: 400 });
    }

    const results = importProducts(products);
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
