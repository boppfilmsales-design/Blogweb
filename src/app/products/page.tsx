import React from 'react';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import { FiArrowRight } from 'react-icons/fi';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Diverse BOPP film products to meet different industry needs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-colors"
              >
                {category.name.en}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              {/* Product Image */}
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 font-bold text-2xl">B</span>
                      </div>
                      <p className="text-blue-600 font-medium text-sm">BOPP Film</p>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {product.category}
                  </span>
                </div>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600">
                    {product.name.en}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {product.description.en}
                </p>

                {/* Specifications Preview */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="bg-gray-50 rounded px-2 py-1">
                    <span className="text-gray-500">Thickness:</span>
                    <span className="text-gray-700 ml-1">{product.specifications.thickness}</span>
                  </div>
                  <div className="bg-gray-50 rounded px-2 py-1">
                    <span className="text-gray-500">Width:</span>
                    <span className="text-gray-700 ml-1">{product.specifications.width}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="flex items-center justify-center w-12 h-10 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
