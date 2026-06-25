'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer = () => {
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
  });

  useEffect(() => {
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data) => {
        if (data.footer) setFooterContent(data.footer);
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
    { href: '/products?category=bopp-gloss', label: locale === 'zh' ? 'BOPP光膜' : 'BOPP Gloss Film' },
    { href: '/products?category=bopp-matte', label: locale === 'zh' ? 'BOPP哑膜' : 'BOPP Matte Film' },
    { href: '/products?category=bopet', label: locale === 'zh' ? 'BOPET薄膜' : 'BOPET Film' },
    { href: '/products?category=tape', label: locale === 'zh' ? '胶带产品' : 'Tape Products' },
    { href: '/products?category=cpp', label: locale === 'zh' ? 'CPP薄膜' : 'CPP Film' },
    { href: '/products?category=bops', label: locale === 'zh' ? 'BOPS薄膜' : 'BOPS Film' },
    { href: '/products?category=pof', label: locale === 'zh' ? 'POF薄膜' : 'POF Film' },
  ];

  const socialLinks = [
    { icon: FiFacebook, href: footerContent.facebook || '#', label: 'Facebook' },
    { icon: FiTwitter, href: footerContent.twitter || '#', label: 'Twitter' },
    { icon: FiLinkedin, href: footerContent.linkedin || '#', label: 'LinkedIn' },
    { icon: FiInstagram, href: footerContent.instagram || '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
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
            <p className="text-gray-400 mb-4 text-sm">{locale === 'zh' ? footerContent.companyDescZh : footerContent.companyDescEn}</p>
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
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{footerContent.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{footerContent.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{footerContent.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AEC Group. {footerContent.copyright}
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
    </footer>
  );
};

export default Footer;
