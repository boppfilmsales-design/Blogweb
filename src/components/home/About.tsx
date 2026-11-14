'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { PROOF } from '@/lib/site';

const FACTORY_IMAGE = 'https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev/hero/jumboroll-factory.jpg';

const About = () => {
  const { t } = useLanguage();
  const story: string[] = t.about.story;
  const facts: Array<{ label: string; value: string }> = t.about.facts;

  return (
    <section className="bg-white py-16 sm:py-20" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={FACTORY_IMAGE}
                alt="Jumbo BOPP film rolls on the production line at the AEC Group plant in Hefei"
                width={960}
                height={640}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 end-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {t.about.facts[1].label}
              </p>
              <p className="text-lg font-bold text-slate-900">{t.about.facts[1].value}</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{t.about.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {t.about.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{t.about.subtitle}</p>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {story.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">{fact.label}</dt>
                  <dd className="mt-1 text-xl font-bold text-slate-900">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/about"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
            >
              {t.common.readMore}
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <span className="sr-only">
              {PROOF.founded} · {PROOF.capacityTonnes} t · {PROOF.countries} countries
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
