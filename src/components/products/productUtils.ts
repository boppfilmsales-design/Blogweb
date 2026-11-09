// Display helpers shared by the product list, detail page and card.
// Pure presentation logic only: no data fetching, no API changes.
// - Category ids, product names and Chinese fields are never modified here,
//   only how they are displayed (merged filter labels, prettified fallbacks).
// - HTML residue that may still arrive from the API is stripped at render
//   time so it never shows up as visible code.

import { CATEGORIES, CATEGORY_GROUPS } from '@/lib/categories';
import type { Product } from '@/lib/api-types';

export type Locale = 'zh' | 'en' | 'ar' | 'es' | 'pt';

const ACRONYMS: Record<string, string> = {
  bopp: 'BOPP',
  bopet: 'BOPET',
  bopa: 'BOPA',
  bops: 'BOPS',
  cpp: 'CPP',
  gcpp: 'GCPP',
  vmcpp: 'VMCPP',
  pof: 'POF',
  pe: 'PE',
  pvc: 'PVC',
  pvdc: 'PVDC',
  vmpet: 'VMPET',
  ttr: 'TTR',
  a4: 'A4',
  lwc: 'LWC',
  kfilm: 'K-Film',
};

/** Turn a raw category slug into a readable label, e.g. 'bopp-thermal-matt' -> 'BOPP Thermal Matt'. */
export function prettifyCategoryId(id: string): string {
  return id
    .split(/[-_]+/)
    .filter(Boolean)
    .map((tok) => {
      const lower = tok.toLowerCase();
      if (ACRONYMS[lower]) return ACRONYMS[lower];
      const mic = lower.match(/^(\d+(?:\.\d+)?)(mic|mm|μm|um)$/);
      if (mic) return `${mic[1]} ${mic[2] === 'mic' ? 'Mic' : mic[2]}`;
      if (/^\d+$/.test(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

/** Display name for a category id; falls back to a prettified slug instead of showing raw ids. */
export function getCategoryDisplayName(categoryId: string, locale: string): string {
  if (!categoryId) return '';
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (cat) return locale === 'zh' ? cat.zh : cat.en;
  return prettifyCategoryId(categoryId);
}

/** Strip HTML tags and decode common entities into plain text. */
export function stripHtmlToText(value: string | null | undefined): string {
  if (!value) return '';
  let text = String(value);
  text = text.replace(/<\/(p|div|li|tr|h[1-6]|section|article|table|ul|ol|blockquote|thead|tbody)>/gi, '\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<[^>]*>/g, '');
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '…',
    '&copy;': '©',
  };
  text = text.replace(/&[a-z#0-9]+;/gi, (m) => {
    const lower = m.toLowerCase();
    if (entities[lower]) return entities[lower];
    if (lower.startsWith('&#')) {
      const code = parseInt(lower.replace(/\D/g, ''), 10);
      return Number.isFinite(code) && code > 0 ? String.fromCharCode(code) : ' ';
    }
    return ' ';
  });
  text = text.replace(/[ \t\u00a0]+/g, ' ');
  text = text.replace(/[ \t]*\n[ \t]*/g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

const BOILERPLATE = /replied within 24 hours|inquiry related to our product|well-trained experienc/i;

function dedupeClean(items: string[], maxItems: number): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length >= maxItems) break;
  }
  return out;
}

/**
 * Parse a features/applications field into short list items.
 * The API stores these as JSON arrays, plain newline-separated lines, or
 * (for legacy rows) raw HTML blobs. HTML tables, inquiry boilerplate and
 * over-long lines are dropped; an empty result means the section is hidden.
 */
export function parseListField(value: string | null | undefined, maxItems = 12): string[] {
  if (!value) return [];
  const raw = String(value).trim();
  if (!raw) return [];

  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return dedupeClean(
          parsed.map((x) => stripHtmlToText(String(x))).filter((x) => x && x.length <= 120),
          maxItems,
        );
      }
    } catch {
      // fall through to plain-text handling
    }
  }

  if (BOILERPLATE.test(raw)) return [];

  const lines = raw.split(/[\n\r]+|•|;/).map((l) => stripHtmlToText(l));
  const items: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^tech\s*:/i.test(t)) continue; // 'Tech: <table>…' junk marker
    if (t.includes(' | ')) continue; // spec-table row, not a list item
    if (t.length > 120) continue;
    items.push(t);
  }
  return dedupeClean(items, maxItems);
}

export function getProductName(product: Product, locale: string): string {
  const primary = locale === 'zh' ? product.nameZh : product.nameEn;
  const fallback = locale === 'zh' ? product.nameEn : product.nameZh;
  return (primary || fallback || '').trim();
}

export function getProductDesc(product: Product, locale: string): string {
  const primary = locale === 'zh' ? product.descriptionZh : product.descriptionEn;
  const fallback = locale === 'zh' ? product.descriptionEn : product.descriptionZh;
  return stripHtmlToText(primary || fallback);
}

/** Encode an image URL so filenames with spaces or brackets still load. */
export function encodeImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  const t = String(url).trim();
  if (!t) return '';
  try {
    return encodeURI(t);
  } catch {
    return t;
  }
}

// ---------------------------------------------------------------------------
// Category filter grouping
// ---------------------------------------------------------------------------

export interface CategoryGroup {
  key: string;
  labelEn: string;
  labelZh: string;
  ids: string[];
  family: string;
  count: number;
}

export interface FamilyGroup {
  name: string;
  count: number;
}

export const FAMILY_LABELS: Record<string, { en: string; zh: string }> = {
  BOPP: { en: 'BOPP Films', zh: 'BOPP 薄膜' },
  BOPET: { en: 'BOPET Films', zh: 'BOPET 薄膜' },
  BOPA: { en: 'BOPA Films', zh: 'BOPA 薄膜' },
  BOPS: { en: 'BOPS Films', zh: 'BOPS 薄膜' },
  'CPP/POF/PE': { en: 'CPP / POF / PE', zh: 'CPP / POF / PE' },
  Paper: { en: 'Paper Products', zh: '纸品' },
  Labels: { en: 'Labels', zh: '标签' },
  'Tear Tape': { en: 'Tear Tape', zh: '撕裂带' },
  Packaging: { en: 'Bags & Sheets', zh: '包装袋与片材' },
  Supplies: { en: 'Supplies', zh: '耗材' },
  Others: { en: 'Other Products', zh: '其他产品' },
  Machines: { en: 'Machines', zh: '机械设备' },
};

export function getFamilyLabel(family: string, locale: string): string {
  const entry = FAMILY_LABELS[family];
  if (!entry) return family;
  return locale === 'zh' ? entry.zh : entry.en;
}

/** Normalise a display name so case / plural / punctuation variants merge into one filter. */
function normalizeDisplayName(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleaned.split(' ');
  const last = words[words.length - 1];
  if (last && last.length > 3 && last.endsWith('s') && !last.endsWith('ss')) {
    words[words.length - 1] = last.slice(0, -1);
  }
  return words.join(' ');
}

const idToFamily = new Map<string, string>();
CATEGORIES.forEach((c) => idToFamily.set(c.id, c.group));

export function familyOfCategory(categoryId: string): string {
  return idToFamily.get(categoryId) || 'Others';
}

/**
 * Merge product categories into display groups by normalised name.
 * Products sharing a display name (case/plural variants) land in one group;
 * the group keeps every underlying category id so filtering still matches.
 */
export function buildCategoryGroups(products: Product[]): CategoryGroup[] {
  const byKey = new Map<string, CategoryGroup>();
  for (const p of products) {
    const id = p.category || '';
    if (!id) continue;
    const labelEn = getCategoryDisplayName(id, 'en');
    const labelZh = getCategoryDisplayName(id, 'zh');
    const key = normalizeDisplayName(labelEn);
    const family = familyOfCategory(id);
    let g = byKey.get(key);
    if (!g) {
      g = { key, labelEn, labelZh, ids: [], family, count: 0 };
      byKey.set(key, g);
    }
    if (!g.ids.includes(id)) g.ids.push(id);
    g.count += 1;
  }
  return [...byKey.values()].sort((a, b) => b.count - a.count || a.labelEn.localeCompare(b.labelEn));
}

/** Product counts per family, in the canonical family order. */
export function buildFamilies(products: Product[]): FamilyGroup[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    const f = familyOfCategory(p.category || '');
    counts.set(f, (counts.get(f) || 0) + 1);
  }
  return Object.keys(CATEGORY_GROUPS)
    .filter((name) => (counts.get(name) || 0) > 0)
    .map((name) => ({ name, count: counts.get(name) || 0 }));
}

/** Resolve a ?category= value (group key or single category id) to its display group. */
export function resolveCategoryKey(param: string | null, groups: CategoryGroup[]): CategoryGroup | null {
  if (!param) return null;
  return groups.find((g) => g.key === param) || groups.find((g) => g.ids.includes(param)) || null;
}

// ---------------------------------------------------------------------------
// Specifications (only non-empty fields are shown)
// ---------------------------------------------------------------------------

export interface SpecEntry {
  labelEn: string;
  labelZh: string;
  value: string;
}

const SPEC_FIELDS: { field: 'thickness' | 'width' | 'length' | 'weight' | 'color' | 'material'; labelEn: string; labelZh: string }[] = [
  { field: 'thickness', labelEn: 'Thickness', labelZh: '厚度' },
  { field: 'width', labelEn: 'Width', labelZh: '宽度' },
  { field: 'length', labelEn: 'Length', labelZh: '长度' },
  { field: 'weight', labelEn: 'Weight', labelZh: '重量' },
  { field: 'color', labelEn: 'Color', labelZh: '颜色' },
  { field: 'material', labelEn: 'Material', labelZh: '材料' },
];

export function specEntries(product: Product): SpecEntry[] {
  return SPEC_FIELDS.filter((f) => {
    const v = product[f.field];
    return typeof v === 'string' && v.trim() !== '';
  }).map((f) => ({
    labelEn: f.labelEn,
    labelZh: f.labelZh,
    value: formatSpecValue((product[f.field] as string).trim()),
  }));
}

/**
 * Collapse a long comma-separated numeric list (e.g. widths like
 * "500,650,700,750,800,850,900,950,1050mm") to a first–last range so a spec
 * chip never cuts a number in half at the card edge. Short values,
 * non-numeric lists and non-ascending series are returned untouched, and
 * the chip itself is allowed to wrap as a safety net.
 */
export function formatSpecValue(value: string): string {
  const v = (value || '').trim();
  if (!v || !v.includes(',')) return v;
  if (v.length <= 28) return v;
  const parts = v.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length < 4) return v;
  const parsed = parts.map((p) => p.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z\u03bc\u00b5]*)$/));
  if (parsed.some((m) => !m)) return v;
  const nums = parsed.map((m) => parseFloat(m![1]));
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) return v;
  }
  const unit = parsed[parsed.length - 1]![2] || '';
  return `${nums[0]}\u2013${nums[nums.length - 1]}${unit} \u7b49`;
}
