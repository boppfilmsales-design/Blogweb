'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getProductBySlug, Product } from '@/lib/api';
import { parseProductImages } from '@/lib/images';
import InquiryForm from '@/components/contact/InquiryForm';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';
import ProductImage from '@/components/products/ProductImage';
import {
  getCategoryDisplayName,
  getProductDesc,
  getProductName,
  parseListField,
  specEntries,
} from '@/components/products/productUtils';

// Cloudflare Pages renders this dynamic page on the Edge Runtime.
export const runtime = 'edge';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale, t } = useLanguage();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
    const loadProduct = async () => {
      try {
        // 首先尝试从localStorage加载最新数据
        const savedProducts = localStorage.getItem('aec-products');
        if (savedProducts) {
          try {
            const products: Product[] = JSON.parse(savedProducts);
            const localProduct = products.find((p) => p.slug === slug);
            if (localProduct) {
              setProduct(localProduct);
            }
          } catch (e) {
            console.error('Failed to parse saved products:', e);
          }
        }

        // 然后从API加载（可能更新localStorage中没有的数据）
        const data = await getProductBySlug(slug);
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  const images = useMemo(
    () => (product ? parseProductImages(product.images) : []),
    [product],
  );
  const mainImage = images.length > 0 ? images[Math.min(selectedImage, images.length - 1)] : null;

  const specs = useMemo(() => (product ? specEntries(product) : []), [product]);

  // Features / applications / certifications: current locale first, other locale as fallback.
  // Legacy rows store plain lines or raw HTML blobs; the parser drops table junk and
  // boilerplate, so an empty result means the whole section stays hidden.
  const features = useMemo(() => {
    if (!product) return [];
    const primary = parseListField(locale === 'zh' ? product.featuresZh : product.featuresEn);
    if (primary.length > 0) return primary;
    return parseListField(locale === 'zh' ? product.featuresEn : product.featuresZh);
  }, [product, locale]);

  const applications = useMemo(() => {
    if (!product) return [];
    const primary = parseListField(locale === 'zh' ? product.applicationsZh : product.applicationsEn);
    if (primary.length > 0) return primary;
    return parseListField(locale === 'zh' ? product.applicationsEn : product.applicationsZh);
  }, [product, locale]);

  const certifications = useMemo(() => {
    if (!product) return [];
    const primary = parseListField(product.certifications);
    return primary;
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const name = getProductName(product, locale);
  const desc = getProductDesc(product, locale);
  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  const otherName = getProductName(product, otherLocale);
  const otherDesc = getProductDesc(product, otherLocale);
  const showOtherLang = (otherName && otherName !== name) || !!otherDesc;
  const categoryLabel = getCategoryDisplayName(product.category, locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm min-w-0">
            <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shrink-0">
              Home
            </Link>
            <span className="text-gray-400 shrink-0">/</span>
            <Link href="/products" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shrink-0">
              Products
            </Link>
            <span className="text-gray-400 shrink-0">/</span>
            <span className="text-gray-900 dark:text-white truncate">{name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6">
          <FiArrowLeft className="w-5 h-5 mr-2" />
          {locale === 'zh' ? '查看全部产品' : 'View All Products'}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImage
              key={mainImage || 'placeholder'}
              src={mainImage}
              alt={name}
              productName={name}
              categoryLabel={categoryLabel}
              className="aspect-square w-full rounded-xl shadow-sm"
              eager
            />
            {/* Thumbnail images — click to switch the main photo */}
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.slice(0, 5).map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 transition-all ${
                      idx === selectedImage
                        ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-900'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`${name} — ${locale === 'zh' ? '图片' : 'photo'} ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {categoryLabel && (
                <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
                  {categoryLabel}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 leading-tight">{name}</h1>
              {desc && <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed whitespace-pre-line">{desc}</p>}
            </div>

            {/* Other language name + description */}
            {showOtherLang && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
                {otherName && otherName !== name && (
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{otherName}</h2>
                )}
                {otherDesc && (
                  <p className="text-gray-500 dark:text-gray-400 mt-3 leading-relaxed text-[15px] whitespace-pre-line">
                    {otherDesc}
                  </p>
                )}
              </div>
            )}

            {/* Key specs — only non-empty values */}
            {specs.length > 0 && (
              <dl className="flex flex-wrap gap-2">
                {specs.map((s) => (
                  <div
                    key={s.labelEn}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3.5 py-2 text-sm flex items-center gap-2 min-w-0 flex-wrap"
                  >
                    <dt className="text-gray-500 dark:text-gray-400">
                      {locale === 'zh' ? s.labelZh : s.labelEn}
                    </dt>
                    <dd className="text-gray-900 dark:text-white font-semibold break-words">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Features — hidden entirely when empty */}
            {features.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.products.features}
                </h3>
                <ul className="space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Applications — hidden entirely when empty */}
            {applications.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.products.applications}
                </h3>
                <ul className="space-y-2">
                  {applications.map((a, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">{a}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certifications — hidden entirely when empty */}
            {certifications.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.products.certifications}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((c, i) => (
                    <span key={i} className="px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Actions */}
            <div className="flex space-x-4 pt-2">
              <Link
                href={`/contact?product=${product.slug}`}
                className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t.products.inquire}
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications table — only non-empty values; hidden when none exist */}
        {specs.length > 0 && (
          <div className="mt-14 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8 scroll-mt-28">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {t.products.specifications}
            </h3>
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
              {specs.map((s) => (
                <div key={s.labelEn}>
                  <dt className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {locale === 'zh' ? s.labelZh : s.labelEn}
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white break-words">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Inquiry Form */}
        <div id="inquiry" className="mt-14 scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            {locale === 'zh' ? '联系我们' : 'Contact Us'}
          </h3>
          <InquiryForm productSlug={product.slug} />
        </div>
      </div>
    </div>
  );
}
