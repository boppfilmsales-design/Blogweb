'use client';

import React, { useState } from 'react';
import { encodeImageUrl } from '@/lib/images';

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  productName: string;
  categoryLabel: string;
  /** Container sizing, e.g. 'aspect-[4/3]' or 'aspect-square'. */
  className?: string;
  eager?: boolean;
}

/**
 * Product image with a tasteful fallback. When a product has no real photo
 * (or the URL fails to load), show a light placeholder with the product name
 * and category instead of a large blank block. Watermarked photos are shown
 * as-is — watermarks are the company's anti-theft marking and are not touched.
 */
const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  productName,
  categoryLabel,
  className = '',
  eager = false,
}) => {
  const [failed, setFailed] = useState(false);
  const url = encodeImageUrl(src);
  const showImage = !!url && !failed;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/70 to-slate-100 ${className}`}>
      {showImage ? (
        <img
          src={url}
          alt={alt || productName}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <div className="w-11 h-11 rounded-xl bg-white/90 border border-blue-100 shadow-sm flex items-center justify-center mb-2.5">
            <span className="text-blue-600 font-bold text-base tracking-tight">AEC</span>
          </div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-blue-500/80">
            {categoryLabel || 'AEC Group'}
          </p>
          <p className="text-sm font-medium text-slate-600 line-clamp-2 mt-1 leading-snug">{productName}</p>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
