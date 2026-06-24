'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiCheck, FiUsers, FiAward, FiGlobe, FiTrendingUp } from 'react-icons/fi';

export default function AboutPage() {
  const { t } = useLanguage();

  const stats = [
    { icon: FiUsers, value: '500+', label: 'Global Clients' },
    { icon: FiGlobe, value: '50+', label: 'Countries Served' },
    { icon: FiAward, value: '10+', label: 'Years Experience' },
    { icon: FiTrendingUp, value: '10000+', label: 'Tons Annual Capacity' },
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We maintain the highest quality standards in every product we manufacture.',
    },
    {
      title: 'Customer Focus',
      description: 'Our customers success is our success. We provide comprehensive support.',
    },
    {
      title: 'Innovation',
      description: 'Continuous improvement and innovation drive our product development.',
    },
    {
      title: 'Sustainability',
      description: 'Committed to environmentally responsible manufacturing practices.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BOPP Films Sale</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional BOPP film manufacturer and exporter, committed to providing high-quality packaging solutions for global customers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                BOPP Films Sale was established with a vision to become a leading supplier of high-quality BOPP films to the global packaging industry. With over 10 years of experience, we have grown from a small manufacturing unit to a trusted partner for clients worldwide.
              </p>
              <p>
                Our state-of-the-art manufacturing facility is equipped with advanced production lines and quality control systems. We specialize in producing a wide range of BOPP films including gloss, matte, metalized, heat sealable, and white opaque films.
              </p>
              <p>
                Today, we serve over 500 clients across 50 countries, providing them with premium BOPP film solutions for various applications including food packaging, printing, electronics, and more.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8">
            <div className="aspect-video bg-white/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-3xl">B</span>
                </div>
                <p className="text-blue-600 font-medium">BOPP Films Sale</p>
                <p className="text-blue-500 text-sm">Manufacturing Excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FiCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Certifications & Quality</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['ISO 9001', 'FDA', 'SGS', 'RoHS'].map((cert, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{cert}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your BOPP film requirements and get a competitive quotation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            {t.hero.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
