import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// POST import products from JSON
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = body.products;

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid data format. Expected { products: [...] }' }, { status: 400 });
    }

    const results = {
      created: 0,
      updated: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const product of products) {
      try {
        const existing = await prisma.product.findUnique({
          where: { slug: product.slug },
        });

        if (existing) {
          await prisma.product.update({
            where: { slug: product.slug },
            data: {
              nameEn: product.name?.en || product.nameEn,
              nameZh: product.name?.zh || product.nameZh,
              category: product.category,
              descriptionEn: product.description?.en || product.descriptionEn,
              descriptionZh: product.description?.zh || product.descriptionZh,
              thickness: product.specifications?.thickness || product.thickness,
              width: product.specifications?.width || product.width,
              length: product.specifications?.length || product.length,
              weight: product.specifications?.weight || product.weight,
              color: product.specifications?.color || product.color,
              material: product.specifications?.material || product.material,
              featuresEn: typeof product.features?.en === 'string' ? product.features.en : JSON.stringify(product.features?.en || product.featuresEn || []),
              featuresZh: typeof product.features?.zh === 'string' ? product.features.zh : JSON.stringify(product.features?.zh || product.featuresZh || []),
              applicationsEn: typeof product.applications?.en === 'string' ? product.applications.en : JSON.stringify(product.applications?.en || product.applicationsEn || []),
              applicationsZh: typeof product.applications?.zh === 'string' ? product.applications.zh : JSON.stringify(product.applications?.zh || product.applicationsZh || []),
              certifications: typeof product.certifications === 'string' ? product.certifications : JSON.stringify(product.certifications || []),
              images: typeof product.images === 'string' ? product.images : JSON.stringify(product.images || []),
              featured: product.featured || false,
            },
          });
          results.updated++;
        } else {
          await prisma.product.create({
            data: {
              slug: product.slug,
              nameEn: product.name?.en || product.nameEn,
              nameZh: product.name?.zh || product.nameZh,
              category: product.category,
              descriptionEn: product.description?.en || product.descriptionEn,
              descriptionZh: product.description?.zh || product.descriptionZh,
              thickness: product.specifications?.thickness || product.thickness,
              width: product.specifications?.width || product.width,
              length: product.specifications?.length || product.length,
              weight: product.specifications?.weight || product.weight,
              color: product.specifications?.color || product.color,
              material: product.specifications?.material || product.material,
              featuresEn: typeof product.features?.en === 'string' ? product.features.en : JSON.stringify(product.features?.en || product.featuresEn || []),
              featuresZh: typeof product.features?.zh === 'string' ? product.features.zh : JSON.stringify(product.features?.zh || product.featuresZh || []),
              applicationsEn: typeof product.applications?.en === 'string' ? product.applications.en : JSON.stringify(product.applications?.en || product.applicationsEn || []),
              applicationsZh: typeof product.applications?.zh === 'string' ? product.applications.zh : JSON.stringify(product.applications?.zh || product.applicationsZh || []),
              certifications: typeof product.certifications === 'string' ? product.certifications : JSON.stringify(product.certifications || []),
              images: typeof product.images === 'string' ? product.images : JSON.stringify(product.images || []),
              featured: product.featured || false,
            },
          });
          results.created++;
        }
      } catch (err: any) {
        results.failed++;
        results.errors.push(`Failed to import ${product.slug}: ${err.message}`);
      }
    }

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
