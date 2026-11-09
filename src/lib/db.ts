// 统一数据层：使用 Cloudflare D1 (SQLite) + Workers bindings
// Replaces the previous Prisma + PostgreSQL (Supabase) implementation.
// The exported function names and signatures are unchanged, so the API
// routes (src/app/api/products/...) do not need any changes.
// See d1-schema.sql for the table definitions and MIGRATION.md for setup.
import { getDB } from './cloudflare-env';

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

const PRODUCT_COLUMNS = [
  'id', 'slug', 'nameEn', 'nameZh', 'category',
  'descriptionEn', 'descriptionZh', 'thickness', 'width', 'length',
  'weight', 'color', 'material', 'featuresEn', 'featuresZh',
  'applicationsEn', 'applicationsZh', 'certifications', 'images',
  'featured', 'createdAt', 'updatedAt',
] as const;

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
    featured: r.featured === 1 || r.featured === true,
    createdAt: r.createdAt || '',
    updatedAt: r.updatedAt || '',
  };
}

function toRowValues(p: Product): unknown[] {
  return PRODUCT_COLUMNS.map((c) => {
    if (c === 'featured') return p.featured ? 1 : 0;
    return (p as any)[c] ?? '';
  });
}

/** Merge a partial update over an existing row, keeping the old
 *  Prisma-era semantics: empty-string fields do NOT overwrite. */
function mergeProduct(existing: Product, updates: Partial<Product>): Product {
  const merged: Product = { ...existing };
  (Object.keys(updates) as (keyof Product)[]).forEach((key) => {
    if (key === 'featured') {
      if (updates.featured !== undefined && updates.featured !== null) {
        merged.featured = updates.featured;
      }
      return;
    }
    const value = updates[key];
    if (typeof value === 'string' && value !== '') {
      (merged as any)[key] = value;
    }
  });
  return merged;
}

export async function getProducts(): Promise<Product[]> {
  const db = await getDB();
  const { results } = await db
    .prepare('SELECT * FROM products ORDER BY createdAt DESC')
    .all();
  return (results || []).map(rowToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = await getDB();
  const row = await db
    .prepare('SELECT * FROM products WHERE id = ?')
    .bind(id)
    .first();
  return row ? rowToProduct(row) : null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = await getDB();
  const row = await db
    .prepare('SELECT * FROM products WHERE slug = ?')
    .bind(slug)
    .first();
  return row ? rowToProduct(row) : null;
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const db = await getDB();
  const now = new Date().toISOString();
  const row: Product = {
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
    createdAt: now,
    updatedAt: now,
  };
  const placeholders = PRODUCT_COLUMNS.map(() => '?').join(', ');
  await db
    .prepare(`INSERT INTO products (${PRODUCT_COLUMNS.join(', ')}) VALUES (${placeholders})`)
    .bind(...toRowValues(row))
    .run();
  const created = await getProductById(row.id);
  return created ?? row;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const db = await getDB();
  const existing = await getProductById(id);
  if (!existing) return null;

  const merged = mergeProduct(existing, updates);
  merged.updatedAt = new Date().toISOString();
  const setClause = PRODUCT_COLUMNS.filter((c) => c !== 'id')
    .map((c) => `${c} = ?`)
    .join(', ');
  const values = PRODUCT_COLUMNS.filter((c) => c !== 'id').map((c) => {
    if (c === 'featured') return merged.featured ? 1 : 0;
    return (merged as any)[c] ?? '';
  });
  await db
    .prepare(`UPDATE products SET ${setClause} WHERE id = ?`)
    .bind(...values, id)
    .run();
  return getProductById(id);
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const db = await getDB();
    const result = await db
      .prepare('DELETE FROM products WHERE id = ?')
      .bind(id)
      .run();
    return (result.meta?.changes ?? 0) > 0;
  } catch {
    return false;
  }
}

export async function importProducts(newProducts: Partial<Product>[]): Promise<{
  created: number; updated: number; failed: number;
}> {
  const db = await getDB();
  const results = { created: 0, updated: 0, failed: 0 };

  for (const product of newProducts) {
    try {
      if (!product.slug) { results.failed++; continue; }

      const existingRow = await db
        .prepare('SELECT * FROM products WHERE slug = ?')
        .bind(product.slug)
        .first();

      if (existingRow) {
        const existing = rowToProduct(existingRow);
        const merged = mergeProduct(existing, product);
        merged.updatedAt = new Date().toISOString();
        const setClause = PRODUCT_COLUMNS.filter((c) => c !== 'id')
          .map((c) => `${c} = ?`)
          .join(', ');
        const values = PRODUCT_COLUMNS.filter((c) => c !== 'id').map((c) => {
          if (c === 'featured') return merged.featured ? 1 : 0;
          return (merged as any)[c] ?? '';
        });
        await db
          .prepare(`UPDATE products SET ${setClause} WHERE slug = ?`)
          .bind(...values, product.slug)
          .run();
        results.updated++;
      } else {
        const now = new Date().toISOString();
        const row: Product = {
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
          createdAt: now,
          updatedAt: now,
        };
        const placeholders = PRODUCT_COLUMNS.map(() => '?').join(', ');
        await db
          .prepare(`INSERT INTO products (${PRODUCT_COLUMNS.join(', ')}) VALUES (${placeholders})`)
          .bind(...toRowValues(row))
          .run();
        results.created++;
      }
    } catch (e) {
      console.error('import failed for', product.slug, e);
      results.failed++;
    }
  }
  return results;
}
