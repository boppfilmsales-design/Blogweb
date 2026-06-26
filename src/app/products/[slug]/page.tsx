'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, Product } from '@/lib/api';
import InquiryForm from '@/components/contact/InquiryForm';
import { FiCheck, FiDownload, FiArrowLeft } from 'react-icons/fi';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.nameEn}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <FiArrowLeft className="w-5 h-5 mr-2" />
          View All Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden">
              {(() => {
                try {
                  const images = JSON.parse(product.images || '[]');
                  if (images.length > 0) {
                    return <img src={images[0]} alt={product.nameEn} className="w-full h-full object-cover" />;
                  }
                } catch {}
                return (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 font-bold text-4xl">A</span>
                      </div>
                      <p className="text-blue-600 font-medium">AEC Group</p>
                    </div>
                  </div>
                );
              })()}
            </div>
            {/* Thumbnail images */}
            {(() => {
              try {
                const images = JSON.parse(product.images || '[]');
                if (images.length > 1) {
                  return (
                    <div className="flex gap-2">
                      {images.slice(1, 5).map((img: string, idx: number) => (
                        <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  );
                }
              } catch {}
              return null;
            })()}
          </div>

          {/* Product Info - Bilingual */}
          <div className="space-y-6">
            {/* English */}
            <div>
              <span className="text-sm text-blue-600 font-medium">{product.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.nameEn}</h1>
              <p className="text-gray-600 mt-4 leading-relaxed">{product.descriptionEn}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Chinese */}
            <div>
              <span className="text-sm text-blue-600 font-medium">{product.category}</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">{product.nameZh}</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">{product.descriptionZh}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features / 产品特点</h3>
              <ul className="space-y-2">
                {(() => {
                  try {
                    const features = JSON.parse(product.featuresEn);
                    return features.map((f: string, i: number) => (
                      <li key={i} className="flex items-center space-x-2">
                        <FiCheck className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{f}</span>
                      </li>
                    ));
                  } catch { return null; }
                })()}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Applications / 应用领域</h3>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  try {
                    const apps = JSON.parse(product.applicationsEn);
                    return apps.map((a: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a}</span>
                    ));
                  } catch { return null; }
                })()}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-4">
              <Link
                href={`/contact?product=${product.slug}`}
                className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Inquire Now / 立即询价
              </Link>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Download specification"
              >
                <FiDownload className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Specifications / 规格参数</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Thickness / 厚度</p>
              <p className="font-medium text-gray-900">{product.thickness}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Width / 宽度</p>
              <p className="font-medium text-gray-900">{product.width}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Length / 长度</p>
              <p className="font-medium text-gray-900">{product.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Weight / 重量</p>
              <p className="font-medium text-gray-900">{product.weight}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Color / 颜色</p>
              <p className="font-medium text-gray-900">{product.color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Material / 材料</p>
              <p className="font-medium text-gray-900">{product.material}</p>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Contact Us / 联系我们</h3>
          <InquiryForm productSlug={product.slug} />
        </div>
      </div>
    </div>
  );
}
