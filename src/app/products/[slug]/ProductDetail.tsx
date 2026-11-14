'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiCheck, FiArrowLeft, FiMail, FiPackage } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import ProductImage from '@/components/products/ProductImage';
import InquiryForm from '@/components/contact/InquiryForm';
import { encodeImageUrl, parseProductImages } from '@/lib/images';
import type { Product } from '@/lib/api-types';
import {
  getCategoryDisplayName,
  getProductDesc,
  getProductName,
  parseListField,
  specEntries,
} from '@/components/products/productUtils';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { locale, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);

  const images = parseProductImages(product.images);
  const mainImage = images.length > 0 ? images[Math.min(selectedImage, images.length - 1)] : null;

  const name = getProductName(product, locale);
  const desc = getProductDesc(product, locale);
  const otherName = getProductName(product, locale === 'zh' ? 'en' : 'zh');
  const categoryLabel = getCategoryDisplayName(product.category, locale);
  const specs = specEntries(product);

  const features = parseListField(locale === 'zh' ? product.featuresZh : product.featuresEn);
  const featuresAlt = features.length > 0 ? features : parseListField(locale === 'zh' ? product.featuresEn : product.featuresZh);
  const applications = parseListField(locale === 'zh' ? product.applicationsZh : product.applicationsEn);
  const applicationsAlt =
    applications.length > 0 ? applications : parseListField(locale === 'zh' ? product.applicationsEn : product.applicationsZh);
  const certifications = parseListField(product.certifications);

  return (
    <div className="bg-slate-50">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-sm text-slate-500 sm:px-6 lg:px-8">
          <li>
            <Link href="/" className="hover:text-blue-700">
              {t.nav.home}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/products" className="hover:text-blue-700">
              {t.nav.products}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="min-w-0 truncate font-medium text-slate-900">{name}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div>
            <ProductImage
              key={mainImage || 'placeholder'}
              src={mainImage}
              alt={`${name}${categoryLabel ? ` — ${categoryLabel}` : ''}`}
              productName={name}
              categoryLabel={categoryLabel}
              className="aspect-square w-full rounded-2xl border border-slate-200"
              eager
            />
            {images.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {images.slice(0, 6).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`${name} ${index + 1}`}
                    aria-current={index === selectedImage}
                    className={`h-16 w-16 overflow-hidden rounded-lg border bg-white transition ${
                      index === selectedImage ? 'border-blue-600 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={encodeImageUrl(image)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            {categoryLabel && (
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800 hover:bg-blue-100"
              >
                {categoryLabel}
              </Link>
            )}
            <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {name}
            </h1>
            {desc && <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{desc}</p>}

            {/* Specs */}
            {specs.length > 0 && (
              <dl className="mt-5 grid grid-cols-2 gap-2">
                {specs.map((spec) => (
                  <div key={spec.labelEn} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      {locale === 'zh' ? spec.labelZh : spec.labelEn}
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold text-slate-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <a
                href="#inquiry"
                className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-base font-semibold text-white hover:bg-blue-800"
              >
                <FiMail className="h-5 w-5" aria-hidden />
                {t.products.inquire}
              </a>
              <a
                href="#inquiry"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-base font-semibold text-slate-800 hover:border-blue-600 hover:text-blue-700"
              >
                <FiPackage className="h-5 w-5" aria-hidden />
                {t.products.requestSample}
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">{t.products.moqNote}</p>

            {/* Cross-language name helps buyers searching in English */}
            {otherName && otherName !== name && (
              <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
                <span className="font-medium text-slate-700">{otherName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuresAlt.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">{t.products.features}</h2>
              <ul className="mt-3 space-y-2">
                {featuresAlt.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {applicationsAlt.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">{t.products.applications}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {applicationsAlt.map((item) => (
                  <li key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {specs.length > 0 && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">{t.products.specifications}</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {specs.map((spec) => (
                <div key={spec.labelEn}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {locale === 'zh' ? spec.labelZh : spec.labelEn}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-slate-500">{t.products.specNote}</p>
            {certifications.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                {certifications.map((cert) => (
                  <span key={cert} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Inquiry */}
        <section id="inquiry" className="mt-10 scroll-mt-28">
          <InquiryForm productSlug={product.slug} productName={name} />
        </section>

        <Link
          href="/products"
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          {t.common.viewAll}
        </Link>
      </div>
    </div>
  );
}
