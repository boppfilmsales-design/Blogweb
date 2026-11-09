#!/usr/bin/env node
// Upload the product images referenced by the products JSON file into the
// R2 bucket (blogweb-images), under the same images/... keys the seed data
// uses — so the public R2 URL of each file is <R2_PUBLIC_URL>/images/<file>.
//
// Usage:
//   node scripts/upload-images-to-r2.mjs [--input products_mapped.json]
//       [--images-dir <dir>] [--bucket blogweb-images] [--dry-run]
//
//   --input       Products file. Default: products_mapped.json (repo root).
//   --images-dir  Local folder with the image files.
//                 Default: ../boppfilmsale-new/images (this VM).
//                 On the user's Windows computer the equivalent folder is
//                 C:\Users\DELL\Desktop\aec-project\images
//   --bucket      R2 bucket name. Default: blogweb-images.
//   --dry-run     Print the wrangler commands without running them.
//
// External http(s) image URLs in the data are left alone (they are not
// uploaded). Products with no image are reported at the end.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = {
    input: 'products_mapped.json',
    imagesDir: path.resolve(repoRoot, '..', 'boppfilmsale-new', 'images'),
    bucket: 'blogweb-images',
    dryRun: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--input') args.input = argv[++i];
    else if (a === '--images-dir') args.imagesDir = argv[++i];
    else if (a === '--bucket') args.bucket = argv[++i];
    else if (a === '--dry-run') args.dryRun = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputFile = path.resolve(repoRoot, args.input);
  const raw = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const products = Array.isArray(raw) ? raw : raw.products;

  const refs = new Map(); // key (images/...) -> Set of product ids
  let imageless = 0;
  for (const p of products) {
    const im = p.images;
    const value = Array.isArray(im) ? im[0] : im;
    if (!value || (typeof value === 'string' && value.trim() === '')) { imageless++; continue; }
    if (/^https?:\/\//.test(value)) continue; // external URL, leave alone
    if (value.startsWith('images/')) {
      if (!refs.has(value)) refs.set(value, new Set());
      refs.get(value).add(String(p.id));
    }
  }

  console.log(`Distinct relative image files referenced: ${refs.size}`);
  console.log(`Products without an image: ${imageless}`);

  let uploaded = 0;
  let missing = 0;
  const missingFiles = [];
  for (const [key, ids] of [...refs.entries()].sort()) {
    const localFile = path.join(args.imagesDir, key.replace(/^images\//, ''));
    if (!fs.existsSync(localFile)) {
      missing++;
      missingFiles.push(`${key} (products: ${[...ids].join(', ')})`);
      continue;
    }
    const cmd = `npx wrangler r2 object put ${args.bucket}/${key} --file="${localFile}" --remote`;
    if (args.dryRun) {
      console.log(`[dry-run] ${cmd}`);
      uploaded++;
      continue;
    }
    try {
      execSync(cmd, { stdio: 'pipe', shell: true });
      uploaded++;
    } catch (e) {
      console.error(`FAILED: ${key}: ${e.message}`);
      missingFiles.push(`${key} (upload failed, products: ${[...ids].join(', ')})`);
      missing++;
    }
  }

  console.log(`Uploaded: ${uploaded}, missing/failed: ${missing}`);
  if (missingFiles.length > 0) {
    console.log('Missing files (send these photos to complete the catalogue):');
    missingFiles.forEach((f) => console.log(`  - ${f}`));
  }
  if (!args.dryRun) {
    console.log('Verify with: npx wrangler r2 object list blogweb-images --prefix images/ --remote');
  }
}

main();
