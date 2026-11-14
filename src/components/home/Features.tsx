'use client';

import React from 'react';
import { FiShield, FiDollarSign, FiTruck, FiHeadphones, FiGlobe, FiClock } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = [FiDollarSign, FiShield, FiTruck, FiHeadphones, FiGlobe, FiClock];

const Features = () => {
  const { t } = useLanguage();
  const items: Array<{ title: string; desc: string }> = t.features.items;

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t.features.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t.features.subtitle}</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <li
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Features;
