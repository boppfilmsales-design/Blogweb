'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts, createProduct, updateProduct, deleteProduct, importProducts, exportProductsToJSON, exportProductsToCSV } from '@/lib/api';
import type { Product } from '@/lib/api';
import { FiDownload, FiUpload, FiEdit, FiTrash2, FiPlus, FiSave, FiX, FiImage, FiSettings, FiFileText, FiPackage, FiLogOut, FiRefreshCw, FiMenu, FiLink, FiEye, FiEyeOff } from 'react-icons/fi';

interface NavItem {
  id: string;
  labelEn: string;
  labelZh: string;
  href: string;
  order: number;
  visible: boolean;
}

interface PageContent {
  hero: { titleEn: string; titleZh: string; descEn: string; descZh: string };
  about: { contentEn: string; contentZh: string };
  contact: { address: string; phone: string; email: string; whatsapp: string };
  header: { logoText: string; logoSubtext: string };
  footer: { companyDescEn: string; companyDescZh: string; address: string; phone: string; email: string; facebook: string; twitter: string; linkedin: string; instagram: string; copyright: string };
  navigation: NavItem[];
}

export default function AdminPage() {
  const { locale } = useLanguage();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'navigation' | 'about' | 'pages' | 'header' | 'footer' | 'media' | 'settings' | 'import-export'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [importStatus, setImportStatus] = useState<string>('');
  const [pageContent, setPageContent] = useState<PageContent>({
    hero: { titleEn: '', titleZh: '', descEn: '', descZh: '' },
    about: { contentEn: '', contentZh: '' },
    contact: { address: '', phone: '', email: '', whatsapp: '' },
    header: { logoText: '', logoSubtext: '' },
    footer: { companyDescEn: '', companyDescZh: '', address: '', phone: '', email: '', facebook: '', twitter: '', linkedin: '', instagram: '', copyright: '' },
    navigation: [],
  });
  const [savingPage, setSavingPage] = useState(false);
  const [editingNav, setEditingNav] = useState<NavItem | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = sessionStorage.getItem('admin_logged_in');
      if (loggedIn === 'true') {
        setIsAuthenticated(true);
        loadProducts();
        loadPageContent();
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

  const handleLogout = () => {
    if (typeof window !== 'undefined') sessionStorage.removeItem('admin_logged_in');
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
    if (!confirm('Delete this product?')) return;
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

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }

    if (uploadedUrls.length > 0 && editingProduct) {
      const currentImages = JSON.parse(editingProduct.images || '[]');
      setEditingProduct({
        ...editingProduct,
        images: JSON.stringify([...currentImages, ...uploadedUrls])
      });
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = (url: string) => {
    if (!editingProduct) return;
    const currentImages = JSON.parse(editingProduct.images || '[]');
    setEditingProduct({
      ...editingProduct,
      images: JSON.stringify(currentImages.filter((img: string) => img !== url))
    });
  };

  const handleSavePageContent = async (page: 'hero' | 'about' | 'contact' | 'header' | 'footer') => {
    setSavingPage(true);
    try {
      await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [page]: pageContent[page] }),
      });
      alert('Saved successfully!');
    } catch (error) {
      alert('Failed to save');
    }
    setSavingPage(false);
  };

  const handleAddNavItem = () => {
    setEditingNav({
      id: 'nav-' + Date.now(),
      labelEn: '',
      labelZh: '',
      href: '/',
      order: (pageContent.navigation?.length || 0) + 1,
      visible: true,
    });
  };

  const handleSaveNavItem = async () => {
    if (!editingNav) return;
    const nav = pageContent.navigation || [];
    const existingIndex = nav.findIndex(n => n.id === editingNav.id);

    let newNav;
    if (existingIndex >= 0) {
      newNav = [...nav];
      newNav[existingIndex] = editingNav;
    } else {
      newNav = [...nav, editingNav];
    }

    setPageContent({ ...pageContent, navigation: newNav });

    try {
      await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navigation: newNav }),
      });
      setEditingNav(null);
      alert('Navigation item saved!');
    } catch (error) {
      alert('Failed to save navigation item');
    }
  };

  const handleDeleteNavItem = async (id: string) => {
    if (!confirm('Delete this navigation item?')) return;
    const newNav = (pageContent.navigation || []).filter(n => n.id !== id);
    setPageContent({ ...pageContent, navigation: newNav });
    try {
      await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navigation: newNav }),
      });
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleToggleNavVisibility = async (id: string) => {
    const newNav = (pageContent.navigation || []).map(n =>
      n.id === id ? { ...n, visible: !n.visible } : n
    );
    setPageContent({ ...pageContent, navigation: newNav });
    try {
      await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navigation: newNav }),
      });
    } catch (error) {
      console.error('Failed to toggle visibility');
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
    { id: 'navigation', label: locale === 'zh' ? '导航管理' : 'Navigation', icon: FiMenu },
    { id: 'about', label: locale === 'zh' ? '关于我们' : 'About Us', icon: FiFileText },
    { id: 'pages', label: locale === 'zh' ? '页面管理' : 'Pages', icon: FiFileText },
    { id: 'header', label: locale === 'zh' ? '页眉设置' : 'Header', icon: FiPackage },
    { id: 'footer', label: locale === 'zh' ? '页脚设置' : 'Footer', icon: FiPackage },
    { id: 'media', label: locale === 'zh' ? '媒体库' : 'Media', icon: FiImage },
    { id: 'settings', label: locale === 'zh' ? '网站设置' : 'Settings', icon: FiSettings },
    { id: 'import-export', label: locale === 'zh' ? '导入/导出' : 'Import/Export', icon: FiUpload },
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {locale === 'zh' ? '后台管理' : 'Admin Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <a href="/" target="_blank" className="text-blue-600 hover:text-blue-800 text-sm">
                {locale === 'zh' ? '查看网站 →' : 'View Website →'}
              </a>
              <button type="button" onClick={handleLogout} className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg" aria-label="Logout">
                <FiLogOut className="w-4 h-4 mr-1" /> {locale === 'zh' ? '退出' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-sm ${activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <tab.icon className="w-4 h-4" /><span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{locale === 'zh' ? '产品列表' : 'Products'}</h2>
                  <button type="button" onClick={handleCreateProduct} className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    <FiPlus className="w-4 h-4 mr-1" /> {locale === 'zh' ? '添加产品' : 'Add Product'}
                  </button>
                </div>

                {isEditing && editingProduct ? (
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">{editingProduct.id ? (locale === 'zh' ? '编辑产品' : 'Edit') : (locale === 'zh' ? '新建产品' : 'New')}</h3>
                      <button type="button" onClick={() => { setIsEditing(false); setEditingProduct(null); }} className="text-gray-500 hover:text-gray-700" aria-label="Close edit"><FiX className="w-5 h-5" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input id="slug" type="text" value={editingProduct.slug} onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select id="category" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                          <option value="bopp-gloss">BOPP Gloss</option><option value="bopp-matte">BOPP Matte</option><option value="bopp-metalized">BOPP Metalized</option>
                          <option value="bopp-heatseal">BOPP Heat Seal</option><option value="bopp-white">BOPP White</option><option value="bopp-tape">BOPP Tape</option>
                          <option value="bopet">BOPET</option><option value="bops">BOPS</option><option value="cpp">CPP</option><option value="tape">Tape</option><option value="pof">POF</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
                        <input id="nameEn" type="text" value={editingProduct.nameEn} onChange={(e) => setEditingProduct({ ...editingProduct, nameEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label htmlFor="nameZh" className="block text-sm font-medium text-gray-700 mb-1">Name (ZH)</label>
                        <input id="nameZh" type="text" value={editingProduct.nameZh} onChange={(e) => setEditingProduct({ ...editingProduct, nameZh: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="descEn" className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                        <textarea id="descEn" rows={2} value={editingProduct.descriptionEn} onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="descZh" className="block text-sm font-medium text-gray-700 mb-1">Description (ZH)</label>
                        <textarea id="descZh" rows={2} value={editingProduct.descriptionZh} onChange={(e) => setEditingProduct({ ...editingProduct, descriptionZh: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label htmlFor="thickness" className="block text-sm font-medium text-gray-700 mb-1">Thickness</label>
                        <input id="thickness" type="text" value={editingProduct.thickness} onChange={(e) => setEditingProduct({ ...editingProduct, thickness: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                        <input id="width" type="text" value={editingProduct.width} onChange={(e) => setEditingProduct({ ...editingProduct, width: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                        <input id="material" type="text" value={editingProduct.material} onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input id="featured" type="checkbox" checked={editingProduct.featured} onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })} className="w-4 h-4" />
                        <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured</label>
                      </div>

                      {/* Image Upload Section */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiImage className="inline w-4 h-4 mr-1" /> {locale === 'zh' ? '产品图片' : 'Product Images'}
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(() => {
                            try {
                              const images = JSON.parse(editingProduct.images || '[]');
                              return images.map((url: string, idx: number) => (
                                <div key={idx} className="relative w-20 h-20">
                                  <img src={url} alt="" className="w-full h-full object-cover rounded" />
                                  <button type="button" onClick={() => handleRemoveImage(url)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">×</button>
                                </div>
                              ));
                            } catch { return null; }
                          })()}
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="productImageUpload" />
                        <label htmlFor="productImageUpload" className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                          <FiUpload className="w-4 h-4 mr-1" /> {locale === 'zh' ? '上传图片' : 'Upload Images'}
                        </label>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button type="button" onClick={() => { setIsEditing(false); setEditingProduct(null); }} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">{locale === 'zh' ? '取消' : 'Cancel'}</button>
                      <button type="button" onClick={handleSaveProduct} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"><FiSave className="w-4 h-4 mr-1" /> {locale === 'zh' ? '保存' : 'Save'}</button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="p-6 text-center text-gray-500">{locale === 'zh' ? '加载中...' : 'Loading...'}</div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{locale === 'zh' ? '产品' : 'Product'}</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{locale === 'zh' ? '分类' : 'Category'}</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{locale === 'zh' ? '厚度' : 'Thickness'}</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{locale === 'zh' ? '操作' : 'Actions'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="flex items-center space-x-2">
                                  {(() => {
                                    try {
                                      const images = JSON.parse(product.images || '[]');
                                      if (images.length > 0) return <img src={images[0]} alt="" className="w-10 h-10 object-cover rounded" />;
                                    } catch {}
                                    return <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center"><FiImage className="w-4 h-4 text-gray-400" /></div>;
                                  })()}
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{product.nameEn}</div>
                                    <div className="text-xs text-gray-500">{product.nameZh}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{product.category}</span></td>
                              <td className="px-4 py-3 text-sm text-gray-900">{product.thickness}</td>
                              <td className="px-4 py-3">
                                <div className="flex space-x-1">
                                  <button type="button" onClick={() => handleEditProduct(product)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" aria-label="Edit"><FiEdit className="w-4 h-4" /></button>
                                  <button type="button" onClick={() => handleDeleteProduct(product.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" aria-label="Delete"><FiTrash2 className="w-4 h-4" /></button>
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

            {/* Navigation Tab */}
            {activeTab === 'navigation' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{locale === 'zh' ? '导航管理' : 'Navigation Management'}</h2>
                  <button type="button" onClick={handleAddNavItem} className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    <FiPlus className="w-4 h-4 mr-1" /> {locale === 'zh' ? '添加导航' : 'Add Item'}
                  </button>
                </div>

                {editingNav ? (
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-medium mb-3">{locale === 'zh' ? '编辑导航项' : 'Edit Navigation Item'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="navLabelEn" className="block text-sm font-medium text-gray-700 mb-1">Label (EN)</label>
                        <input id="navLabelEn" type="text" value={editingNav.labelEn} onChange={(e) => setEditingNav({ ...editingNav, labelEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label htmlFor="navLabelZh" className="block text-sm font-medium text-gray-700 mb-1">Label (ZH)</label>
                        <input id="navLabelZh" type="text" value={editingNav.labelZh} onChange={(e) => setEditingNav({ ...editingNav, labelZh: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label htmlFor="navHref" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                        <input id="navHref" type="text" value={editingNav.href} onChange={(e) => setEditingNav({ ...editingNav, href: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="/page-name" />
                      </div>
                      <div className="flex items-end space-x-2">
                        <button type="button" onClick={handleSaveNavItem} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"><FiSave className="w-4 h-4 inline mr-1" /> {locale === 'zh' ? '保存' : 'Save'}</button>
                        <button type="button" onClick={() => setEditingNav(null)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">{locale === 'zh' ? '取消' : 'Cancel'}</button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="divide-y divide-gray-200">
                  {(pageContent.navigation || []).sort((a, b) => a.order - b.order).map((nav) => (
                    <div key={nav.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-400 w-6">{nav.order}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{nav.labelEn} / {nav.labelZh}</div>
                          <div className="text-xs text-gray-500">{nav.href}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button type="button" onClick={() => handleToggleNavVisibility(nav.id)} className={`p-1.5 rounded ${nav.visible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`} aria-label={nav.visible ? 'Hide' : 'Show'}>
                          {nav.visible ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                        </button>
                        <button type="button" onClick={() => setEditingNav({ ...nav })} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" aria-label="Edit"><FiEdit className="w-4 h-4" /></button>
                        <button type="button" onClick={() => handleDeleteNavItem(nav.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" aria-label="Delete"><FiTrash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Tab - Dedicated About Page Editor */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">{locale === 'zh' ? '关于我们页面' : 'About Us Page'}</h2>
                <p className="text-gray-500 mb-6">{locale === 'zh' ? '编辑关于我们页面的内容' : 'Edit the content of the About Us page'}</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{locale === 'zh' ? '英文内容' : 'English Content'}</h3>
                    <textarea id="aboutEn" rows={10} value={pageContent.about.contentEn} onChange={(e) => setPageContent({ ...pageContent, about: { ...pageContent.about, contentEn: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" placeholder={locale === 'zh' ? '输入关于我们页面的英文内容...' : 'Enter the English content for the About Us page...'} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{locale === 'zh' ? '中文内容' : 'Chinese Content'}</h3>
                    <textarea id="aboutZh" rows={10} value={pageContent.about.contentZh} onChange={(e) => setPageContent({ ...pageContent, about: { ...pageContent.about, contentZh: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" placeholder={locale === 'zh' ? '输入关于我们页面的中文内容...' : 'Enter the Chinese content for the About Us page...'} />
                  </div>
                  <button type="button" onClick={() => handleSavePageContent('about')} disabled={savingPage} className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">{savingPage ? (locale === 'zh' ? '保存中...' : 'Saving...') : (locale === 'zh' ? '保存关于我们' : 'Save About Us')}</button>
                </div>
              </div>
            )}

            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3">{locale === 'zh' ? 'Hero区域' : 'Hero Section'}</h2>
                  <div className="space-y-3">
                    <div><label htmlFor="heroTitleEn" className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label><input id="heroTitleEn" type="text" value={pageContent.hero.titleEn} onChange={(e) => setPageContent({ ...pageContent, hero: { ...pageContent.hero, titleEn: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="heroTitleZh" className="block text-sm font-medium text-gray-700 mb-1">Title (ZH)</label><input id="heroTitleZh" type="text" value={pageContent.hero.titleZh} onChange={(e) => setPageContent({ ...pageContent, hero: { ...pageContent.hero, titleZh: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="heroDescEn" className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label><textarea id="heroDescEn" rows={2} value={pageContent.hero.descEn} onChange={(e) => setPageContent({ ...pageContent, hero: { ...pageContent.hero, descEn: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="heroDescZh" className="block text-sm font-medium text-gray-700 mb-1">Description (ZH)</label><textarea id="heroDescZh" rows={2} value={pageContent.hero.descZh} onChange={(e) => setPageContent({ ...pageContent, hero: { ...pageContent.hero, descZh: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <button type="button" onClick={() => handleSavePageContent('hero')} disabled={savingPage} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">{savingPage ? 'Saving...' : (locale === 'zh' ? '保存' : 'Save')}</button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3">{locale === 'zh' ? '联系页面' : 'Contact Page'}</h2>
                  <div className="space-y-3">
                    <div><label htmlFor="contactAddress" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '地址' : 'Address'}</label><input id="contactAddress" type="text" value={pageContent.contact.address} onChange={(e) => setPageContent({ ...pageContent, contact: { ...pageContent.contact, address: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '电话' : 'Phone'}</label><input id="contactPhone" type="text" value={pageContent.contact.phone} onChange={(e) => setPageContent({ ...pageContent, contact: { ...pageContent.contact, phone: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label><input id="contactEmail" type="email" value={pageContent.contact.email} onChange={(e) => setPageContent({ ...pageContent, contact: { ...pageContent.contact, email: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="contactWhatsapp" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label><input id="contactWhatsapp" type="text" value={pageContent.contact.whatsapp || ''} onChange={(e) => setPageContent({ ...pageContent, contact: { ...pageContent.contact, whatsapp: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="+86 138 0000 0000" /></div>
                    <button type="button" onClick={() => handleSavePageContent('contact')} disabled={savingPage} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">{savingPage ? 'Saving...' : (locale === 'zh' ? '保存' : 'Save')}</button>
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-4">{locale === 'zh' ? '媒体库' : 'Media Library'}</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium mb-2">{locale === 'zh' ? '上传图片' : 'Upload Images'}</h3>
                  <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="mediaUpload" />
                  <label htmlFor="mediaUpload" className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      <FiUpload className="w-4 h-4 mr-1" /> {locale === 'zh' ? '选择文件' : 'Choose Files'}
                    </span>
                  </label>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {uploadedFiles.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt="" className="w-full aspect-square object-cover rounded" />
                      <button type="button" onClick={() => navigator.clipboard.writeText(url)} className="absolute top-1 right-1 p-1 bg-white rounded opacity-0 group-hover:opacity-100 text-xs">📋</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Header Tab */}
            {activeTab === 'header' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">{locale === 'zh' ? '页眉设置' : 'Header Settings'}</h2>
                <p className="text-gray-500 mb-6">{locale === 'zh' ? '编辑网站顶部的Logo和导航内容' : 'Edit the logo and navigation content at the top of the website'}</p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="logoText" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? 'Logo文字' : 'Logo Text'}</label>
                    <input id="logoText" type="text" value={pageContent.header.logoText} onChange={(e) => setPageContent({ ...pageContent, header: { ...pageContent.header, logoText: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" placeholder="AEC Group" />
                  </div>
                  <div>
                    <label htmlFor="logoSubtext" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '副标题/标语' : 'Subtitle/Tagline'}</label>
                    <input id="logoSubtext" type="text" value={pageContent.header.logoSubtext} onChange={(e) => setPageContent({ ...pageContent, header: { ...pageContent.header, logoSubtext: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" placeholder="Professional Packaging Film Supplier" />
                  </div>
                  <button type="button" onClick={() => handleSavePageContent('header')} disabled={savingPage} className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">{savingPage ? (locale === 'zh' ? '保存中...' : 'Saving...') : (locale === 'zh' ? '保存页眉' : 'Save Header')}</button>
                </div>
              </div>
            )}

            {/* Footer Tab */}
            {activeTab === 'footer' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">{locale === 'zh' ? '页脚设置' : 'Footer Settings'}</h2>
                <p className="text-gray-500 mb-6">{locale === 'zh' ? '编辑网站底部的联系信息和链接' : 'Edit the contact information and links at the bottom of the website'}</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{locale === 'zh' ? '公司信息' : 'Company Information'}</h3>
                    <div className="space-y-3">
                      <div><label htmlFor="footerDescEn" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '公司简介(EN)' : 'Company Description (EN)'}</label><textarea id="footerDescEn" rows={3} value={pageContent.footer.companyDescEn} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, companyDescEn: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" /></div>
                      <div><label htmlFor="footerDescZh" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '公司简介(ZH)' : 'Company Description (ZH)'}</label><textarea id="footerDescZh" rows={3} value={pageContent.footer.companyDescZh} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, companyDescZh: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" /></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{locale === 'zh' ? '联系方式' : 'Contact Information'}</h3>
                    <div className="space-y-3">
                      <div><label htmlFor="footerAddress" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '地址' : 'Address'}</label><input id="footerAddress" type="text" value={pageContent.footer.address} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, address: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label htmlFor="footerPhone" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '电话' : 'Phone'}</label><input id="footerPhone" type="text" value={pageContent.footer.phone} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, phone: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" /></div>
                        <div><label htmlFor="footerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label><input id="footerEmail" type="email" value={pageContent.footer.email} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, email: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" /></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{locale === 'zh' ? '社交媒体' : 'Social Media'}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label htmlFor="footerFb" className="block text-sm font-medium text-gray-700 mb-1">Facebook</label><input id="footerFb" type="text" value={pageContent.footer.facebook} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, facebook: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" placeholder="https://facebook.com/..." /></div>
                      <div><label htmlFor="footerTw" className="block text-sm font-medium text-gray-700 mb-1">Twitter</label><input id="footerTw" type="text" value={pageContent.footer.twitter} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, twitter: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" placeholder="https://twitter.com/..." /></div>
                      <div><label htmlFor="footerLi" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label><input id="footerLi" type="text" value={pageContent.footer.linkedin} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, linkedin: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" placeholder="https://linkedin.com/..." /></div>
                      <div><label htmlFor="footerIg" className="block text-sm font-medium text-gray-700 mb-1">Instagram</label><input id="footerIg" type="text" value={pageContent.footer.instagram} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, instagram: e.target.value } })} className="w-full px-4 py-3 border rounded-lg text-sm" placeholder="https://instagram.com/..." /></div>
                    </div>
                  </div>
                  <button type="button" onClick={() => handleSavePageContent('footer')} disabled={savingPage} className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">{savingPage ? (locale === 'zh' ? '保存中...' : 'Saving...') : (locale === 'zh' ? '保存页脚' : 'Save Footer')}</button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3">{locale === 'zh' ? '页眉设置' : 'Header Settings'}</h2>
                  <div className="space-y-3">
                    <div><label htmlFor="logoText" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? 'Logo文字' : 'Logo Text'}</label><input id="logoText" type="text" value={pageContent.header.logoText} onChange={(e) => setPageContent({ ...pageContent, header: { ...pageContent.header, logoText: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="logoSubtext" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '副标题' : 'Subtitle'}</label><input id="logoSubtext" type="text" value={pageContent.header.logoSubtext} onChange={(e) => setPageContent({ ...pageContent, header: { ...pageContent.header, logoSubtext: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <button type="button" onClick={() => handleSavePageContent('header')} disabled={savingPage} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">{savingPage ? 'Saving...' : (locale === 'zh' ? '保存' : 'Save')}</button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3">{locale === 'zh' ? '页脚设置' : 'Footer Settings'}</h2>
                  <div className="space-y-3">
                    <div><label htmlFor="footerDescEn" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '公司简介(EN)' : 'Company Desc (EN)'}</label><textarea id="footerDescEn" rows={2} value={pageContent.footer.companyDescEn} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, companyDescEn: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="footerDescZh" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '公司简介(ZH)' : 'Company Desc (ZH)'}</label><textarea id="footerDescZh" rows={2} value={pageContent.footer.companyDescZh} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, companyDescZh: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div><label htmlFor="footerAddress" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '地址' : 'Address'}</label><input id="footerAddress" type="text" value={pageContent.footer.address} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, address: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label htmlFor="footerPhone2" className="block text-sm font-medium text-gray-700 mb-1">{locale === 'zh' ? '电话' : 'Phone'}</label><input id="footerPhone2" type="text" value={pageContent.footer.phone} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, phone: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                      <div><label htmlFor="footerEmail2" className="block text-sm font-medium text-gray-700 mb-1">Email</label><input id="footerEmail2" type="email" value={pageContent.footer.email} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, email: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label htmlFor="footerFb" className="block text-sm font-medium text-gray-700 mb-1">Facebook</label><input id="footerFb" type="text" value={pageContent.footer.facebook} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, facebook: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                      <div><label htmlFor="footerTw" className="block text-sm font-medium text-gray-700 mb-1">Twitter</label><input id="footerTw" type="text" value={pageContent.footer.twitter} onChange={(e) => setPageContent({ ...pageContent, footer: { ...pageContent.footer, twitter: e.target.value } })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                    </div>
                    <button type="button" onClick={() => handleSavePageContent('footer')} disabled={savingPage} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">{savingPage ? 'Saving...' : (locale === 'zh' ? '保存' : 'Save')}</button>
                  </div>
                </div>
              </div>
            )}

            {/* Import/Export Tab */}
            {activeTab === 'import-export' && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3">{locale === 'zh' ? '导出数据' : 'Export Data'}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => exportProductsToJSON(products)} className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"><FiDownload className="w-4 h-4 mr-2" /> Export JSON</button>
                    <button type="button" onClick={() => exportProductsToCSV(products)} className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"><FiDownload className="w-4 h-4 mr-2" /> Export CSV</button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3">{locale === 'zh' ? '导入数据' : 'Import Data'}</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FiUpload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <label className="cursor-pointer">
                      <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Choose JSON File</span>
                      <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                    {importStatus && <div className="mt-3 p-2 bg-green-100 text-green-700 rounded text-sm">{importStatus}</div>}
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
