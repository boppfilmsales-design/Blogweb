'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import InquiryForm from '@/components/contact/InquiryForm';
import { FiCheck, FiDownload, FiArrowLeft } from 'react-icons/fi';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t, locale, isRTL } = useLanguage();

  const product = products.find(p => p.slug === slug);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const getLocalizedText = (textObj: any) => {
    return textObj[locale] || textObj.en;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">{t.nav.home}</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">{t.nav.products}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{getLocalizedText(product.name)}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <FiArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {t.products.viewAll}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-4xl">B</span>
                </div>
                <p className="text-blue-600 font-medium">BOPP Film</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-blue-600 font-medium">
                {t.category[product.category as keyof typeof t.category] || product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {getLocalizedText(product.name)}
              </h1>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {getLocalizedText(product.description)}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.products.features}</h3>
              <ul className="space-y-2">
                {getLocalizedText(product.features).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FiCheck className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.products.applications}</h3>
              <div className="flex flex-wrap gap-2">
                {getLocalizedText(product.applications).map((app: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.products.certifications}</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Link
                href={`/contact?product=${product.slug}`}
                className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t.products.inquire}
              </Link>
              <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FiDownload className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t.products.specifications}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Thickness</p>
              <p className="font-medium text-gray-900">{product.specifications.thickness}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Width</p>
              <p className="font-medium text-gray-900">{product.specifications.width}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Length</p>
              <p className="font-medium text-gray-900">{product.specifications.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Weight</p>
              <p className="font-medium text-gray-900">{product.specifications.weight}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Color</p>
              <p className="font-medium text-gray-900">{product.specifications.color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Material</p>
              <p className="font-medium text-gray-900">{product.specifications.material}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">{t.products.relatedProducts}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

        {/* Inquiry Form */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">{t.contact.title}</h3>
          <InquiryForm productSlug={product.slug} />
        </div>
      </div>
    </div>
  );
}
