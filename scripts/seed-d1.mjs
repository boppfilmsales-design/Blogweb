#!/usr/bin/env node
// Generate D1 seed SQL from a products JSON file.
// The output is chunked into files of 50 INSERTs each (seed-d1-01.sql, ...)
// because `wrangler d1 execute --file` handles smaller files more reliably.
//
// Usage:
//   node scripts/seed-d1.mjs [input.json] [--r2-base https://pub-xxx.r2.dev]
//                             [--overlay mapping.json] [--out seed-d1]
//
//   input.json   Products file. Default: products_mapped.json (repo root).
//                Accepts { "products": [...] } or a plain [...] array.
//   --r2-base    Rewrite relative image paths (images/...) to absolute
//                public R2 URLs: <base>/images/<file>. Without it, relative
//                paths are kept as-is (served after the R2 public URL is set
//                and the seed is re-run — INSERT OR REPLACE is idempotent).
//   --overlay    A cleaned-data mapping file (array keyed by id, as produced
//                by the separate cleanup task). Applied on top of the base
//                file: cleanedDescriptionEn -> descriptionEn,
//                thickness / width override when non-empty,
//                suggestedImage -> images, but ONLY for products that
//                currently have no image.
//   --out        Output file prefix. Default: seed-d1 (repo root).
//
// Then import with (repeat for every chunk file):
//   npx wrangler d1 execute blogweb-db --remote --file=seed-d1-01.sql
//
// Re-running the seed is safe: INSERT OR REPLACE overwrites by id.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const CHUNK_SIZE = 50;

const COLUMNS = [
  'id', 'slug', 'nameEn', 'nameZh', 'category',
  'descriptionEn', 'descriptionZh', 'thickness', 'width', 'length',
  'weight', 'color', 'material', 'featuresEn', 'featuresZh',
  'applicationsEn', 'applicationsZh', 'certifications', 'images',
  'featured', 'createdAt', 'updatedAt',
];

function parseArgs(argv) {
  const args = { input: null, r2Base: null, overlay: null, out: 'seed-d1' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--r2-base') args.r2Base = argv[++i];
    else if (a === '--overlay') args.overlay = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    else if (!a.startsWith('--') && !args.input) args.input = a;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

function esc(value) {
  if (value === null || value === undefined) return "''";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function loadProducts(file) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const list = Array.isArray(raw) ? raw : raw.products;
  if (!Array.isArray(list)) throw new Error(`No product array found in ${file}`);
  return list;
}

function normaliseImageValue(images, r2Base) {
  let value = '';
  if (Array.isArray(images)) value = images[0] || '';
  else if (typeof images === 'string') value = images.trim();
  if (!value) return '';
  if (r2Base && value.startsWith('images/')) {
    return `${r2Base.replace(/\/$/, '')}/${value}`;
  }
  return value;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputFile = path.resolve(repoRoot, args.input || 'products_mapped.json');
  let products = loadProducts(inputFile);

  // Overlay: cleaned descriptions / widths / suggested images, keyed by id.
  let overlayApplied = 0;
  if (args.overlay) {
    const overlayFile = path.resolve(repoRoot, args.overlay);
    const overlay = loadProducts(overlayFile);
    const byId = new Map(products.map((p) => [String(p.id), p]));
    for (const entry of overlay) {
      const base = byId.get(String(entry.id));
      if (!base) {
        console.warn(`overlay: id ${entry.id} not in base file, skipped`);
        continue;
      }
      if (entry.cleanedDescriptionEn) base.descriptionEn = entry.cleanedDescriptionEn;
      if (entry.thickness) base.thickness = entry.thickness;
      if (entry.width) base.width = entry.width;
      if (entry.suggestedImage && !normaliseImageValue(base.images)) {
        const img = entry.suggestedImage.startsWith('images/') || entry.suggestedImage.startsWith('http')
          ? entry.suggestedImage
          : `images/${entry.suggestedImage}`;
        base.images = img;
      }
      overlayApplied++;
    }
  }

  const now = new Date().toISOString();
  let rewrittenImages = 0;
  let imageless = 0;

  const statements = products.map((p) => {
    const images = normaliseImageValue(p.images, args.r2Base);
    if (args.r2Base && typeof p.images === 'string' && p.images.startsWith('images/')) rewrittenImages++;
    if (!images) imageless++;
    const row = {
      id: String(p.id ?? ''),
      slug: p.slug ?? String(p.id ?? ''),
      nameEn: p.nameEn ?? '',
      nameZh: p.nameZh ?? '',
      category: p.category ?? '',
      descriptionEn: p.descriptionEn ?? '',
      descriptionZh: p.descriptionZh ?? '',
      thickness: p.thickness ?? '',
      width: p.width ?? '',
      length: p.length ?? '',
      weight: p.weight ?? '',
      color: p.color ?? '',
      material: p.material ?? '',
      featuresEn: p.featuresEn ?? '',
      featuresZh: p.featuresZh ?? '',
      applicationsEn: p.applicationsEn ?? '',
      applicationsZh: p.applicationsZh ?? '',
      certifications: p.certifications ?? '',
      images,
      featured: p.featured ? 1 : 0,
      createdAt: p.createdAt ?? now,
      updatedAt: p.updatedAt ?? now,
    };
    const values = COLUMNS.map((c) => esc(row[c])).join(', ');
    return `INSERT OR REPLACE INTO products (${COLUMNS.join(', ')}) VALUES (${values});`;
  });

  // Chunk the output (50 INSERTs per file).
  const outPrefix = path.resolve(repoRoot, args.out);
  const files = [];
  for (let i = 0; i < statements.length; i += CHUNK_SIZE) {
    const chunk = statements.slice(i, i + CHUNK_SIZE);
    const n = String(files.length + 1).padStart(2, '0');
    const file = `${outPrefix}-${n}.sql`;
    fs.writeFileSync(file, chunk.join('\n') + '\n');
    files.push(file);
  }

  console.log(`Products: ${products.length} (from ${path.basename(inputFile)})`);
  if (args.overlay) console.log(`Overlay applied to ${overlayApplied} products (from ${path.basename(args.overlay)})`);
  if (args.r2Base) console.log(`Image URLs rewritten to R2 base: ${rewrittenImages}`);
  console.log(`Products without an image: ${imageless}`);
  console.log(`Wrote ${files.length} chunk file(s):`);
  files.forEach((f) => console.log(`  ${path.basename(f)}`));
  console.log('Import with:');
  files.forEach((f) => console.log(`  npx wrangler d1 execute blogweb-db --remote --file=${path.basename(f)}`));
}

main();
