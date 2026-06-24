'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FiShield, FiDollarSign, FiTruck, FiHeadphones } from 'react-icons/fi';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: FiShield,
      title: t.features.quality.title,
      description: t.features.quality.desc,
      color: 'bg-blue-500',
    },
    {
      icon: FiDollarSign,
      title: t.features.price.title,
      description: t.features.price.desc,
      color: 'bg-green-500',
    },
    {
      icon: FiTruck,
      title: t.features.delivery.title,
      description: t.features.delivery.desc,
      color: 'bg-orange-500',
    },
    {
      icon: FiHeadphones,
      title: t.features.service.title,
      description: t.features.service.desc,
      color: 'bg-purple-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.features.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10000+</div>
              <div className="text-gray-600">Tons Annual Capacity</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15-50</div>
              <div className="text-gray-600">Microns Thickness Range</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">200-1600</div>
              <div className="text-gray-600">mm Width Range</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
