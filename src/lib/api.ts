import { getProducts as dbGetProducts, getProductBySlug as dbGetProductBySlug, Product } from './db';

const API_BASE = '/api';

export type { Product };

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// Fetch single product
export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

// Fetch product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    return products.find(p => p.slug === slug) || null;
  } catch {
    return null;
  }
}

// Create product
export async function createProduct(product: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

// Update product
export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
}

// Import products
export async function importProducts(products: Partial<Product>[]) {
  const res = await fetch(`${API_BASE}/products/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products }),
  });
  if (!res.ok) throw new Error('Failed to import products');
  return res.json();
}

// Export products (client-side helper)
export function exportProductsToJSON(products: Product[]) {
  const dataStr = JSON.stringify(products, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  const exportFileDefaultName = 'products.json';
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function exportProductsToCSV(products: Product[]) {
  const headers = ['ID', 'Slug', 'Name (EN)', 'Name (ZH)', 'Category', 'Thickness', 'Width', 'Material', 'Featured'];
  const csvContent = [
    headers.join(','),
    ...products.map(p => [
      p.id,
      p.slug,
      `"${p.nameEn}"`,
      `"${p.nameZh}"`,
      p.category,
      p.thickness,
      p.width,
      p.material,
      p.featured ? 'Yes' : 'No'
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'products.csv');
  link.click();
  URL.revokeObjectURL(url);
}
