'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts, createProduct, updateProduct, deleteProduct, importProducts, exportProductsToJSON, exportProductsToCSV } from '@/lib/api';
import type { Product } from '@/lib/api';
import { FiDownload, FiUpload, FiEdit, FiTrash2, FiPlus, FiSave, FiX, FiImage, FiSettings, FiFileText, FiPackage, FiAward } from 'react-icons/fi';

export default function AdminPage() {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<'products' | 'pages' | 'media' | 'settings' | 'import-export'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [importStatus, setImportStatus] = useState<string>('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct({
      id: '',
      slug: '',
      nameEn: '',
      nameZh: '',
      category: 'bopp-gloss',
      descriptionEn: '',
      descriptionZh: '',
      thickness: '',
      width: '',
      length: '',
      weight: '',
      color: '',
      material: '',
      featuresEn: '[]',
      featuresZh: '[]',
      applicationsEn: '[]',
      applicationsZh: '[]',
      certifications: '[]',
      images: '[]',
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditing(true);
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    try {
      if (editingProduct.id) {
        await updateProduct(editingProduct.id, editingProduct);
      } else {
        await createProduct(editingProduct);
      }
      setIsEditing(false);
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      alert('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importProducts([]);
      setImportStatus(`Import successful! Created: ${imported.created}, Updated: ${imported.updated}`);
      loadProducts();
    } catch (error) {
      setImportStatus('Import failed.');
    }
  };

  const tabs = [
    { id: 'products', label: locale === 'zh' ? '产品管理' : 'Products', icon: FiPackage },
    { id: 'pages', label: locale === 'zh' ? '页面管理' : 'Pages', icon: FiFileText },
    { id: 'media', label: locale === 'zh' ? '媒体管理' : 'Media', icon: FiImage },
    { id: 'settings', label: locale === 'zh' ? '网站设置' : 'Settings', icon: FiSettings },
    { id: 'import-export', label: locale === 'zh' ? '导入/导出' : 'Import/Export', icon: FiUpload },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {locale === 'zh' ? '后台管理' : 'Admin Dashboard'}
              </h1>
              <p className="text-gray-600 text-sm">
                {locale === 'zh' ? '管理网站内容和设置' : 'Manage website content and settings'}
              </p>
            </div>
            <a href="/" target="_blank" className="text-blue-600 hover:text-blue-800 text-sm">
              {locale === 'zh' ? '查看网站 →' : 'View Website →'}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    {locale === 'zh' ? '产品列表' : 'Products'}
                  </h2>
                  <button type="button" onClick={handleCreateProduct} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <FiPlus className="w-5 h-5 mr-2" />
                    {locale === 'zh' ? '添加产品' : 'Add Product'}
                  </button>
                </div>

                {isEditing && editingProduct ? (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">
                        {editingProduct.id ? (locale === 'zh' ? '编辑产品' : 'Edit Product') : (locale === 'zh' ? '新建产品' : 'New Product')}
                      </h3>
                      <button type="button" onClick={() => { setIsEditing(false); setEditingProduct(null); }} className="text-gray-500 hover:text-gray-700">
                        <FiX className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input id="slug" type="text" value={editingProduct.slug} onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product slug" />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select id="category" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product category">
                          <option value="bopp-gloss">BOPP Gloss</option>
                          <option value="bopp-matte">BOPP Matte</option>
                          <option value="bopp-metalized">BOPP Metalized</option>
                          <option value="bopp-heatseal">BOPP Heat Seal</option>
                          <option value="bopp-white">BOPP White</option>
                          <option value="bopp-tape">BOPP Tape</option>
                          <option value="bopet">BOPET</option>
                          <option value="bops">BOPS</option>
                          <option value="cpp">CPP</option>
                          <option value="tape">Tape</option>
                          <option value="pof">POF</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
                        <input id="nameEn" type="text" value={editingProduct.nameEn} onChange={(e) => setEditingProduct({ ...editingProduct, nameEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product name in English" />
                      </div>
                      <div>
                        <label htmlFor="nameZh" className="block text-sm font-medium text-gray-700 mb-1">Name (ZH)</label>
                        <input id="nameZh" type="text" value={editingProduct.nameZh} onChange={(e) => setEditingProduct({ ...editingProduct, nameZh: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product name in Chinese" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="descEn" className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                        <textarea id="descEn" rows={3} value={editingProduct.descriptionEn} onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product description in English" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="descZh" className="block text-sm font-medium text-gray-700 mb-1">Description (ZH)</label>
                        <textarea id="descZh" rows={3} value={editingProduct.descriptionZh} onChange={(e) => setEditingProduct({ ...editingProduct, descriptionZh: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product description in Chinese" />
                      </div>
                      <div>
                        <label htmlFor="thickness" className="block text-sm font-medium text-gray-700 mb-1">Thickness</label>
                        <input id="thickness" type="text" value={editingProduct.thickness} onChange={(e) => setEditingProduct({ ...editingProduct, thickness: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product thickness" />
                      </div>
                      <div>
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                        <input id="width" type="text" value={editingProduct.width} onChange={(e) => setEditingProduct({ ...editingProduct, width: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product width" />
                      </div>
                      <div>
                        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                        <input id="material" type="text" value={editingProduct.material} onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })} className="w-full px-3 py-2 border rounded-lg" aria-label="Product material" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={editingProduct.featured} onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })} className="w-4 h-4" />
                        <label className="text-sm font-medium text-gray-700">Featured</label>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                      <button type="button" onClick={() => { setIsEditing(false); setEditingProduct(null); }} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                        {locale === 'zh' ? '取消' : 'Cancel'}
                      </button>
                      <button type="button" onClick={handleSaveProduct} className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <FiSave className="w-5 h-5 mr-2" />
                        {locale === 'zh' ? '保存' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thickness</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{product.nameEn}</div>
                                <div className="text-sm text-gray-500">{product.nameZh}</div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{product.category}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">{product.thickness}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {product.featured ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <button type="button" onClick={() => handleEditProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                    <FiEdit className="w-5 h-5" />
                                  </button>
                                  <button type="button" onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                    <FiTrash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? 'Hero区域' : 'Hero Section'}</h2>
                  <p className="text-gray-500 text-sm">{locale === 'zh' ? '编辑首页Hero区域内容' : 'Edit homepage hero section content'}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '关于页面' : 'About Page'}</h2>
                  <p className="text-gray-500 text-sm">{locale === 'zh' ? '编辑关于我们页面内容' : 'Edit about us page content'}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '联系页面' : 'Contact Page'}</h2>
                  <p className="text-gray-500 text-sm">{locale === 'zh' ? '编辑联系我们页面内容' : 'Edit contact page content'}</p>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '媒体管理' : 'Media Management'}</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <FiImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">{locale === 'zh' ? '上传媒体文件' : 'Upload Media Files'}</h3>
                  <p className="text-gray-500 mb-4">{locale === 'zh' ? '上传产品图片' : 'Upload images for products'}</p>
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <FiUpload className="w-5 h-5 mr-2" />
                      {locale === 'zh' ? '选择文件' : 'Choose Files'}
                    </span>
                    <input type="file" multiple accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '网站设置' : 'Website Settings'}</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '网站标题' : 'Site Title'}</label>
                      <input type="text" defaultValue="AEC Group" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '网站描述' : 'Site Description'}</label>
                      <textarea rows={3} defaultValue="Professional packaging film supplier" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      {locale === 'zh' ? '保存设置' : 'Save Settings'}
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '联系信息' : 'Contact Information'}</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '地址' : 'Address'}</label>
                      <input type="text" defaultValue="Industrial Park, Suzhou, Jiangsu, China" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '电话' : 'Phone'}</label>
                      <input type="text" defaultValue="+86 138 0000 0000" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" defaultValue="sale@boppfilmsale.com" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      {locale === 'zh' ? '保存联系信息' : 'Save Contact Info'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'import-export' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '导出数据' : 'Export Data'}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button type="button" onClick={() => exportProductsToJSON(products)} className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <FiDownload className="w-5 h-5 mr-2" />
                      Export JSON
                    </button>
                    <button type="button" onClick={() => exportProductsToCSV(products)} className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <FiDownload className="w-5 h-5 mr-2" />
                      Export CSV
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '导入数据' : 'Import Data'}</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Choose JSON File
                      </span>
                      <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                    {importStatus && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">{importStatus}</div>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
