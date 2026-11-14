'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/products/ProductCard';
import CategoryFilter from '@/components/products/CategoryFilter';
import Pagination from '@/components/products/Pagination';
import type { Product } from '@/lib/api-types';
import {
  buildCategoryGroups,
  buildFamilies,
  familyOfCategory,
  getFamilyLabel,
  getProductDesc,
  getProductName,
  resolveCategoryKey,
} from '@/components/products/productUtils';

const PAGE_SIZE = 20;
const TOP_GROUPS_PREVIEW = 10;

interface ProductsBrowserProps {
  initialProducts: Product[];
}

export default function ProductsBrowser({ initialProducts }: ProductsBrowserProps) {
  const { locale, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFamily, setActiveFamily] = useState<string>('');
  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filters live in the query string so a filtered view can be shared.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('search') || '');
    setActiveFamily(params.get('group') || '');
    setActiveCategoryKey(params.get('category') || null);
    const p = parseInt(params.get('page') || '1', 10);
    setPage(Number.isFinite(p) && p > 0 ? p : 1);
  }, []);

  // The build-time catalogue paints the page; the live database (admin edits)
  // refreshes it silently once the browser is up.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/products/')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) setProducts(data as Product[]);
      })
      .catch(() => {
        /* keep the server-rendered catalogue */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const syncUrl = (next: { search?: string; family?: string; category?: string | null; page?: number }) => {
    const url = new URL(window.location.href);
    const setOrDelete = (key: string, value: string | null | undefined) => {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    };
    if ('search' in next) setOrDelete('search', next.search);
    if ('family' in next) setOrDelete('group', next.family);
    if ('category' in next) setOrDelete('category', next.category);
    if ('page' in next) setOrDelete('page', next.page && next.page > 1 ? String(next.page) : null);
    window.history.replaceState({}, '', url);
  };

  const categoryGroups = useMemo(() => buildCategoryGroups(products), [products]);
  const families = useMemo(() => buildFamilies(products), [products]);
  const resolvedCategory = useMemo(
    () => resolveCategoryKey(activeCategoryKey, categoryGroups),
    [activeCategoryKey, categoryGroups],
  );
  const effectiveFamily = activeFamily || resolvedCategory?.family || '';

  const chips = useMemo(() => {
    if (effectiveFamily) {
      return { list: categoryGroups.filter((g) => g.family === effectiveFamily), complete: true };
    }
    return { list: categoryGroups.slice(0, TOP_GROUPS_PREVIEW), complete: false };
  }, [categoryGroups, effectiveFamily]);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      if (effectiveFamily && familyOfCategory(product.category) !== effectiveFamily) return false;
      if (resolvedCategory && !resolvedCategory.ids.includes(product.category)) return false;
      if (!q) return true;
      const name = getProductName(product, locale).toLowerCase();
      const desc = getProductDesc(product, locale).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [products, effectiveFamily, resolvedCategory, searchTerm, locale]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageProducts = filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const rangeStart = filteredProducts.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filteredProducts.length);

  const handleFamilyChange = (family: string) => {
    setActiveFamily(family);
    setActiveCategoryKey(null);
    setPage(1);
    syncUrl({ family, category: null, page: 1 });
  };

  const handleCategoryChange = (key: string | null) => {
    setActiveCategoryKey(key);
    setPage(1);
    syncUrl({ category: key, page: 1 });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
    syncUrl({ search: value, page: 1 });
  };

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), totalPages);
    setPage(clamped);
    syncUrl({ page: clamped });
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveFamily('');
    setActiveCategoryKey(null);
    setPage(1);
    syncUrl({ search: '', family: '', category: null, page: 1 });
  };

  const hasActiveFilter = !!searchTerm.trim() || !!effectiveFamily || !!resolvedCategory;
  const summary = t.products.showing
    .replace('{start}', String(rangeStart))
    .replace('{end}', String(rangeEnd))
    .replace('{total}', String(filteredProducts.length));

  return (
    <>
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">{t.products.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t.products.title}</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-blue-100">{t.products.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <label htmlFor="product-search" className="sr-only">
          {t.products.searchPlaceholder}
        </label>
        <input
          id="product-search"
          type="search"
          placeholder={t.products.searchPlaceholder}
          value={searchTerm}
          onChange={(event) => handleSearchChange(event.target.value)}
          className="h-12 w-full rounded-lg border border-slate-300 px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <CategoryFilter
          families={families}
          activeFamily={effectiveFamily}
          onFamilyChange={handleFamilyChange}
          categoryGroups={chips.list}
          chipsComplete={chips.complete}
          activeCategoryKey={resolvedCategory?.key || null}
          onCategoryChange={handleCategoryChange}
          locale={locale}
        />
      </div>

      {/* Active filters + count */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">{summary}</p>
        <div className="flex flex-wrap items-center gap-2">
          {effectiveFamily && (
            <button
              type="button"
              onClick={() => handleFamilyChange('')}
              className="inline-flex min-h-[36px] items-center gap-2 rounded-full bg-blue-50 px-3 text-xs font-semibold text-blue-800 hover:bg-blue-100"
            >
              {t.products.familyLabel}: {getFamilyLabel(effectiveFamily, locale)} ✕
            </button>
          )}
          {resolvedCategory && (
            <button
              type="button"
              onClick={() => handleCategoryChange(null)}
              className="inline-flex min-h-[36px] items-center gap-2 rounded-full bg-blue-50 px-3 text-xs font-semibold text-blue-800 hover:bg-blue-100"
            >
              {t.products.categoryLabel}:{' '}
              {locale === 'zh' ? resolvedCategory.labelZh : resolvedCategory.labelEn} ✕
            </button>
          )}
          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex min-h-[36px] items-center rounded-full border border-slate-300 px-3 text-xs font-semibold text-slate-700 hover:border-slate-400"
            >
              {t.products.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="mt-4 grid scroll-mt-28 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {pageProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white py-16 text-center">
          <p className="text-base text-slate-600">{t.products.noResults}</p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-blue-700 px-5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {t.products.clearFilters}
          </button>
        </div>
      )}

      {filteredProducts.length > 0 && totalPages > 1 && (
        <div className="mt-10">
          <Pagination page={safePage} totalPages={totalPages} onPageChange={handlePageChange} locale={locale} />
        </div>
      )}

      <p className="mt-8 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
        {t.products.specNote}{' '}
        <a href="/contact" className="font-semibold text-blue-700 hover:underline">
          {t.cta.primary} →
        </a>
      </p>
      </div>
    </>
  );
}
