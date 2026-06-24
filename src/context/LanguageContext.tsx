'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import zh from '../locales/zh.json';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import es from '../locales/es.json';
import pt from '../locales/pt.json';

type Locale = 'zh' | 'en' | 'ar' | 'es' | 'pt';
type Translations = typeof zh;

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
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && translations[savedLocale]) {
      setLocaleState(savedLocale);
    } else {
      const browserLang = navigator.language.split('-')[0] as Locale;
      if (translations[browserLang]) {
        setLocaleState(browserLang);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = rtlLanguages.includes(newLocale) ? 'rtl' : 'ltr';
  };

  const isRTL = rtlLanguages.includes(locale);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }
  }, [locale, isRTL, mounted]);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
    isRTL,
  };

  if (!mounted) {
    return null;
  }

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
