'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiAward, FiCheck, FiArrowLeft } from 'react-icons/fi';

export default function CertificationsPage() {
  const { locale } = useLanguage();

  const certifications = [
    {
      name: 'ISO 9001:2015',
      descEn: 'Quality Management System - Ensures consistent quality in products and services.',
      descZh: '质量管理体系 - 确保产品和服务的一致性质量。',
      issuer: 'International Organization for Standardization',
    },
    {
      name: 'FDA',
      descEn: 'Food and Drug Administration - Compliance for food contact materials.',
      descZh: '美国食品药品监督管理局 - 食品接触材料合规。',
      issuer: 'U.S. Food and Drug Administration',
    },
    {
      name: 'SGS',
      descEn: 'Testing and Certification - Independent testing and verification services.',
      descZh: '测试与认证 - 独立的测试和验证服务。',
      issuer: 'SGS Group',
    },
    {
      name: 'RoHS',
      descEn: 'Restriction of Hazardous Substances - Environmental compliance for electronic products.',
      descZh: '有害物质限制指令 - 电子产品的环保合规。',
      issuer: 'European Union',
    },
    {
      name: 'REACH',
      descEn: 'Registration, Evaluation, Authorization of Chemicals - EU chemical regulation.',
      descZh: '化学品注册、评估、授权 - 欧盟化学品法规。',
      issuer: 'European Chemicals Agency',
    },
    {
      name: 'ISO 14001',
      descEn: 'Environmental Management System - Commitment to environmental responsibility.',
      descZh: '环境管理体系 - 对环境保护的承诺。',
      issuer: 'International Organization for Standardization',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <FiArrowLeft className="w-5 h-5 mr-2" />
            {locale === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {locale === 'zh' ? '认证资质' : 'Certifications & Quality'}
          </h1>
          <p className="text-gray-600">
            {locale === 'zh'
              ? '我们的产品符合国际标准和认证要求，确保产品质量和安全。'
              : 'Our products meet international standards and certification requirements, ensuring quality and safety.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <FiAward className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
              <p className="text-sm text-blue-600 mb-4">{cert.issuer}</p>
              <p className="text-gray-600 text-sm">
                {locale === 'zh' ? cert.descZh : cert.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Commitment */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'zh' ? '质量承诺' : 'Quality Commitment'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                {[
                  { en: 'Strict quality control at every production stage', zh: '每个生产阶段严格的质量控制' },
                  { en: 'Advanced testing equipment and methods', zh: '先进的测试设备和方法' },
                  { en: 'Continuous improvement and innovation', zh: '持续改进和创新' },
                  { en: 'Customer satisfaction guarantee', zh: '客户满意度保证' },
                  { en: 'On-time delivery commitment', zh: '按时交付承诺' },
                  { en: '24/7 technical support', zh: '7x24小时技术支持' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{locale === 'zh' ? item.zh : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-gray-600">{locale === 'zh' ? '产品合格率' : 'Product Pass Rate'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
