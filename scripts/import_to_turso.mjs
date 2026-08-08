// import_to_turso.mjs
// 把 scripts/products_final.json 导入 Turso (LibSQL)。
// 运行： TURSO_DATABASE_URL=libsql://xxx TURSO_AUTH_TOKEN=xxx node scripts/import_to_turso.mjs
// 或在本地 .env 里配好这两个变量后： node scripts/import_to_turso.mjs
import fs from 'fs';
import path from 'path';
import { createClient } from '@libsql/client';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve('.');
const products = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts', 'products_final.json'), 'utf-8')
);

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) { console.error('缺少 TURSO_DATABASE_URL'); process.exit(1); }

const client = createClient({ url, authToken });

async function main() {
  await client.execute(`
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
  console.log('表已确保存在');

  let created = 0, updated = 0;
  for (const p of products) {
    const now = new Date().toISOString();
    const slug = String(p.slug);
    const existing = await client.execute(`SELECT id FROM "Product" WHERE slug = ?`, [slug]);
    const featured = p.featured ? 1 : 0;
    const vals = [
      p.id || slug, slug,
      p.nameEn || '', p.nameZh || '',
      p.category || '',
      p.descriptionEn || '', p.descriptionZh || '',
      p.thickness || '', p.width || '', p.length || '', p.weight || '', p.color || '', p.material || '',
      p.featuresEn || '', p.featuresZh || '',
      p.applicationsEn || '', p.applicationsZh || '',
      p.certifications || '',
      p.images || '',
      featured,
      p.createdAt || now, now,
    ];
    if (existing.rows.length) {
      await client.execute(
        `UPDATE "Product" SET
           nameEn=?, nameZh=?, category=?, descriptionEn=?, descriptionZh=?,
           thickness=?, width=?, length=?, weight=?, color=?, material=?,
           featuresEn=?, featuresZh=?, applicationsEn=?, applicationsZh=?, certifications=?,
           images=?, featured=?, updatedAt=?
         WHERE slug=?`,
        [p.nameEn || '', p.nameZh || '', p.category || '', p.descriptionEn || '', p.descriptionZh || '',
         p.thickness || '', p.width || '', p.length || '', p.weight || '', p.color || '', p.material || '',
         p.featuresEn || '', p.featuresZh || '', p.applicationsEn || '', p.applicationsZh || '', p.certifications || '',
         p.images || '', featured, now, slug]
      );
      updated++;
    } else {
      await client.execute(
        `INSERT INTO "Product"
         (id, slug, nameEn, nameZh, category, descriptionEn, descriptionZh, thickness, width, length, weight, color, material, featuresEn, featuresZh, applicationsEn, applicationsZh, certifications, images, featured, createdAt, updatedAt)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        vals
      );
      created++;
    }
  }
  console.log(`导入完成：新建 ${created}，更新 ${updated}，共 ${products.length} 条`);
}

main().catch(e => { console.error(e); process.exit(1); });
