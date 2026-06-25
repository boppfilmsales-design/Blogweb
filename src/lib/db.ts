import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DB_PATH = join(process.cwd(), 'src', 'data', 'products-db.json');

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

// Read database
export function getDB(): Product[] {
  try {
    const data = readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write database
export function setDB(products: Product[]): void {
  writeFileSync(DB_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

// Get all products
export function getProducts(): Product[] {
  return getDB();
}

// Get product by ID
export function getProductById(id: string): Product | null {
  const products = getDB();
  return products.find(p => p.id === id) || null;
}

// Get product by slug
export function getProductBySlug(slug: string): Product | null {
  const products = getDB();
  return products.find(p => p.slug === slug) || null;
}

// Create product
export function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const products = getDB();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  setDB(products);
  return newProduct;
}

// Update product
export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getDB();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  setDB(products);
  return products[index];
}

// Delete product
export function deleteProduct(id: string): boolean {
  const products = getDB();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  setDB(products);
  return true;
}

// Import products
export function importProducts(newProducts: Partial<Product>[]): {
  created: number;
  updated: number;
  failed: number;
} {
  const products = getDB();
  const results = { created: 0, updated: 0, failed: 0 };

  for (const product of newProducts) {
    const existingIndex = products.findIndex(p => p.slug === product.slug);

    if (existingIndex >= 0) {
      // Update existing
      products[existingIndex] = {
        ...products[existingIndex],
        ...product,
        updatedAt: new Date().toISOString(),
      } as Product;
      results.updated++;
    } else {
      // Create new
      const newProduct: Product = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        slug: product.slug || '',
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
        featuresEn: product.featuresEn || '[]',
        featuresZh: product.featuresZh || '[]',
        applicationsEn: product.applicationsEn || '[]',
        applicationsZh: product.applicationsZh || '[]',
        certifications: product.certifications || '[]',
        images: product.images || '[]',
        featured: product.featured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      products.push(newProduct);
      results.created++;
    }
  }

  setDB(products);
  return results;
}
