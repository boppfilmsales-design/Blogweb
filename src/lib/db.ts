// 统一数据层：使用 Prisma + PostgreSQL
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameZh: string;
  category: string;
  descriptionEn: string;
  descriptionZh: string;
  thickness: string;
  width: string;
  length: string;
  weight: string;
  color: string;
  material: string;
  featuresEn: string;
  featuresZh: string;
  applicationsEn: string;
  applicationsZh: string;
  certifications: string;
  images: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

function rowToProduct(r: any): Product {
  return {
    id: r.id,
    slug: r.slug,
    nameEn: r.nameEn || '',
    nameZh: r.nameZh || '',
    category: r.category || '',
    descriptionEn: r.descriptionEn || '',
    descriptionZh: r.descriptionZh || '',
    thickness: r.thickness || '',
    width: r.width || '',
    length: r.length || '',
    weight: r.weight || '',
    color: r.color || '',
    material: r.material || '',
    featuresEn: r.featuresEn || '',
    featuresZh: r.featuresZh || '',
    applicationsEn: r.applicationsEn || '',
    applicationsZh: r.applicationsZh || '',
    certifications: r.certifications || '',
    images: r.images || '',
    featured: !!r.featured,
    createdAt: r.createdAt?.toISOString?.() || r.createdAt || '',
    updatedAt: r.updatedAt?.toISOString?.() || r.updatedAt || '',
  };
}

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return products.map(rowToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { id } });
  return product ? rowToProduct(product) : null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? rowToProduct(product) : null;
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const now = new Date();
  const created = await prisma.product.create({
    data: {
      id: product.id || crypto.randomUUID(),
      slug: product.slug || product.id || crypto.randomUUID(),
      nameEn: product.nameEn || '',
      nameZh: product.nameZh || '',
      category: product.category || '',
      descriptionEn: product.descriptionEn || '',
      descriptionZh: product.descriptionZh || '',
      thickness: product.thickness || '',
      width: product.width || '',
      length: product.length || '',
      weight: product.weight || '',
      color: product.color || '',
      material: product.material || '',
      featuresEn: product.featuresEn || '',
      featuresZh: product.featuresZh || '',
      applicationsEn: product.applicationsEn || '',
      applicationsZh: product.applicationsZh || '',
      certifications: product.certifications || '',
      images: product.images || '',
      featured: product.featured || false,
    }
  });
  return rowToProduct(created);
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return null;
  
  const updated = await prisma.product.update({
    where: { id },
    data: {
      slug: updates.slug || existing.slug,
      nameEn: updates.nameEn || existing.nameEn,
      nameZh: updates.nameZh || existing.nameZh,
      category: updates.category || existing.category,
      descriptionEn: updates.descriptionEn || existing.descriptionEn,
      descriptionZh: updates.descriptionZh || existing.descriptionZh,
      thickness: updates.thickness || existing.thickness,
      width: updates.width || existing.width,
      length: updates.length || existing.length,
      weight: updates.weight || existing.weight,
      color: updates.color || existing.color,
      material: updates.material || existing.material,
      featuresEn: updates.featuresEn || existing.featuresEn,
      featuresZh: updates.featuresZh || existing.featuresZh,
      applicationsEn: updates.applicationsEn || existing.applicationsEn,
      applicationsZh: updates.applicationsZh || existing.applicationsZh,
      certifications: updates.certifications || existing.certifications,
      images: updates.images || existing.images,
      featured: updates.featured ?? existing.featured,
    }
  });
  return rowToProduct(updated);
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function importProducts(newProducts: Partial<Product>[]): Promise<{
  created: number; updated: number; failed: number;
}> {
  const results = { created: 0, updated: 0, failed: 0 };
  
  for (const product of newProducts) {
    try {
      if (!product.slug) { results.failed++; continue; }
      
      const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
      
      if (existing) {
        await prisma.product.update({
          where: { slug: product.slug },
          data: {
            nameEn: product.nameEn || existing.nameEn,
            nameZh: product.nameZh || existing.nameZh,
            category: product.category || existing.category,
            descriptionEn: product.descriptionEn || existing.descriptionEn,
            descriptionZh: product.descriptionZh || existing.descriptionZh,
            thickness: product.thickness || existing.thickness,
            width: product.width || existing.width,
            length: product.length || existing.length,
            weight: product.weight || existing.weight,
            color: product.color || existing.color,
            material: product.material || existing.material,
            featuresEn: product.featuresEn || existing.featuresEn,
            featuresZh: product.featuresZh || existing.featuresZh,
            applicationsEn: product.applicationsEn || existing.applicationsEn,
            applicationsZh: product.applicationsZh || existing.applicationsZh,
            certifications: product.certifications || existing.certifications,
            images: product.images || existing.images,
            featured: product.featured ?? existing.featured,
          }
        });
        results.updated++;
      } else {
        await prisma.product.create({
          data: {
            id: product.id || crypto.randomUUID(),
            slug: product.slug,
            nameEn: product.nameEn || '',
            nameZh: product.nameZh || '',
            category: product.category || '',
            descriptionEn: product.descriptionEn || '',
            descriptionZh: product.descriptionZh || '',
            thickness: product.thickness || '',
            width: product.width || '',
            length: product.length || '',
            weight: product.weight || '',
            color: product.color || '',
            material: product.material || '',
            featuresEn: product.featuresEn || '',
            featuresZh: product.featuresZh || '',
            applicationsEn: product.applicationsEn || '',
            applicationsZh: product.applicationsZh || '',
            certifications: product.certifications || '',
            images: product.images || '',
            featured: product.featured || false,
          }
        });
        results.created++;
      }
    } catch (e) {
      console.error('import failed for', product.slug, e);
      results.failed++;
    }
  }
  return results;
}
