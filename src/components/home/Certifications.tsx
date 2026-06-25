'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FiAward, FiCheck } from 'react-icons/fi';

const Certifications = () => {
  const { locale } = useLanguage();
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

  const certifications = [
    { name: 'ISO 9001', descEn: 'Quality Management System', descZh: '质量管理体系' },
    { name: 'FDA', descEn: 'Food and Drug Administration', descZh: '美国食品药品监督管理局' },
    { name: 'SGS', descEn: 'Testing and Certification', descZh: '测试与认证' },
    { name: 'RoHS', descEn: 'Restriction of Hazardous Substances', descZh: '有害物质限制指令' },
    { name: 'REACH', descEn: 'Registration, Evaluation, Authorization', descZh: '注册、评估、授权' },
    { name: 'ISO 14001', descEn: 'Environmental Management', descZh: '环境管理体系' },
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'zh' ? '认证资质' : 'Certifications & Quality'}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {locale === 'zh'
              ? '我们的产品符合国际标准和认证要求，确保产品质量和安全。'
              : 'Our products meet international standards and certification requirements, ensuring quality and safety.'}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 text-center ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
              <p className="text-gray-500 text-xs">
                {locale === 'zh' ? cert.descZh : cert.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Commitment */}
        <div className={`mt-12 bg-white rounded-2xl p-8 shadow-lg transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {locale === 'zh' ? '质量承诺' : 'Quality Commitment'}
              </h3>
              <ul className="space-y-3">
                {[
                  { en: 'Strict quality control at every production stage', zh: '每个生产阶段严格的质量控制' },
                  { en: 'Advanced testing equipment and methods', zh: '先进的测试设备和方法' },
                  { en: 'Continuous improvement and innovation', zh: '持续改进和创新' },
                  { en: 'Customer satisfaction guarantee', zh: '客户满意度保证' },
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{locale === 'zh' ? item.zh : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-gray-600">{locale === 'zh' ? '产品合格率' : 'Product Pass Rate'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
