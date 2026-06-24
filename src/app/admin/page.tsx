'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { products, categories } from '@/data/products';
import { exportProductsToJSON, exportProductsToCSV, importProductsFromJSON } from '@/utils/export';
import { FiDownload, FiUpload, FiEdit, FiTrash2, FiPlus, FiSave, FiX } from 'react-icons/fi';

export default function AdminPage() {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<'products' | 'import-export'>('products');
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string>('');

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedProducts = await importProductsFromJSON(file);
      console.log('Imported products:', importedProducts);
      setImportStatus('Import successful! (Note: This is a demo - changes are not persisted)');
    } catch (error) {
      setImportStatus('Import failed. Please check the file format.');
    }
  };

  const getLocalizedText = (textObj: any) => {
    return textObj[locale] || textObj.en;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your products and content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Products Management
              </button>
              <button
                onClick={() => setActiveTab('import-export')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'import-export'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Import/Export
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Products Management Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FiPlus className="w-5 h-5 mr-2" />
                    Add Product
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thickness
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Featured
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {getLocalizedText(product.name)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.slug}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.specifications.thickness}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              product.featured
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.featured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingProduct(product.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <FiEdit className="w-5 h-5" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Import/Export Tab */}
            {activeTab === 'import-export' && (
              <div className="space-y-8">
                {/* Export Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Products</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={exportProductsToJSON}
                      className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FiDownload className="w-5 h-5 mr-2" />
                      Export as JSON
                    </button>
                    <button
                      onClick={exportProductsToCSV}
                      className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FiDownload className="w-5 h-5 mr-2" />
                      Export as CSV
                    </button>
                  </div>
                </div>

                {/* Import Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Products</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <label className="cursor-pointer">
                        <span className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Choose JSON File
                        </span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImport}
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-gray-500">
                        Upload a JSON file with product data
                      </p>
                    </div>
                    {importStatus && (
                      <div className={`mt-4 p-3 rounded-lg ${
                        importStatus.includes('successful')
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {importStatus}
                      </div>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Import Instructions</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Export your current products first as a backup</li>
                    <li>• Modify the exported file with your changes</li>
                    <li>• Ensure all required fields are present</li>
                    <li>• Upload the modified file to import changes</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
