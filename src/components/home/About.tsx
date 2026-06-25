'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FiCheck, FiUsers, FiGlobe, FiAward } from 'react-icons/fi';

interface AboutContent {
  titleEn: string;
  titleZh: string;
  contentEn: string;
  contentZh: string;
}

const defaultAbout: AboutContent = {
  titleEn: 'About AEC Group',
  titleZh: '关于我们',
  contentEn: 'AEC Group was established in 2014.',
  contentZh: 'AEC集团成立于2014年。',
};

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAbout);
  const [locale, setLocale] = useState('en');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data) => {
        if (data.about) {
          setAboutContent(data.about);
        }
      })
      .catch((error) => console.error('Failed to load about content:', error));

    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: FiUsers, value: '500+', labelEn: 'Global Clients', labelZh: '全球客户' },
    { icon: FiGlobe, value: '50+', labelEn: 'Countries Served', labelZh: '服务国家' },
    { icon: FiAward, value: '10+', labelEn: 'Years Experience', labelZh: '年经验' },
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

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'zh' ? aboutContent.titleZh : aboutContent.titleEn}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Company Story */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? '我们的故事' : 'Our Story'}
            </h3>
            <div className="space-y-4 text-gray-600 whitespace-pre-line">
              {locale === 'zh' ? aboutContent.contentZh : aboutContent.contentEn}
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
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{locale === 'zh' ? stat.labelZh : stat.labelEn}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'zh' ? '我们的价值观' : 'Our Values'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FiCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {locale === 'zh' ? value.titleZh : value.titleEn}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'zh' ? value.descZh : value.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
