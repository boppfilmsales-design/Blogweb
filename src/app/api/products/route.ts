import { NextRequest, NextResponse } from 'next/server';
import { getProducts as dbGetProducts, createProduct, updateProduct, deleteProduct, importProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET all products
export async function GET() {
  try {
    const products = dbGetProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}