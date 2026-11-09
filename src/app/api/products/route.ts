import { NextRequest, NextResponse } from 'next/server';
import { getProducts as dbGetProducts, createProduct, updateProduct, deleteProduct, importProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// GET all products
export async function GET() {
  try {
    const products = await dbGetProducts();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products', details: error.message }, { status: 500 });
  }
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