import { NextRequest, NextResponse } from 'next/server';
import { getProducts as dbGetProducts, createProduct, updateProduct, deleteProduct, importProducts } from '@/lib/db';
import { staticProducts } from '@/lib/catalog';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// GET all products.
// If D1 is unavailable (binding missing, query error) the bundled catalogue is
// returned with HTTP 200 instead of a 500: the site's product pages must never
// fail just because the database is having a bad day.
export async function GET() {
  try {
    const products = await dbGetProducts();
    if (products.length > 0) {
      return NextResponse.json(products);
    }
  } catch (error: any) {
    console.error('API products: falling back to bundled catalogue:', error?.message || error);
  }
  return NextResponse.json(staticProducts());
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body: any = await request.json();
    const product = await createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to create product', details: error.message }, { status: 500 });
  }
}
