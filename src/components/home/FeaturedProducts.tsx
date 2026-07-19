'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/products/ProductCard';
import { getProducts, Product } from '@/lib/api';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedProducts = () => {
  const { t, isRTL } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // 从 localStorage 优先加载
        const savedProducts = localStorage.getItem('aec-products');
        if (savedProducts) {
          try {
            const localData = JSON.parse(savedProducts);
            if (Array.isArray(localData) && localData.length > 0) {
              setProducts(localData.filter((p: Product) => p.featured).slice(0, 6));
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error('Failed to parse saved products:', e);
          }
        }

        // 从 API 加载
        const data = await getProducts();
        const featured = data.filter(p => p.featured).slice(0, 6);
        setProducts(featured.length > 0 ? featured : data.slice(0, 6));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.products.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.products.subtitle}
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors group"
          >
            {t.products.viewAll}
            <FiArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
