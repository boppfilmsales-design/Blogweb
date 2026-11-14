'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

const Cases = () => {
  const { t } = useLanguage();
  const items: Array<{ sector: string; challenge: string; solution: string; spec: string }> = t.cases.items;

  return (
    <section className="bg-slate-900 py-16 text-white sm:py-20" id="cases">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">{t.cases.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{t.cases.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">{t.cases.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.sector} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-base font-semibold text-white">{item.sector}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.challenge}</p>
              <p className="mt-3 border-s-2 border-blue-500 ps-3 text-sm leading-relaxed text-slate-200">
                {item.solution}
              </p>
              <p className="mt-4 rounded-lg bg-slate-950/60 px-3 py-2 text-xs font-medium text-blue-200">
                {item.spec}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/contact"
          className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-blue-50"
        >
          {t.cta.primary}
          <FiArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
};

export default Cases;
