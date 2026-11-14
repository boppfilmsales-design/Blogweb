// Product access for pages.
//
// Two entry points, deliberately separate:
//
//  - `staticProducts()` and friends read the bundled catalogue snapshot
//    (src/data/products-db.json). They never touch Cloudflare bindings, so a
//    statically rendered page can call them during `next build` without a
//    request context.
//
//  - `requestProducts()` and `requestProductBySlug()` try Cloudflare D1 first
//    (live admin edits) and fall back to the same snapshot when the binding is
//    missing or the query fails. A page therefore always renders content —
//    never an error page — even if the database is unavailable.
import type { Product } from './api-types';
import catalogue from '@/data/products-db.json';

const SNAPSHOT = catalogue as unknown as Product[];

/** Products that ship with the build (no database required). */
export function staticProducts(): Product[] {
  return SNAPSHOT;
}

export function staticProductBySlug(slug: string): Product | null {
  return SNAPSHOT.find((p) => p.slug === slug) || null;
}

/**
 * Curated homepage selection: one representative grade from each core family,
 * in the order buyers usually shop. Falls back to the first six products when
 * a family is missing from the catalogue.
 */
export function highlightedProducts(limit = 6): Product[] {
  const preferredCategories = [
    'boppfilm-metallized',
    'bopet-clear',
    'boppfilm-cigarette',
    'bops-glossy',
    'gcpp-film',
    'pof-central',
  ];

  // Within a family, prefer the grade whose name reads like a product rather
  // than a keyword-stuffed listing (no marketing years, no 15-word names).
  const nameScore = (name: string) => {
    const value = (name || '').trim();
    let score = 0;
    if (value.length >= 10 && value.length <= 45) score += 2;
    if (/\b(19|20)\d{2}\b/.test(value)) score -= 3;
    if (/great|best|hot sale|cheap|new/i.test(value)) score -= 2;
    if (/film|bags?|tape|paper|label/i.test(value)) score += 1;
    return score;
  };

  const picked: Product[] = [];
  const seen = new Set<string>();
  for (const category of preferredCategories) {
    const candidates = SNAPSHOT.filter((p) => p.category === category && !seen.has(p.id));
    if (candidates.length === 0) continue;
    candidates.sort((a, b) => nameScore(b.nameEn) - nameScore(a.nameEn) || a.nameEn.length - b.nameEn.length);
    picked.push(candidates[0]);
    seen.add(candidates[0].id);
  }
  for (const product of SNAPSHOT) {
    if (picked.length >= limit) break;
    if (!seen.has(product.id)) {
      picked.push(product);
      seen.add(product.id);
    }
  }
  return picked.slice(0, limit);
}

async function tryDatabase(): Promise<Product[] | null> {
  try {
    const { getProducts } = await import('./db');
    const rows = await getProducts();
    return rows.length > 0 ? rows : null;
  } catch {
    // No D1 binding (local build, preview) or the query failed: use the snapshot.
    return null;
  }
}

export async function requestProducts(): Promise<Product[]> {
  return (await tryDatabase()) ?? SNAPSHOT;
}

export async function requestProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { getProductBySlug } = await import('./db');
    const row = await getProductBySlug(slug);
    if (row) return row;
  } catch {
    // fall through to the bundled snapshot
  }
  return staticProductBySlug(slug);
}

export type { Product };
