import { prisma } from './prisma';

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

// Convert Prisma Product to our Product type
function toProduct(prismaProduct: any): Product {
  return {
    ...prismaProduct,
    createdAt: prismaProduct.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: prismaProduct.updatedAt?.toISOString() || new Date().toISOString(),
  };
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return products.map(toProduct);
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id }
  });
  return product ? toProduct(product) : null;
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug }
  });
  return product ? toProduct(product) : null;
}

// Create product
export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const prismaProduct = await prisma.product.create({
    data: product
  });
  return toProduct(prismaProduct);
}

// Update product
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  try {
    const prismaProduct = await prisma.product.update({
      where: { id },
      data: updates
    });
    return toProduct(prismaProduct);
  } catch {
    return null;
  }
}

// Delete product
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.delete({
      where: { id }
    });
    return true;
  } catch {
    return false;
  }
}

// Import products
export async function importProducts(newProducts: Partial<Product>[]): Promise<{
  created: number;
  updated: number;
  failed: number;
}> {
  const results = { created: 0, updated: 0, failed: 0 };

  for (const product of newProducts) {
    try {
      if (product.slug) {
        const existing = await prisma.product.findUnique({
          where: { slug: product.slug }
        });

        if (existing) {
          await prisma.product.update({
            where: { slug: product.slug },
            data: product
          });
          results.updated++;
        } else {
          await prisma.product.create({
            data: product as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
          });
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