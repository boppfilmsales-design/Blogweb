'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { FiMenu, FiX, FiGlobe, FiSearch, FiChevronDown, FiMail, FiPhone } from 'react-icons/fi';
import { FAMILIES, SITE } from '@/lib/site';

const languages = [
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'zh', name: '中文', short: '中文' },
  { code: 'es', name: 'Español', short: 'ES' },
  { code: 'pt', name: 'Português', short: 'PT' },
  { code: 'ar', name: 'العربية', short: 'AR' },
] as const;

const Header = () => {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close every open panel when the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    setIsLangOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Close popovers on outside click and on Escape.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (productsRef.current && !productsRef.current.contains(target)) setIsProductsOpen(false);
      if (langRef.current && !langRef.current.contains(target)) setIsLangOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProductsOpen(false);
        setIsLangOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const navLinkClass =
    'inline-flex items-center min-h-[44px] px-3 text-[15px] font-medium text-slate-700 hover:text-blue-700 transition-colors';

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        isScrolled
          ? 'border-slate-200 bg-white/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-white'
      }`}
    >
      {/* Contact strip — collapses on scroll so the sticky bar stays slim */}
      <div
        className={`overflow-hidden bg-slate-900 text-slate-200 transition-all duration-300 ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <FiMail className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">{SITE.email}</span>
            </a>
            <a href={`tel:${SITE.phone}`} className="hidden items-center gap-1.5 hover:text-white sm:inline-flex">
              <FiPhone className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">{SITE.phoneDisplay}</span>
            </a>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-slate-400">ISO 9001 · FDA · SGS · REACH</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        {/* Brand — a span, not an <h1>: pages own their single H1 */}
        <Link href="/" className="flex min-h-[56px] items-center gap-3 py-2" aria-label={`${SITE.name} — home`}>
          <img src="/favicon.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-cover" />
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-slate-900">{SITE.name}</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:block">
              {locale === 'zh' ? '包装薄膜制造' : 'Packaging Film Manufacturer'}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <Link href="/" className={navLinkClass}>{t.nav.home}</Link>

          <div className="relative" ref={productsRef}>
            <button
              type="button"
              className={`${navLinkClass} gap-1`}
              aria-expanded={isProductsOpen}
              aria-haspopup="true"
              onClick={() => setIsProductsOpen((open) => !open)}
            >
              {t.nav.products}
              <FiChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} aria-hidden />
            </button>

            {isProductsOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  <div className="grid grid-cols-2 gap-1 p-3">
                    {FAMILIES.map((family) => (
                      <Link
                        key={family.name}
                        href={`/products?group=${encodeURIComponent(family.name)}`}
                        className="rounded-xl px-3 py-2.5 hover:bg-slate-50"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        <span className="block text-sm font-semibold text-slate-900">
                          {locale === 'zh' ? family.zh : family.en}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                          {locale === 'zh' ? family.blurbZh : family.blurbEn}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/products"
                    className="flex min-h-[44px] items-center justify-center border-t border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-blue-700 hover:bg-slate-100"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    {t.products.viewAll} →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/certifications" className={navLinkClass}>{t.nav.certifications}</Link>
          <Link href="/about" className={navLinkClass}>{t.nav.about}</Link>
          <Link href="/contact" className={navLinkClass}>{t.nav.contact}</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsSearchOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-700"
            aria-label={t.nav.search}
            aria-expanded={isSearchOpen}
          >
            <FiSearch className="h-5 w-5" aria-hidden />
          </button>

          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen((open) => !open)}
              className="inline-flex h-11 items-center gap-1 rounded-lg px-2 text-slate-600 hover:bg-slate-100 hover:text-blue-700"
              aria-label={t.nav.language}
              aria-expanded={isLangOpen}
            >
              <FiGlobe className="h-5 w-5" aria-hidden />
              <span className="text-xs font-semibold">
                {languages.find((l) => l.code === locale)?.short}
              </span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLocale(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`flex min-h-[44px] w-full items-center px-4 text-left text-sm hover:bg-slate-50 ${
                      locale === lang.code ? 'font-semibold text-blue-700' : 'text-slate-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="ms-1 hidden min-h-[44px] items-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800 sm:inline-flex"
          >
            {t.nav.getQuote}
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label={isMenuOpen ? t.nav.close : t.nav.menu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <FiX className="h-6 w-6" aria-hidden /> : <FiMenu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Search panel */}
      {isSearchOpen && (
        <div className="border-t border-slate-200 bg-white">
          <form action="/products" method="GET" className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
            <label htmlFor="site-search" className="sr-only">
              {t.nav.search}
            </label>
            <input
              id="site-search"
              type="search"
              name="search"
              placeholder={t.nav.search}
              className="h-12 w-full rounded-lg border border-slate-300 px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center rounded-lg bg-blue-700 px-5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {t.nav.search.replace('...', '').replace('…', '')}
            </button>
          </form>
        </div>
      )}

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3" aria-label="Mobile">
            <ul className="divide-y divide-slate-100">
              {[
                { href: '/', label: t.nav.home },
                { href: '/products', label: t.nav.products },
                { href: '/certifications', label: t.nav.certifications },
                { href: '/about', label: t.nav.about },
                { href: '/contact', label: t.nav.contact },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-[52px] items-center text-base font-medium text-slate-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.products.familiesTitle}
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {FAMILIES.map((family) => (
                <li key={family.name}>
                  <Link
                    href={`/products?group=${encodeURIComponent(family.name)}`}
                    onClick={closeMenu}
                    className="flex min-h-[44px] items-center rounded-lg bg-slate-50 px-3 text-sm font-medium text-slate-700"
                  >
                    {locale === 'zh' ? family.zh : family.en}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-2 pb-2">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex min-h-[48px] items-center justify-center rounded-lg bg-blue-700 px-4 text-base font-semibold text-white"
              >
                {t.nav.getQuote}
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="flex min-h-[48px] items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700"
              >
                {SITE.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
