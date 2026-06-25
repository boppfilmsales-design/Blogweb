import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
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
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
