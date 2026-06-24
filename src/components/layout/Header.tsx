'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/data/products';
import { FiMenu, FiX, FiGlobe, FiSearch, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [locale, setLocale] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products', hasDropdown: true },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const getLocalizedText = (textObj: any) => {
    return textObj.en;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div className="ml-2">
              <h1 className="text-xl font-bold text-gray-900">BOPP Films Sale</h1>
              <p className="text-xs text-gray-500">Professional BOPP Film Supplier</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
                    >
                      <span>{item.label}</span>
                      <FiChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Dropdown Menu */}
                    {isProductsOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Product Categories</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {categories.filter(cat => cat.id !== 'all').map((category) => (
                              <div key={category.id} className="mb-3">
                                <Link
                                  href={`/products?category=${category.id}`}
                                  className="font-semibold text-blue-600 hover:text-blue-800 block py-1 text-sm font-bold"
                                  onClick={() => setIsProductsOpen(false)}
                                >
                                  {getLocalizedText(category.name)}
                                </Link>
                                {category.subcategories && (
                                  <div className="ml-2 mt-1 space-y-0.5">
                                    {category.subcategories.slice(0, 4).map((sub) => (
                                      <Link
                                        key={sub.id}
                                        href={`/products?subcategory=${sub.id}`}
                                        className="text-xs text-gray-500 hover:text-blue-600 block py-0.5"
                                        onClick={() => setIsProductsOpen(false)}
                                      >
                                        • {getLocalizedText(sub.name)}
                                      </Link>
                                    ))}
                                    {category.subcategories.length > 4 && (
                                      <span className="text-xs text-gray-400">+{category.subcategories.length - 4} more</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
                          <Link
                            href="/products"
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center"
                            onClick={() => setIsProductsOpen(false)}
                          >
                            View All Products →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Language Selector & Search */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button type="button" className="p-2 text-gray-600 hover:text-blue-600 transition-colors" aria-label="Search">
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Select language"
              >
                <FiGlobe className="w-5 h-5 text-gray-600" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {languages.find(l => l.code === locale)?.flag} {languages.find(l => l.code === locale)?.name}
                </span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code as any);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3 ${
                        locale === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
