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

const R2_PUBLIC = 'https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev';

interface HeroSlide {
  src: string;
  alt: string;
  captionEn: string;
  captionZh: string;
}

// 首页右侧轮播：白底膜卷影棚图 + 生产线大卷实拍（R2 blogweb-images 桶，2026-11-10 上线预览）
const heroSlides: HeroSlide[] = [
  { src: `${R2_PUBLIC}/hero/mg-3943.jpg`, alt: 'Gold metallized BOPP film roll', captionEn: 'Gold Metallized BOPP Film', captionZh: '金色镀铝 BOPP 膜' },
  { src: `${R2_PUBLIC}/hero/mg-4031.jpg`, alt: 'Metallized BOPP film rolls in gold, copper and silver', captionEn: 'Metallized BOPP Film Rolls', captionZh: '镀铝 BOPP 膜卷' },
  { src: `${R2_PUBLIC}/hero/mg-4053.jpg`, alt: 'BOPP film rolls in assorted colors', captionEn: 'BOPP Film Roll Family', captionZh: 'BOPP 膜卷系列' },
  { src: `${R2_PUBLIC}/hero/jumboroll-factory.jpg`, alt: 'Jumbo film rolls on the production line', captionEn: 'Jumbo Rolls on the Production Line', captionZh: '生产线上的膜卷' },
];

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHero);
  const [locale, setLocale] = useState('en');
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  // 轮播：每 4 秒淡入淡出切一张；鼠标悬停暂停
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    // 首先从localStorage加载
    const savedData = localStorage.getItem('aec-page-content');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.hero) setHeroContent(data.hero);
      } catch (e) {
        console.error('Failed to parse saved hero data:', e);
      }
    }

    // 然后从API加载
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data: any) => {
        if (data.hero) {
          setHeroContent(prev => ({
            titleEn: prev.titleEn || data.hero.titleEn || '',
            titleZh: prev.titleZh || data.hero.titleZh || '',
            subtitleEn: prev.subtitleEn || data.hero.subtitleEn || '',
            subtitleZh: prev.subtitleZh || data.hero.subtitleZh || '',
            descEn: prev.descEn || data.hero.descEn || '',
            descZh: prev.descZh || data.hero.descZh || '',
            ctaTextEn: prev.ctaTextEn || data.hero.ctaTextEn || '',
            ctaTextZh: prev.ctaTextZh || data.hero.ctaTextZh || '',
          }));
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
              <div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* 图片轮播：图片铺满卡片，淡入淡出切换 */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-white/10">
                  {heroSlides.map((s, i) => (
                    <img
                      key={s.src}
                      src={s.src}
                      alt={s.alt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        i === slide ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  {/* 底部说明 */}
                  <div className="absolute bottom-3 left-3 bg-black/45 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full">
                    {locale === 'zh' ? heroSlides[slide].captionZh : heroSlides[slide].captionEn}
                  </div>
                  {/* 圆点指示，可点切换 */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    {heroSlides.map((s, i) => (
                      <button
                        key={s.src}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setSlide(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === slide ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
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
