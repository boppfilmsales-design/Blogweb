'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import zh from '../locales/zh.json';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import es from '../locales/es.json';
import pt from '../locales/pt.json';

export type Locale = 'zh' | 'en' | 'ar' | 'es' | 'pt';
type Translations = any;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  isRTL: boolean;
}

const translations: Record<Locale, Translations> = {
  zh,
  en,
  ar,
  es,
  pt,
};

const rtlLanguages: Locale[] = ['ar'];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English is the server-rendered default, so crawlers and first paint get the
  // full English page. A saved preference is applied after mount.
  //
  // The provider used to render `null` until it had mounted, which meant every
  // page was delivered to browsers and crawlers as an empty <body>. It must
  // always render its children.
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = rtlLanguages.includes(saved) ? 'rtl' : 'ltr';
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
      document.documentElement.dir = rtlLanguages.includes(newLocale) ? 'rtl' : 'ltr';
    }
  }, []);

  const isRTL = rtlLanguages.includes(locale);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
