// 统一数据层：使用 Turso (LibSQL) 直连，无需 Prisma。
// 环境变量：TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
import { createClient, type Client } from '@libsql/client';

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

let client: Client | null = null;
function getClient(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (!url) throw new Error('TURSO_DATABASE_URL is not set');
    client = createClient({ url, authToken });
  }
  return client;
}

// 建表（首次部署时跑一次）
export async function ensureSchema() {
  const c = getClient();
  await c.execute(`
    CREATE TABLE IF NOT EXISTS "Product" (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      nameEn TEXT NOT NULL DEFAULT '',
      nameZh TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      descriptionEn TEXT NOT NULL DEFAULT '',
      descriptionZh TEXT NOT NULL DEFAULT '',
      thickness TEXT NOT NULL DEFAULT '',
      width TEXT NOT NULL DEFAULT '',
      length TEXT NOT NULL DEFAULT '',
      weight TEXT NOT NULL DEFAULT '',
      color TEXT NOT NULL DEFAULT '',
      material TEXT NOT NULL DEFAULT '',
      featuresEn TEXT NOT NULL DEFAULT '',
      featuresZh TEXT NOT NULL DEFAULT '',
      applicationsEn TEXT NOT NULL DEFAULT '',
      applicationsZh TEXT NOT NULL DEFAULT '',
      certifications TEXT NOT NULL DEFAULT '',
      images TEXT NOT NULL DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT '',
      updatedAt TEXT NOT NULL DEFAULT ''
    );
  `);
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
    createdAt: r.createdAt || '',
    updatedAt: r.updatedAt || '',
  };
}

export async function getProducts(): Promise<Product[]> {
  const c = getClient();
  const res = await c.execute(`SELECT * FROM "Product" ORDER BY createdAt DESC`);
  return res.rows.map(rowToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const c = getClient();
  const res = await c.execute(`SELECT * FROM "Product" WHERE id = ?`, [id]);
  return res.rows.length ? rowToProduct(res.rows[0]) : null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const c = getClient();
  const res = await c.execute(`SELECT * FROM "Product" WHERE slug = ?`, [slug]);
  return res.rows.length ? rowToProduct(res.rows[0]) : null;
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const c = getClient();
  const now = new Date().toISOString();
  const p = {
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
    featured: product.featured ? 1 : 0,
    createdAt: product.createdAt || now,
    updatedAt: now,
  };
  await c.execute(
    `INSERT OR IGNORE INTO "Product"
     (id, slug, nameEn, nameZh, category, descriptionEn, descriptionZh, thickness, width, length, weight, color, material, featuresEn, featuresZh, applicationsEn, applicationsZh, certifications, images, featured, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [p.id, p.slug, p.nameEn, p.nameZh, p.category, p.descriptionEn, p.descriptionZh, p.thickness, p.width, p.length, p.weight, p.color, p.material, p.featuresEn, p.featuresZh, p.applicationsEn, p.applicationsZh, p.certifications, p.images, p.featured, p.createdAt, p.updatedAt]
  );
  return (await getProductBySlug(p.slug))!;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const c = getClient();
  const existing = await getProductById(id);
  if (!existing) return null;
  const merged = { ...existing, ...updates, updatedAt: new Date().toISOString() };
  await c.execute(
    `UPDATE "Product" SET
       slug=?, nameEn=?, nameZh=?, category=?, descriptionEn=?, descriptionZh=?,
       thickness=?, width=?, length=?, weight=?, color=?, material=?,
       featuresEn=?, featuresZh=?, applicationsEn=?, applicationsZh=?, certifications=?,
       images=?, featured=?, updatedAt=?
     WHERE id=?`,
    [merged.slug, merged.nameEn, merged.nameZh, merged.category, merged.descriptionEn, merged.descriptionZh,
     merged.thickness, merged.width, merged.length, merged.weight, merged.color, merged.material,
     merged.featuresEn, merged.featuresZh, merged.applicationsEn, merged.applicationsZh, merged.certifications,
     merged.images, merged.featured ? 1 : 0, merged.updatedAt, id]
  );
  return await getProductById(id);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const c = getClient();
  const res = await c.execute(`DELETE FROM "Product" WHERE id = ?`, [id]);
  return (res.rowsAffected ?? 0) > 0;
}

export async function importProducts(newProducts: Partial<Product>[]): Promise<{
  created: number; updated: number; failed: number;
}> {
  const results = { created: 0, updated: 0, failed: 0 };
  const c = getClient();
  for (const product of newProducts) {
    try {
      if (!product.slug) { results.failed++; continue; }
      const existing = await getProductBySlug(product.slug);
      const now = new Date().toISOString();
      const p = {
        id: product.id || existing?.id || crypto.randomUUID(),
        slug: product.slug,
        nameEn: product.nameEn || existing?.nameEn || '',
        nameZh: product.nameZh || existing?.nameZh || '',
        category: product.category || existing?.category || '',
        descriptionEn: product.descriptionEn || existing?.descriptionEn || '',
        descriptionZh: product.descriptionZh || existing?.descriptionZh || '',
        thickness: product.thickness || existing?.thickness || '',
        width: product.width || existing?.width || '',
        length: product.length || existing?.length || '',
        weight: product.weight || existing?.weight || '',
        color: product.color || existing?.color || '',
        material: product.material || existing?.material || '',
        featuresEn: product.featuresEn || existing?.featuresEn || '',
        featuresZh: product.featuresZh || existing?.featuresZh || '',
        applicationsEn: product.applicationsEn || existing?.applicationsEn || '',
        applicationsZh: product.applicationsZh || existing?.applicationsZh || '',
        certifications: product.certifications || existing?.certifications || '',
        images: product.images || existing?.images || '',
        featured: product.featured ?? existing?.featured ?? false,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
      };
      if (existing) {
        await c.execute(
          `UPDATE "Product" SET
             nameEn=?, nameZh=?, category=?, descriptionEn=?, descriptionZh=?,
             thickness=?, width=?, length=?, weight=?, color=?, material=?,
             featuresEn=?, featuresZh=?, applicationsEn=?, applicationsZh=?, certifications=?,
             images=?, featured=?, updatedAt=?
           WHERE slug=?`,
          [p.nameEn, p.nameZh, p.category, p.descriptionEn, p.descriptionZh,
           p.thickness, p.width, p.length, p.weight, p.color, p.material,
           p.featuresEn, p.featuresZh, p.applicationsEn, p.applicationsZh, p.certifications,
           p.images, p.featured ? 1 : 0, p.updatedAt, p.slug]
        );
        results.updated++;
      } else {
        await c.execute(
          `INSERT INTO "Product"
           (id, slug, nameEn, nameZh, category, descriptionEn, descriptionZh, thickness, width, length, weight, color, material, featuresEn, featuresZh, applicationsEn, applicationsZh, certifications, images, featured, createdAt, updatedAt)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [p.id, p.slug, p.nameEn, p.nameZh, p.category, p.descriptionEn, p.descriptionZh, p.thickness, p.width, p.length, p.weight, p.color, p.material, p.featuresEn, p.featuresZh, p.applicationsEn, p.applicationsZh, p.certifications, p.images, p.featured ? 1 : 0, p.createdAt, p.updatedAt]
        );
        results.created++;
      }
    } catch (e) {
      console.error('import failed for', product.slug, e);
      results.failed++;
    }
  }
  return results;
}
