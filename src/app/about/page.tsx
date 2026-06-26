'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiCheck, FiUsers, FiAward, FiGlobe, FiTrendingUp, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface AboutContent {
  introEn: string;
  introZh: string;
  storyEn: string;
  storyZh: string;
}

export default function AboutPage() {
  const { locale } = useLanguage();
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    introEn: '',
    introZh: '',
    storyEn: '',
    storyZh: '',
  });
  const [showFullStory, setShowFullStory] = useState(false);

  useEffect(() => {
    // 从API加载About页面内容
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data) => {
        if (data.about) {
          setAboutContent({
            introEn: data.about.intro?.contentEn || '',
            introZh: data.about.intro?.contentZh || '',
            storyEn: data.about.story?.contentEn || '',
            storyZh: data.about.story?.contentZh || '',
          });
        }
      })
      .catch((error) => console.error('Failed to load about content:', error));
  }, []);

  const stats = [
    { icon: FiUsers, value: '500+', labelEn: 'Global Clients', labelZh: '全球客户' },
    { icon: FiGlobe, value: '50+', labelEn: 'Countries Served', labelZh: '服务国家' },
    { icon: FiAward, value: '10+', labelEn: 'Years Experience', labelZh: '年经验' },
    { icon: FiTrendingUp, value: '10000+', labelEn: 'Tons Annual Capacity', labelZh: '年产能(吨)' },
  ];

  const values = [
    {
      titleEn: 'Quality First',
      titleZh: '质量优先',
      descEn: 'We maintain the highest quality standards in every product we manufacture.',
      descZh: '我们在每个产品中保持最高的质量标准。',
    },
    {
      titleEn: 'Customer Focus',
      titleZh: '客户至上',
      descEn: 'Our customers success is our success. We provide comprehensive support.',
      descZh: '客户的成功就是我们的成功。我们提供全方位的支持。',
    },
    {
      titleEn: 'Innovation',
      titleZh: '创新驱动',
      descEn: 'Continuous improvement and innovation drive our product development.',
      descZh: '持续改进和创新推动我们的产品开发。',
    },
    {
      titleEn: 'Sustainability',
      titleZh: '可持续发展',
      descEn: 'Committed to environmentally responsible manufacturing practices.',
      descZh: '致力于环保的制造实践。',
    },
  ];

  const certifications = ['ISO 9001', 'FDA', 'SGS', 'RoHS'];

  const t = (en: string, zh: string) => (locale === 'zh' ? zh : en);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'zh' ? '关于安徽东渐进出口' : 'About Anhui Eastern Communication Imp.& Exp. Co., Ltd'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {locale === 'zh'
                ? '专业BOPP薄膜制造商和出口商，致力于为全球客户提供优质的包装解决方案。'
                : 'Professional BOPP film manufacturer and exporter, committed to providing high-quality packaging solutions for global customers.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? '我们的故事' : 'Our Story'}
            </h2>
            <div className="space-y-4 text-gray-600">
              {(() => {
                const storyText = locale === 'zh' ? aboutContent.storyZh : aboutContent.storyEn;
                const lines = storyText.split('\n');
                const previewLines = 3; // 只显示前3行
                const hasMore = lines.length > previewLines;

                if (!showFullStory && hasMore) {
                  return (
                    <>
                      <p className="whitespace-pre-line">{lines.slice(0, previewLines).join('\n')}</p>
                      <button
                        type="button"
                        onClick={() => setShowFullStory(true)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2"
                      >
                        {locale === 'zh' ? '阅读更多' : 'Read more'}
                        <FiChevronDown className="w-4 h-4 ml-1" />
                      </button>
                    </>
                  );
                }

                return (
                  <>
                    <p className="whitespace-pre-line">{storyText}</p>
                    {hasMore && (
                      <button
                        type="button"
                        onClick={() => setShowFullStory(false)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2"
                      >
                        {locale === 'zh' ? '收起' : 'Show less'}
                        <FiChevronUp className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8">
            <div className="aspect-video bg-white/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-3xl">A</span>
                </div>
                <p className="text-blue-600 font-medium">AEC Group</p>
                <p className="text-blue-500 text-sm">Manufacturing Excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{t(stat.labelEn, stat.labelZh)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {locale === 'zh' ? '我们的价值观' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FiCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(value.titleEn, value.titleZh)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(value.descEn, value.descZh)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {locale === 'zh' ? '认证资质' : 'Certifications & Quality'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
