'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts, createProduct, updateProduct, deleteProduct, importProducts, exportProductsToJSON, exportProductsToCSV } from '@/lib/api';
import type { Product } from '@/lib/api';
import { FiDownload, FiUpload, FiEdit, FiTrash2, FiPlus, FiSave, FiX, FiImage, FiSettings, FiFileText, FiPackage, FiAward, FiLogOut, FiRefreshCw } from 'react-icons/fi';

export default function AdminPage() {
  const { locale } = useLanguage();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'pages' | 'media' | 'settings' | 'import-export'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [importStatus, setImportStatus] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [pageContent, setPageContent] = useState({
    hero: { titleEn: '', titleZh: '', descEn: '', descZh: '' },
    about: { contentEn: '', contentZh: '' },
    contact: { address: '', phone: '', email: '' },
  });
  const [savingPage, setSavingPage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = sessionStorage.getItem('admin_logged_in');
      if (loggedIn === 'true') {
        setIsAuthenticated(true);
        loadProducts();
        loadPageContent();
        loadUploadedFiles();
      } else {
        router.push('/admin/login');
      }
    }
  }, [router]);

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

  const loadPageContent = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      setPageContent(data);
    } catch (error) {
      console.error('Failed to load page content:', error);
    }
  };

  const loadUploadedFiles = async () => {
    try {
      const res = await fetch('/api/upload');
      const data = await res.json();
      setUploadedFiles(data.files.map((f: any) => f.url));
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_logged_in');
    }
    router.push('/admin/login');
  };

  const handleCreateProduct = () => {
    setEditingProduct({
      id: '', slug: '', nameEn: '', nameZh: '', category: 'bopp-gloss',
      descriptionEn: '', descriptionZh: '', thickness: '', width: '', length: '',
      weight: '', color: '', material: '', featuresEn: '[]', featuresZh: '[]',
      applicationsEn: '[]', applicationsZh: '[]', certifications: '[]', images: '[]',
      featured: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setUploadedFiles([...uploadedFiles, data.url]);
        alert('Image uploaded successfully!');
      }
    } catch (error) {
      alert('Failed to upload image');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSavePageContent = async (page: 'hero' | 'about' | 'contact') => {
    setSavingPage(true);
    try {
      await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [page]: pageContent[page] }),
      });
      alert('Page content saved successfully!');
    } catch (error) {
      alert('Failed to save page content');
    }
    setSavingPage(false);
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

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {locale === 'zh' ? '后台管理' : 'Admin Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" target="_blank" className="text-blue-600 hover:text-blue-800 text-sm">
                {locale === 'zh' ? '查看网站 →' : 'View Website →'}
              </a>
              <button type="button" onClick={handleLogout} className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                <FiLogOut className="w-4 h-4 mr-1" /> {locale === 'zh' ? '退出' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <tab.icon className="w-5 h-5" /><span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{locale === 'zh' ? '产品列表' : 'Products'}</h2>
                  <button type="button" onClick={handleCreateProduct} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <FiPlus className="w-5 h-5 mr-2" /> {locale === 'zh' ? '添加产品' : 'Add Product'}
                  </button>
                </div>

                {isEditing && editingProduct ? (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">{editingProduct.id ? (locale === 'zh' ? '编辑产品' : 'Edit Product') : (locale === 'zh' ? '新建产品' : 'New Product')}</h3>
                      <button type="button" onClick={() => { setIsEditing(false); setEditingProduct(null); }} className="text-gray-500 hover:text-gray-700"><FiX className="w-6 h-6" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input id="slug" type="text" value={editingProduct.slug} onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select id="category" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                          <option value="bopp-gloss">BOPP Gloss</option><option value="bopp-matte">BOPP Matte</option><option value="bopp-metalized">BOPP Metalized</option>
                          <option value="bopp-heatseal">BOPP Heat Seal</option><option value="bopp-white">BOPP White</option><option value="bopp-tape">BOPP Tape</option>
                          <option value="bopet">BOPET</option><option value="bops">BOPS</option><option value="cpp">CPP</option><option value="tape">Tape</option><option value="pof">POF</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
                        <input id="nameEn" type="text" value={editingProduct.nameEn} onChange={(e) => setEditingProduct({ ...editingProduct, nameEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label htmlFor="nameZh" className="block text-sm font-medium text-gray-700 mb-1">Name (ZH)</label>
                        <input id="nameZh" type="text" value={editingProduct.nameZh} onChange={(e) => setEditingProduct({ ...editingProduct, nameZh: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="descEn" className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                        <textarea id="descEn" rows={3} value={editingProduct.descriptionEn} onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="descZh" className="block text-sm font-medium text-gray-700 mb-1">Description (ZH)</label>
                        <textarea id="descZh" rows={3} value={editingProduct.descriptionZh} onChange={(e) => setEditingProduct({ ...editingProduct, descriptionZh: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label htmlFor="thickness" className="block text-sm font-medium text-gray-700 mb-1">Thickness</label>
                        <input id="thickness" type="text" value={editingProduct.thickness} onChange={(e) => setEditingProduct({ ...editingProduct, thickness: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                        <input id="width" type="text" value={editingProduct.width} onChange={(e) => setEditingProduct({ ...editingProduct, width: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                        <input id="material" type="text" value={editingProduct.material} onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input id="featured" type="checkbox" checked={editingProduct.featured} onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })} className="w-4 h-4" />
                        <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured</label>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                      <button type="button" onClick={() => { setIsEditing(false); setEditingProduct(null); }} className="px-6 py-2 border rounded-lg hover:bg-gray-50">{locale === 'zh' ? '取消' : 'Cancel'}</button>
                      <button type="button" onClick={handleSaveProduct} className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><FiSave className="w-5 h-5 mr-2" /> {locale === 'zh' ? '保存' : 'Save'}</button>
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
                              <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900">{product.nameEn}</div><div className="text-sm text-gray-500">{product.nameZh}</div></td>
                              <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{product.category}</span></td>
                              <td className="px-6 py-4 text-sm text-gray-900">{product.thickness}</td>
                              <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${product.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{product.featured ? 'Yes' : 'No'}</span></td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <button type="button" onClick={() => handleEditProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" aria-label="Edit product"><FiEdit className="w-5 h-5" /></button>
                                  <button type="button" onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" aria-label="Delete product"><FiTrash2 className="w-5 h-5" /></button>
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

            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <div className="space-y-6">
                {/* Hero Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? 'Hero区域' : 'Hero Section'}</h2>
                  <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label><input type="text" value={pageContent.hero.titleEn} onChange={(e) => setPageContent({ ...pageContent, hero: { ...pageContent.hero, titleEn: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Title (ZH)</label><input type="text" value={pageContent.hero.titleZh} onChange={(e) => setPageContent({ ...pageContent, hero: { ...pageContent.hero, titleZh: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label><textarea rows={3} value={pageContent.hero.descEn} onChange={(e) => setPageContent({ ...pageContent, hero: { ...pageContent.hero, descEn: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Description (ZH)</label><textarea rows={3} value={pageContent.hero.descZh} onChange={(e) => setPageContent({ ...pageContent, hero: { ...pageContent.hero, descZh: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <button type="button" onClick={() => handleSavePageContent('hero')} disabled={savingPage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{savingPage ? 'Saving...' : (locale === 'zh' ? '保存' : 'Save')}</button>
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '关于页面' : 'About Page'}</h2>
                  <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Content (EN)</label><textarea rows={6} value={pageContent.about.contentEn} onChange={(e) => setPageContent({ ...pageContent, about: { ...pageContent.about, contentEn: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Content (ZH)</label><textarea rows={6} value={pageContent.about.contentZh} onChange={(e) => setPageContent({ ...pageContent, about: { ...pageContent.about, contentZh: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <button type="button" onClick={() => handleSavePageContent('about')} disabled={savingPage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{savingPage ? 'Saving...' : (locale === 'zh' ? '保存' : 'Save')}</button>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '联系页面' : 'Contact Page'}</h2>
                  <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '地址' : 'Address'}</label><input type="text" value={pageContent.contact.address} onChange={(e) => setPageContent({ ...pageContent, contact: { ...pageContent.contact, address: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '电话' : 'Phone'}</label><input type="text" value={pageContent.contact.phone} onChange={(e) => setPageContent({ ...pageContent, contact: { ...pageContent.contact, phone: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={pageContent.contact.email} onChange={(e) => setPageContent({ ...pageContent, contact: { ...pageContent.contact, email: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <button type="button" onClick={() => handleSavePageContent('contact')} disabled={savingPage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{savingPage ? 'Saving...' : (locale === 'zh' ? '保存' : 'Save')}</button>
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '媒体管理' : 'Media Management'}</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                  <FiImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">{locale === 'zh' ? '上传图片' : 'Upload Images'}</h3>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <span className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <FiUpload className="w-5 h-5 mr-2" /> {locale === 'zh' ? '选择文件' : 'Choose Files'}
                    </span>
                  </label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-4">{locale === 'zh' ? '已上传文件' : 'Uploaded Files'}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedFiles.map((url, index) => (
                        <div key={index} className="relative group">
                          <img src={url} alt="" className="w-full aspect-square object-cover rounded-lg" />
                          <button type="button" onClick={() => navigator.clipboard.writeText(url)} className="absolute top-2 right-2 p-1 bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            📋
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '网站设置' : 'Website Settings'}</h2>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '网站标题' : 'Site Title'}</label><input type="text" defaultValue="AEC Group" className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label><input type="text" defaultValue="BOPP film, packaging film" className="w-full px-3 py-2 border rounded-lg" /></div>
                  <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{locale === 'zh' ? '保存设置' : 'Save Settings'}</button>
                </div>
              </div>
            )}

            {activeTab === 'import-export' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '导出数据' : 'Export Data'}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button type="button" onClick={() => exportProductsToJSON(products)} className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><FiDownload className="w-5 h-5 mr-2" /> Export JSON</button>
                    <button type="button" onClick={() => exportProductsToCSV(products)} className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700"><FiDownload className="w-5 h-5 mr-2" /> Export CSV</button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '导入数据' : 'Import Data'}</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Choose JSON File</span>
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