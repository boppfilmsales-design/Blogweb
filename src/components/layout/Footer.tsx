'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { getCategoryDisplayName } from '@/components/products/productUtils';

const FooterSection = () => {
  const { t, isRTL, locale } = useLanguage();
  const [footerContent, setFooterContent] = useState({
    companyDescEn: '',
    companyDescZh: '',
    address: '',
    phone: '',
    email: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    copyright: '',
    friendLinks: [] as Array<{name: string; url: string}>,
  });

  useEffect(() => {
    // 首先从localStorage加载
    const savedData = localStorage.getItem('aec-page-content');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.footer) setFooterContent(data.footer);
      } catch (e) {
        console.error('Failed to parse saved footer data:', e);
      }
    }

    // 然后从API加载（API可能有更新的数据，但localStorage优先）
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data: any) => {
        // 只使用API数据填充localStorage中没有的字段
        if (data.footer) {
          setFooterContent(prev => ({
            companyDescEn: prev.companyDescEn || data.footer.companyDescEn || '',
            companyDescZh: prev.companyDescZh || data.footer.companyDescZh || '',
            address: prev.address || data.footer.address || '',
            phone: prev.phone || data.footer.phone || '',
            email: prev.email || data.footer.email || '',
            facebook: prev.facebook || data.footer.facebook || '',
            twitter: prev.twitter || data.footer.twitter || '',
            linkedin: prev.linkedin || data.footer.linkedin || '',
            instagram: prev.instagram || data.footer.instagram || '',
            copyright: prev.copyright || data.footer.copyright || '',
            friendLinks: Array.isArray(data.footer.friendLinks) ? data.footer.friendLinks : prev.friendLinks,
          }));
        }
      })
      .catch((error) => console.error('Failed to load footer content:', error));
  }, []);

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const productCategories = [
    { href: '/products?category=boppfilm-printing', id: 'boppfilm-printing' },
    { href: '/products?category=boppfilm-cigarette', id: 'boppfilm-cigarette' },
    { href: '/products?category=boppfilm-metallized', id: 'boppfilm-metallized' },
    { href: '/products?category=bopet-clear', id: 'bopet-clear' },
    { href: '/products?category=bopet-thermal', id: 'bopet-thermal' },
    { href: '/products?category=bopa-12mic', id: 'bopa-12mic' },
    { href: '/products?category=bops-glossy', id: 'bops-glossy' },
    { href: '/products?category=cpp', id: 'cpp' },
    { href: '/products?category=pof-central', id: 'pof-central' },
    { href: '/products?category=tear-tape', id: 'tear-tape' },
    { href: '/products?category=labels-rolls', id: 'labels-rolls' },
    { href: '/products?category=bags-sheets-group', id: 'bags-sheets-group' },
  ];

  // Copyright line: normalise the CMS value so the sentence always reads
  // "© 2026 AEC Group. All Rights Reserved." with exactly one space after the period.
  const copyrightText =
    (footerContent.copyright || '').trim().replace(/^\.+/, '').trim() || t.footer.copyright;
  const companyDesc =
    (locale === 'zh' ? footerContent.companyDescZh : footerContent.companyDescEn) || t.footer.companyDesc;
  const contactEmail = footerContent.email || 'sale@boppfilmsale.com';
  const contactPhone = footerContent.phone || '86-551-64687285';

  const socialLinks = [
    { icon: FiFacebook, href: footerContent.facebook || '#', label: 'Facebook' },
    { icon: FiTwitter, href: footerContent.twitter || '#', label: 'Twitter' },
    { icon: FiLinkedin, href: footerContent.linkedin || '#', label: 'LinkedIn' },
    { icon: FiInstagram, href: footerContent.instagram || '#', label: 'Instagram' },
  ];

  return (
    <div className="bg-gray-900 text-white" role="contentinfo">
      {/* Brand accent */}
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/favicon.jpg" alt="AEC Group" className="w-10 h-10 rounded-lg object-cover" />
              <div className={`${isRTL ? 'mr-2' : 'ml-2'}`}>
                <h3 className="text-xl font-bold">AEC Group</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm">{companyDesc}</p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.products}</h4>
            <ul className="space-y-2">
              {productCategories.map((category, index) => (
                <li key={index}>
                  <Link href={category.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {getCategoryDisplayName(category.id, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              {footerContent.address && (
                <li className="flex items-start space-x-3">
                  <FiMapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">{footerContent.address}</span>
                </li>
              )}
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{contactPhone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{contactEmail}</span>
              </li>
            </ul>
            {/* Friend Links */}
            {footerContent.friendLinks && footerContent.friendLinks.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">{locale === 'zh' ? '友情链接' : 'Friend Links'}</h4>
                <ul className="space-y-2">
                  {footerContent.friendLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 AEC Group. {copyrightText}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
