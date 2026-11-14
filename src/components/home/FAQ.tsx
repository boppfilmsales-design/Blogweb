'use client';

import React from 'react';
import Link from 'next/link';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

const FAQ = () => {
  const { t, locale } = useLanguage();
  const items: Array<{ q: string; a: string }> = t.faq.items;

  // FAQPage structured data, built from the same copy the page shows.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-20" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{t.faq.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{t.faq.subtitle}</p>
        </div>

        <div className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-start text-[15px] font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:bg-blue-50">
                {item.q}
                <FiChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</div>
            </details>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 sm:flex-row">
          <p>{t.faq.note}</p>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg bg-blue-700 px-4 font-semibold text-white hover:bg-blue-800"
          >
            {t.faq.cta}
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
