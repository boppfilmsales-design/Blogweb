import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        slug: body.slug,
        nameEn: body.nameEn,
        nameZh: body.nameZh,
        category: body.category,
        descriptionEn: body.descriptionEn,
        descriptionZh: body.descriptionZh,
        thickness: body.thickness,
        width: body.width,
        length: body.length,
        weight: body.weight,
        color: body.color,
        material: body.material,
        featuresEn: body.featuresEn,
        featuresZh: body.featuresZh,
        applicationsEn: body.applicationsEn,
        applicationsZh: body.applicationsZh,
        certifications: body.certifications,
        images: body.images,
        featured: body.featured || false,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
