'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts, Product } from '@/lib/api';
import { FiArrowRight } from 'react-icons/fi';

function ProductsPageContent() {
  const { locale } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 从URL获取搜索参数
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || '';
    setSearchTerm(search);
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const name = locale === 'zh' ? product.nameZh : product.nameEn;
    const desc = locale === 'zh' ? product.descriptionZh : product.descriptionEn;
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getCategoryName = (category: string) => {
    const categories: Record<string, Record<string, string>> = {
      'bopp-gloss': { en: 'BOPP Gloss Film', zh: 'BOPP光膜' },
      'bopp-matte': { en: 'BOPP Matte Film', zh: 'BOPP哑膜' },
      'bopp-metalized': { en: 'BOPP Metalized Film', zh: 'BOPP镀铝膜' },
      'bopp-heatseal': { en: 'BOPP Heat Sealable Film', zh: 'BOPP热封膜' },
      'bopp-white': { en: 'BOPP White Opaque Film', zh: 'BOPP白膜' },
      'bopp-tape': { en: 'BOPP Tape Film', zh: 'BOPP胶带膜' },
      'bopet': { en: 'BOPET Film', zh: 'BOPET薄膜' },
      'bops': { en: 'BOPS Film', zh: 'BOPS薄膜' },
      'cpp': { en: 'CPP Film', zh: 'CPP薄膜' },
      'tape': { en: 'Tape Products', zh: '胶带产品' },
      'pof': { en: 'BOPET Film', zh: 'BOPET薄膜' },
      'tear-tape': { en: 'Tear Tape', zh: '撕裂胶带' },
      'stretch-film': { en: 'Stretch Film', zh: '拉伸膜' },
      'specialty': { en: 'Specialty Films', zh: '特种薄膜' },
    };
    return categories[category]?.[locale] || category;
  };

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
            {locale === 'zh' ? '多样化的BOPP薄膜产品，满足不同行业需求' : 'Diverse packaging film products to meet different industry needs'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <input
            type="text"
            placeholder={locale === 'zh' ? '搜索产品...' : 'Search products...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              {/* Product Image */}
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 font-bold text-2xl">A</span>
                      </div>
                      <p className="text-blue-600 font-medium text-sm">AEC Group</p>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {getCategoryName(product.category)}
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

                {/* Specifications Preview */}
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

                {/* Actions */}
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

        {/* No Results */}
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
