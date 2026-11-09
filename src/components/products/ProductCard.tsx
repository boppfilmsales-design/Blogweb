'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiEye, FiMail } from 'react-icons/fi';
import type { Product } from '@/lib/api-types';
import { parseProductImages } from '@/lib/images';
import ProductImage from './ProductImage';
import {
  getCategoryDisplayName,
  getProductDesc,
  getProductName,
  specEntries,
} from './productUtils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { locale, t } = useLanguage();

  const name = getProductName(product, locale);
  const desc = getProductDesc(product, locale);
  const categoryLabel = getCategoryDisplayName(product.category, locale);
  const images = parseProductImages(product.images);
  const firstImage = images.length > 0 ? images[0] : null;
  // Only thickness / width usually survive cleaning; show only what exists.
  const specs = specEntries(product).filter(
    (s) => s.labelEn === 'Thickness' || s.labelEn === 'Width',
  );

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full">
      {/* Product Image */}
      <div className="relative">
        <Link href={`/products/${product.slug}`} aria-label={name}>
          <ProductImage
            src={firstImage}
            alt={name}
            productName={name}
            categoryLabel={categoryLabel}
            className="aspect-[4/3] w-full"
          />
        </Link>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 pointer-events-none">
          <Link
            href={`/products/${product.slug}`}
            className="pointer-events-auto w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label={t.products.viewDetails}
          >
            <FiEye className="w-5 h-5" />
          </Link>
          <Link
            href={`/contact?product=${product.slug}`}
            className="pointer-events-auto w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label={t.products.inquire}
          >
            <FiMail className="w-5 h-5" />
          </Link>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        {categoryLabel && (
          <p className="mb-1.5">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              {categoryLabel}
            </span>
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 leading-snug">
            {name}
          </h3>
        </Link>
        {desc && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
            {desc}
          </p>
        )}

        {/* Specifications — only non-empty values, never blank cells or dashes */}
        {specs.length > 0 && (
          <dl className="flex flex-wrap gap-1.5 mb-4">
            {specs.map((s) => (
              <div
                key={s.labelEn}
                className="bg-gray-50 dark:bg-gray-700/60 rounded-md px-2.5 py-1 text-xs flex items-center gap-1.5 min-w-0 flex-wrap"
              >
                <dt className="text-gray-500 dark:text-gray-400">
                  {locale === 'zh' ? s.labelZh : s.labelEn}:
                </dt>
                <dd className="text-gray-800 dark:text-gray-100 font-medium break-words">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Actions */}
        <div className="flex space-x-3 mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            {t.products.viewDetails}
          </Link>
          <Link
            href={`/contact?product=${product.slug}`}
            className="flex items-center justify-center w-11 h-10 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            aria-label={t.products.inquire}
          >
            <FiMail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
