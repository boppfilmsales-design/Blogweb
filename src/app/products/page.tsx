'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts, Product } from '@/lib/api';
import { CATEGORIES, getCategoryName } from '@/lib/categories';
import { parseProductImages } from '@/lib/images';
import { FiArrowRight } from 'react-icons/fi';

function ProductsPageContent() {
  const { locale } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || '';
    const category = params.get('category') || '';
    setSearchTerm(search);
    setActiveCategory(category);
    loadProducts();
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

  const filteredProducts = products.filter(product => {
    const matchCategory = !activeCategory || product.category === activeCategory;
    if (!matchCategory) return false;

    if (!searchTerm) return true;
    const name = locale === 'zh' ? product.nameZh : product.nameEn;
    const desc = locale === 'zh' ? product.descriptionZh : product.descriptionEn;
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {locale === 'zh' ? '产品中心' : 'Our Products'}
          </h1>
          <p className="text-gray-600">
            {locale === 'zh' ? '多样化的薄膜产品，满足不同行业需求' : 'Diverse packaging film products to meet different industry needs'}
          </p>
          {activeCategory && (
            <div className="mt-4 inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">
                {locale === 'zh' ? '当前分类：' : 'Category: '}{getCategoryName(activeCategory, locale)}
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('');
                  const url = new URL(window.location.href);
                  url.searchParams.delete('category');
                  window.history.replaceState({}, '', url);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <input
            type="text"
            placeholder={locale === 'zh' ? '搜索产品...' : 'Search products...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter - Horizontal Scroll */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('');
                const url = new URL(window.location.href);
                url.searchParams.delete('category');
                window.history.replaceState({}, '', url);
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !activeCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {locale === 'zh' ? '全部' : 'All'}
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  const url = new URL(window.location.href);
                  url.searchParams.set('category', cat.id);
                  window.history.replaceState({}, '', url);
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {locale === 'zh' ? cat.zh : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                  {(() => {
                    const images = parseProductImages(product.images);
                    if (images.length > 0) {
                      return <img src={images[0]} alt={product.nameEn} className="w-full h-full object-cover" />;
                    }
                    return (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-blue-600 font-bold text-2xl">A</span>
                          </div>
                          <p className="text-blue-600 font-medium text-sm">AEC Group</p>
                        </div>
                      </div>
                    );
                  })()}

                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {getCategoryName(product.category, locale)}
                  </span>
                </div>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600">
                    {locale === 'zh' ? product.nameZh : product.nameEn}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {locale === 'zh' ? product.descriptionZh : product.descriptionEn}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="bg-gray-50 rounded px-2 py-1">
                    <span className="text-gray-500">Thickness:</span>
                    <span className="text-gray-700 ml-1">{product.thickness}</span>
                  </div>
                  <div className="bg-gray-50 rounded px-2 py-1">
                    <span className="text-gray-500">Width:</span>
                    <span className="text-gray-700 ml-1">{product.width}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    {locale === 'zh' ? '查看详情' : 'View Details'}
                  </Link>
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="flex items-center justify-center w-12 h-10 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {locale === 'zh' ? '没有找到匹配的产品' : 'No products found matching your criteria.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading...</p></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
