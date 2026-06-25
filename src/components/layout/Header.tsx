'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiMenu, FiX, FiGlobe, FiSearch, FiChevronDown, FiSun, FiMoon } from 'react-icons/fi';

const Header = () => {
  const { locale, setLocale, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerContent, setHeaderContent] = useState({ logoText: '', logoSubtext: '', email: '', phone: '' });
  const [navItems, setNavItems] = useState<Array<{id: string; labelEn: string; labelZh: string; href: string; visible: boolean}>>([]);

  useEffect(() => {
    // 从API加载页眉和导航数据
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data) => {
        if (data.header) setHeaderContent(data.header);
        if (data.navigation) setNavItems(data.navigation.filter((n: any) => n.visible).sort((a: any, b: any) => a.order - b.order));
      })
      .catch((error) => console.error('Failed to load header content:', error));
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  const categories = [
    { id: 'bopp-gloss', en: 'BOPP Gloss', zh: 'BOPP光膜' },
    { id: 'bopp-matte', en: 'BOPP Matte', zh: 'BOPP哑膜' },
    { id: 'bopp-metalized', en: 'BOPP Metalized', zh: 'BOPP镀铝膜' },
    { id: 'bopet', en: 'BOPET Film', zh: 'BOPET薄膜' },
    { id: 'bops', en: 'BOPS Film', zh: 'BOPS薄膜' },
    { id: 'cpp', en: 'CPP Film', zh: 'CPP薄膜' },
    { id: 'tape', en: 'Tape Products', zh: '胶带产品' },
    { id: 'pof', en: 'POF Film', zh: 'POF薄膜' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white dark:bg-gray-900'}`}>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>📧 {headerContent.email || 'sale@boppfilmsale.com'}</span>
            <span>📞 {headerContent.phone || '+86 138 0000 0000'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="p-1 hover:bg-blue-500 rounded transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img src="/favicon.jpg" alt="AEC Group" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">AEC Group</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Professional Packaging Film Supplier</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              {t.nav.home}
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center space-x-1">
                <span>{t.nav.products}</span>
                <FiChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductsOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 border-b dark:border-gray-700 pb-2">
                      {locale === 'zh' ? '产品分类' : 'Product Categories'}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/products?category=${cat.id}`}
                          className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          {locale === 'zh' ? cat.zh : cat.en}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                    <Link
                      href="/products"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      {locale === 'zh' ? '查看全部产品 →' : 'View All Products →'}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Certifications */}
            <Link href="/certifications" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              {locale === 'zh' ? '认证资质' : 'Certifications'}
            </Link>

            {/* About */}
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              {t.nav.about}
            </Link>

            {/* Contact */}
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              {t.nav.contact}
            </Link>

            {/* Admin Link */}
            <Link href="/admin" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
              {locale === 'zh' ? '管理' : 'Admin'}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Select language"
              >
                <FiGlobe className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">
                  {languages.find(l => l.code === locale)?.flag}
                </span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code as any);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 ${
                        locale === lang.code ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <form action="/products" method="GET" className="relative">
              <input
                type="text"
                name="search"
                placeholder={locale === 'zh' ? '搜索产品...' : 'Search products...'}
                className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500" aria-label="Search">
                <FiSearch className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              {t.nav.home}
            </Link>
            <Link href="/products" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              {t.nav.products}
            </Link>
            <Link href="/certifications" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              {locale === 'zh' ? '认证资质' : 'Certifications'}
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              {t.nav.about}
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              {t.nav.contact}
            </Link>
            <Link href="/admin" className="block py-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
              {locale === 'zh' ? '管理后台' : 'Admin'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
