'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import InquiryForm from '@/components/contact/InquiryForm';
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle } from 'react-icons/fi';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: FiMapPin,
      title: t.contact.address,
      content: t.contact.addressDetail,
      color: 'bg-blue-500',
    },
    {
      icon: FiPhone,
      title: t.contact.phone,
      content: '+86 138 0000 0000',
      color: 'bg-green-500',
    },
    {
      icon: FiMail,
      title: t.contact.email,
      content: 'info@boppfilmsale.com',
      color: 'bg-purple-500',
    },
    {
      icon: FiMessageCircle,
      title: t.contact.whatsapp,
      content: '+86 138 0000 0000',
      color: 'bg-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.contact.title}</h1>
          <p className="text-gray-600">{t.contact.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{info.title}</h3>
                      <p className="text-gray-600 mt-1">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <FiClock className="w-5 h-5 text-gray-500" />
                  <h3 className="font-medium text-gray-900">{t.contact.businessHours}</h3>
                </div>
                <p className="text-gray-600 ml-7">{t.contact.businessHoursDetail}</p>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FiMapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-blue-600 font-medium">Map Location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
