'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiArrowRight, FiMail } from 'react-icons/fi';
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
  // Thickness and width are the two numbers a buyer scans for.
  const specs = specEntries(product).filter(
    (s) => s.labelEn === 'Thickness' || s.labelEn === 'Width',
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
      <div className="relative">
        <Link href={`/products/${product.slug}`} aria-label={name} tabIndex={-1}>
          <ProductImage
            src={firstImage}
            alt={`${name}${categoryLabel ? ` — ${categoryLabel}` : ''}`}
            productName={name}
            categoryLabel={categoryLabel}
            className="aspect-[4/3] w-full"
          />
        </Link>
        {categoryLabel && (
          <span className="absolute start-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700 shadow-sm">
            {categoryLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-semibold leading-snug text-slate-900">
          <Link href={`/products/${product.slug}`} className="hover:text-blue-700">
            {name}
          </Link>
        </h3>

        {desc && <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">{desc}</p>}

        {specs.length > 0 && (
          <dl className="mt-3 flex flex-wrap gap-1.5">
            {specs.map((spec) => (
              <div
                key={spec.labelEn}
                className="inline-flex max-w-full items-baseline gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-700"
              >
                <dt className="text-slate-500">{locale === 'zh' ? spec.labelZh : spec.labelEn}</dt>
                <dd className="truncate font-semibold">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto flex items-stretch gap-2 pt-4">
          <Link
            href={`/contact?product=${encodeURIComponent(product.slug)}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-700 px-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {t.products.inquire}
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={`/contact?product=${encodeURIComponent(product.slug)}&intent=sample`}
            className="inline-flex min-h-[44px] w-11 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-700"
            aria-label={`${t.products.requestSample}: ${name}`}
            title={t.products.requestSample}
          >
            <FiMail className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
