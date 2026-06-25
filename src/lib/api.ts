const API_BASE = '/api';

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
  const products = await getProducts();
  return products.find(p => p.slug === slug) || null;
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
