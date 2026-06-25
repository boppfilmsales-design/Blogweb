'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FiShield, FiDollarSign, FiTruck, FiHeadphones, FiGlobe, FiAward } from 'react-icons/fi';

const Features = () => {
  const { t, locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const features = [
    {
      icon: FiShield,
      titleEn: t.features.quality.title,
      titleZh: '优质品质',
      descEn: t.features.quality.desc,
      descZh: '采用先进生产工艺，严格质量控制，确保每一卷薄膜都达到国际标准',
      color: 'bg-blue-500',
    },
    {
      icon: FiDollarSign,
      titleEn: t.features.price.title,
      titleZh: '竞争价格',
      descEn: t.features.price.desc,
      descZh: '工厂直供，省去中间环节，为客户提供最具竞争力的价格',
      color: 'bg-green-500',
    },
    {
      icon: FiTruck,
      titleEn: t.features.delivery.title,
      titleZh: '快速交付',
      descEn: t.features.delivery.desc,
      descZh: '完善的库存管理和物流体系，确保按时交付全球各地',
      color: 'bg-orange-500',
    },
    {
      icon: FiHeadphones,
      titleEn: t.features.service.title,
      titleZh: '专业服务',
      descEn: t.features.service.desc,
      descZh: '专业技术团队提供全方位支持，从产品选择到应用指导',
      color: 'bg-purple-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === 'zh' ? feature.titleZh : feature.titleEn}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === 'zh' ? feature.descZh : feature.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`mt-16 bg-white rounded-2xl p-8 shadow-lg transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10000+</div>
              <div className="text-gray-600 text-sm">{locale === 'zh' ? '吨年产能' : 'Tons Annual Capacity'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15-50</div>
              <div className="text-gray-600 text-sm">{locale === 'zh' ? '微米厚度范围' : 'Microns Thickness Range'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">200-1600</div>
              <div className="text-gray-600 text-sm">{locale === 'zh' ? '毫米宽度范围' : 'mm Width Range'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
