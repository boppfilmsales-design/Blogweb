'use client';

import React from 'react';
import Link from 'next/link';
import { FiAlertTriangle, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

const PainPoints = () => {
  const { t } = useLanguage();
  const items: Array<{ title: string; desc: string }> = t.pain.items;

  return (
    <section className="bg-white py-16 sm:py-20" id="why-aec">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{t.pain.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t.pain.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t.pain.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <FiAlertTriangle className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}

          {/* Solution card completes the grid on large screens */}
          <div className="rounded-2xl bg-slate-900 p-6 text-white sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold">{t.pain.solutionTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{t.pain.solutionDesc}</p>
            <ul className="mt-4 space-y-2">
              {(t.pain.solutionPoints as string[]).map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-slate-200">
                  <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-blue-50"
            >
              {t.common.learnMore}
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
