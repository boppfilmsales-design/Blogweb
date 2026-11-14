'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiMail, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { SITE, WHATSAPP_URL } from '@/lib/site';

const CTASection = () => {
  const { t, locale } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-blue-800 via-blue-900 to-slate-950 py-16 text-white sm:py-20" id="quote">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{t.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-blue-100">{t.cta.subtitle}</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-base font-semibold text-slate-900 hover:bg-blue-50 sm:w-auto"
          >
            {t.cta.primary}
            <FiArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 text-base font-semibold text-white hover:bg-green-700 sm:w-auto"
          >
            <FiMessageCircle className="h-5 w-5" aria-hidden />
            {t.cta.secondary}
          </a>
        </div>

        <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
          <a
            href={`mailto:${SITE.email}`}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20"
          >
            <FiMail className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{SITE.email}</span>
          </a>
          <a
            href={`tel:${SITE.mobile}`}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20"
          >
            <FiPhone className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{SITE.mobileDisplay}</span>
          </a>
          <p className="flex min-h-[44px] items-center justify-center rounded-lg bg-white/10 px-3 py-2 text-center text-blue-100">
            {locale === 'zh' ? '周一至周六 09:00–18:00（GMT+8）' : t.cta.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
