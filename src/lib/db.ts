// 统一数据层：优先使用 Prisma（PostgreSQL），Supabase 作为后备
import { PrismaClient } from '@prisma/client';

// 懒加载 Prisma 客户端
let prisma: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

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

// Get all products
export async function getProducts(): Promise<Product[]> {
  const client = getPrisma();
  const products = await client.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return products.map(serialize);
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const client = getPrisma();
  const product = await client.product.findUnique({ where: { id } });
  return product ? serialize(product) : null;
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const client = getPrisma();
  const product = await client.product.findUnique({ where: { slug } });
  return product ? serialize(product) : null;
}

// Create product
export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const client = getPrisma();
  const created = await client.product.create({ data: product as any });
  return serialize(created);
}

// Update product
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const client = getPrisma();
  try {
    const updated = await client.product.update({ where: { id }, data: updates as any });
    return serialize(updated);
  } catch {
    return null;
  }
}

// Delete product
export async function deleteProduct(id: string): Promise<boolean> {
  const client = getPrisma();
  try {
    await client.product.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

// Import products (upsert by slug)
export async function importProducts(newProducts: Partial<Product>[]): Promise<{
  created: number; updated: number; failed: number;
}> {
  const results = { created: 0, updated: 0, failed: 0 };
  const client = getPrisma();

  for (const product of newProducts) {
    try {
      if (product.slug) {
        const existing = await client.product.findUnique({ where: { slug: product.slug } });
        if (existing) {
          await client.product.update({ where: { id: existing.id }, data: product as any });
          results.updated++;
        } else {
          await client.product.create({ data: product as any });
          results.created++;
        }
      } else {
        results.failed++;
      }
    } catch {
      results.failed++;
    }
  }
  return results;
}

// 序列化 Prisma 返回的对象（确保字段类型正确）
function serialize(p: any): Product {
  return {
    id: p.id,
    slug: p.slug,
    nameEn: p.nameEn || '',
    nameZh: p.nameZh || '',
    category: p.category || '',
    descriptionEn: p.descriptionEn || '',
    descriptionZh: p.descriptionZh || '',
    thickness: p.thickness || '',
    width: p.width || '',
    length: p.length || '',
    weight: p.weight || '',
    color: p.color || '',
    material: p.material || '',
    featuresEn: typeof p.featuresEn === 'string' ? p.featuresEn : JSON.stringify(p.featuresEn || []),
    featuresZh: typeof p.featuresZh === 'string' ? p.featuresZh : JSON.stringify(p.featuresZh || []),
    applicationsEn: typeof p.applicationsEn === 'string' ? p.applicationsEn : JSON.stringify(p.applicationsEn || []),
    applicationsZh: typeof p.applicationsZh === 'string' ? p.applicationsZh : JSON.stringify(p.applicationsZh || []),
    certifications: typeof p.certifications === 'string' ? p.certifications : JSON.stringify(p.certifications || []),
    images: typeof p.images === 'string' ? p.images : JSON.stringify(p.images || []),
    featured: p.featured ?? false,
    createdAt: p.createdAt?.toISOString?.() || new Date().toISOString(),
    updatedAt: p.updatedAt?.toISOString?.() || new Date().toISOString(),
  };
}
