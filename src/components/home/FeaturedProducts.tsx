'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/lib/api-types';
import { FiArrowRight } from 'react-icons/fi';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const { t } = useLanguage();

  if (products.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16 sm:py-20" id="what-we-make">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{t.products.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {t.products.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t.products.subtitle}</p>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:border-blue-600 hover:text-blue-700"
          >
            {t.products.viewAll}
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          {t.products.specNote}{' '}
          <Link href="/contact" className="font-semibold text-blue-700 hover:underline">
            {t.contact.formTitle} →
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FeaturedProducts;
