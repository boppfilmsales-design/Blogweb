'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

interface HeroContent {
  titleEn: string;
  titleZh: string;
  subtitleEn: string;
  subtitleZh: string;
  descEn: string;
  descZh: string;
  ctaTextEn: string;
  ctaTextZh: string;
}

const defaultHero: HeroContent = {
  titleEn: 'Professional Packaging Film Supplier',
  titleZh: '专业BOPP薄膜供应商',
  subtitleEn: 'Providing High-Quality Packaging Film Solutions',
  subtitleZh: '为全球包装行业提供高品质BOPP薄膜解决方案',
  descEn: 'We specialize in the production and export of packaging films.',
  descZh: '我们专注于BOPP薄膜的生产和出口。',
  ctaTextEn: 'Browse Products',
  ctaTextZh: '浏览产品',
};

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHero);
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // 获取页面内容
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data) => {
        if (data.hero) {
          setHeroContent(data.hero);
        }
      })
      .catch((error) => console.error('Failed to load hero content:', error));

    // 获取当前语言
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
  }, []);

  const t = (en: string, zh: string) => (locale === 'zh' ? zh : en);

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden min-h-[600px] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* English */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {heroContent.titleEn}
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 mb-4 font-medium">
                {heroContent.subtitleEn}
              </p>
              <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto lg:mx-0">
                {heroContent.descEn}
              </p>
            </div>

            {/* Chinese */}
            <div className="mb-8 pb-8 border-b border-blue-700/50">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {heroContent.titleZh}
              </h2>
              <p className="text-lg text-blue-200 mb-4">
                {heroContent.subtitleZh}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors group"
              >
                {heroContent.ctaTextEn}
                <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                {locale === 'zh' ? '联系我们' : 'Contact Us'}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-blue-700">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-blue-200 text-sm">{locale === 'zh' ? '年经验' : 'Years Experience'}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-blue-200 text-sm">{locale === 'zh' ? '全球客户' : 'Global Clients'}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-blue-200 text-sm">{locale === 'zh' ? '服务国家' : 'Countries Served'}</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-3xl">A</span>
                    </div>
                    <p className="text-white font-medium">AEC Group</p>
                    <p className="text-blue-200 text-sm">Professional Packaging Film Supplier</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-800 font-medium text-sm">ISO 9001 Certified</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-800 font-medium text-sm">FDA Approved</span>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
