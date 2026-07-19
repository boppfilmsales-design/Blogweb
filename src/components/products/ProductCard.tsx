'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiEye, FiMail } from 'react-icons/fi';
import type { Product } from '@/lib/api-types';
import { getCategoryName } from '@/lib/categories';
import { parseProductImages } from '@/lib/images';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { locale, t, isRTL } = useLanguage();

  const getLocalizedName = () => {
    return locale === 'zh' ? (product.nameZh || product.nameEn) : (product.nameEn || product.nameZh);
  };

  const getLocalizedDesc = () => {
    const desc = locale === 'zh' ? product.descriptionZh : product.descriptionEn;
    return desc || (locale === 'zh' ? product.descriptionEn : product.descriptionZh);
  };

  // 解析图片
  const getFirstImage = () => {
    const images = parseProductImages(product.images);
    return images.length > 0 ? images[0] : null;
  };

  const firstImage = getFirstImage();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
      {/* Product Image */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
        {firstImage ? (
          <img src={firstImage} alt={product.nameEn} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold text-2xl">A</span>
              </div>
              <p className="text-blue-600 font-medium text-sm">AEC Group</p>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
          <Link
            href={`/products/${product.slug}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FiEye className="w-5 h-5" />
          </Link>
          <Link
            href={`/contact?product=${product.slug}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FiMail className="w-5 h-5" />
          </Link>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium">
            {getCategoryName(product.category, locale === 'zh' ? 'zh' : 'en')}
          </span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600">
            {getLocalizedName()}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
          {getLocalizedDesc()}
        </p>

        {/* Specifications Preview */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-gray-50 rounded px-2 py-1">
            <span className="text-gray-500">Thickness:</span>
            <span className="text-gray-700 ml-1">{product.thickness || '—'}</span>
          </div>
          <div className="bg-gray-50 rounded px-2 py-1">
            <span className="text-gray-500">Width:</span>
            <span className="text-gray-700 ml-1">{product.width || '—'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            {t.products.viewDetails}
          </Link>
          <Link
            href={`/contact?product=${product.slug}`}
            className="flex items-center justify-center w-12 h-10 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FiMail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
