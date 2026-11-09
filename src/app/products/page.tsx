'use client';

import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts, Product } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import CategoryFilter from '@/components/products/CategoryFilter';
import Pagination from '@/components/products/Pagination';
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

function ProductsPageContent() {
  const { locale } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFamily, setActiveFamily] = useState<string>('');
  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('search') || '');
    setActiveFamily(params.get('group') || '');
    setActiveCategoryKey(params.get('category') || null);
    const p = parseInt(params.get('page') || '1', 10);
    setPage(Number.isFinite(p) && p > 0 ? p : 1);
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProducts = async () => {
    try {
      const savedProducts = localStorage.getItem('aec-products');
      if (savedProducts) {
        try {
          const localData = JSON.parse(savedProducts);
          if (Array.isArray(localData) && localData.length > 0) {
            setProducts(localData);
          }
        } catch (e) {
          console.error('Failed to parse saved products:', e);
        }
      }

      const data = await getProducts();
      if (data && data.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to load products from API:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Merged display groups (case / plural variants merged) and families.
  const categoryGroups = useMemo(() => buildCategoryGroups(products), [products]);
  const families = useMemo(() => buildFamilies(products), [products]);
  const resolvedCategory = useMemo(
    () => resolveCategoryKey(activeCategoryKey, categoryGroups),
    [activeCategoryKey, categoryGroups],
  );
  // A chosen category implies its family; an explicit family wins otherwise.
  const effectiveFamily = activeFamily || resolvedCategory?.family || '';

  const chips = useMemo(() => {
    if (effectiveFamily) {
      return {
        list: categoryGroups.filter((g) => g.family === effectiveFamily),
        complete: true,
      };
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
    // Scroll the grid back under the sticky header (scroll-mt handles the offset).
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page header — scroll-mt keeps it clear of the sticky site header on jumps */}
      <div className="bg-white dark:bg-gray-800 shadow-sm scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {locale === 'zh' ? '产品中心' : 'Our Products'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {locale === 'zh' ? '多样化的薄膜产品，满足不同行业需求' : 'Diverse packaging film products to meet different industry needs'}
          </p>
          {/* Active filters */}
          {(effectiveFamily || resolvedCategory) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {effectiveFamily && (
                <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium">
                  {locale === 'zh' ? '系列：' : 'Series: '}
                  {getFamilyLabel(effectiveFamily, locale)}
                  <button
                    type="button"
                    onClick={() => handleFamilyChange('')}
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-200"
                    aria-label={locale === 'zh' ? '清除系列筛选' : 'Clear series filter'}
                  >
                    ✕
                  </button>
                </span>
              )}
              {resolvedCategory && (
                <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium">
                  {locale === 'zh' ? '分类：' : 'Category: '}
                  {locale === 'zh' ? resolvedCategory.labelZh : resolvedCategory.labelEn}
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(null)}
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-200"
                    aria-label={locale === 'zh' ? '清除分类筛选' : 'Clear category filter'}
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-5 mb-6">
          <input
            type="text"
            placeholder={locale === 'zh' ? '搜索产品...' : 'Search products...'}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-5 mb-6">
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

        {/* Result count */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {locale === 'zh'
            ? `共 ${filteredProducts.length} 个产品，显示第 ${rangeStart}–${rangeEnd} 个`
            : `Showing ${rangeStart}–${rangeEnd} of ${filteredProducts.length} products`}
        </p>

        {/* Products Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 scroll-mt-28">
          {pageProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-300 text-lg mb-4">
              {locale === 'zh' ? '没有找到匹配的产品' : 'No products found matching your criteria.'}
            </p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                {locale === 'zh' ? '清除全部筛选' : 'Clear all filters'}
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-10">
            <Pagination page={safePage} totalPages={totalPages} onPageChange={handlePageChange} locale={locale} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center"><p>Loading...</p></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
