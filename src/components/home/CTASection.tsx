'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiMail, FiPhone, FiMessageCircle } from 'react-icons/fi';

const CTASection = () => {
  const { locale } = useLanguage();
  const [ctaContent, setCtaContent] = useState({
    titleEn: 'Ready to Get Started?',
    titleZh: '准备开始合作？',
    descEn: 'Contact us today for professional product consultation',
    descZh: '联系我们，获取专业的产品咨询',
    buttonTextEn: 'Contact Us Now',
    buttonTextZh: '立即联系我们',
    email: 'sale@boppfilmsale.com',
    phone: '86-551-64687285',
    whatsapp: '86-18919659471',
  });

  useEffect(() => {
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data) => {
        if (data.cta) {
          setCtaContent({
            titleEn: data.cta.titleEn || 'Ready to Get Started?',
            titleZh: data.cta.titleZh || '准备开始合作？',
            descEn: data.cta.descEn || '',
            descZh: data.cta.descZh || '',
            buttonTextEn: data.cta.buttonTextEn || 'Contact Us Now',
            buttonTextZh: data.cta.buttonTextZh || '立即联系我们',
            email: data.cta.email || 'sale@boppfilmsale.com',
            phone: data.cta.phone || '86-551-64687285',
            whatsapp: data.cta.whatsapp || '86-18919659471',
          });
        }
      })
      .catch((error) => console.error('Failed to load CTA content:', error));
  }, []);

  const contactInfo = [
    {
      icon: FiMail,
      titleEn: 'Email Us',
      titleZh: '邮箱联系',
      content: ctaContent.email || 'sale@boppfilmsale.com',
      color: 'bg-blue-500',
    },
    {
      icon: FiPhone,
      titleEn: 'Call Us',
      titleZh: '电话咨询',
      content: ctaContent.phone || '86-551-64687285',
      color: 'bg-green-500',
    },
    {
      icon: FiMessageCircle,
      titleEn: 'WhatsApp',
      titleZh: 'WhatsApp',
      content: ctaContent.whatsapp || '86-18919659471',
      color: 'bg-green-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'zh' ? ctaContent.titleZh : ctaContent.titleEn}
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {locale === 'zh' ? ctaContent.descZh : ctaContent.descEn}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <info.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'zh' ? info.titleZh : info.titleEn}
              </h3>
              <p className="text-blue-100">{info.content}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            {locale === 'zh' ? ctaContent.buttonTextZh : ctaContent.buttonTextEn}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
