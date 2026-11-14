'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCheck, FiMapPin, FiAward, FiGlobe, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { CERTIFICATIONS, PROOF, SITE } from '@/lib/site';

const FACTORY_IMAGE = 'https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev/hero/jumboroll-factory.jpg';
const ROLLS_IMAGE = 'https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev/hero/mg-4053.jpg';

const FACTS = [
  { icon: FiAward, key: 0 },
  { icon: FiTrendingUp, key: 1 },
  { icon: FiCheck, key: 2 },
  { icon: FiGlobe, key: 3 },
];

export default function AboutContent() {
  const { t, locale } = useLanguage();
  const story: string[] = t.about.story;
  const facts: Array<{ label: string; value: string }> = t.about.facts;
  const values: Array<{ title: string; desc: string }> = t.about.values;

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-600 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">{t.about.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {t.about.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">{t.about.subtitle}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-blue-200">
            <FiMapPin className="h-4 w-4" aria-hidden />
            {SITE.address.full}
          </p>
        </div>
      </div>

      {/* Story + image */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{t.about.storyTitle}</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              {story.map((paragraph) => (
                <p key={paragraph.slice(0, 30)}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
              {facts.map((fact, index) => {
                const Icon = FACTS[index % FACTS.length].icon;
                return (
                  <div key={fact.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">{fact.label}</dt>
                      <dd className="text-lg font-bold text-slate-900">{fact.value}</dd>
                    </span>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={FACTORY_IMAGE}
                alt="Jumbo film rolls on the production line at AEC Group, Hefei"
                width={960}
                height={720}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={ROLLS_IMAGE}
                  alt="Coloured and pearl BOPP film rolls"
                  width={480}
                  height={360}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="rounded-xl bg-slate-900 p-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                  {t.footer.specTitle}
                </p>
                <p className="mt-1 text-lg font-bold">{t.footer.specValue}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">{t.about.facilityDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{t.about.valuesTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <FiCheck className="h-5 w-5 text-emerald-600" aria-hidden />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facility */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{t.about.facilityTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{t.about.facilityDesc}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {[
                locale === 'zh'
                  ? 'BOPP、BOPET、BOPS、CPP 与 POF 薄膜生产线'
                  : 'BOPP, BOPET, BOPS, CPP and POF film lines',
                locale === 'zh'
                  ? '厂内分切能力 200–1600 mm，纸芯 3 英寸与 6 英寸'
                  : 'In-house slitting from 200 to 1600 mm, 3" and 6" cores',
                locale === 'zh'
                  ? '镀铝、涂布与凹版印刷一体完成'
                  : 'Metallizing, coating and rotogravure printing under one roof',
                locale === 'zh'
                  ? '在线测厚与逐卷检验，出货前复核'
                  : 'In-line gauging with roll-by-roll inspection before dispatch',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {CERTIFICATIONS.map((cert) => (
                <span key={cert.name} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  {cert.name}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
              <FiUsers className="h-5 w-5 text-blue-700" aria-hidden />
              {locale === 'zh' ? '与我们合作的样子' : 'What working with us looks like'}
            </h3>
            <ol className="mt-4 space-y-4 text-sm text-slate-600">
              {(t.services.process as Array<{ title: string; desc: string }>).map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">{step.title}</span>
                    <span className="mt-0.5 block leading-relaxed">{step.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-lg bg-white px-3 py-2 text-xs text-slate-500">
              {PROOF.founded} · {PROOF.capacityTonnes.toLocaleString('en-US')} t/year · {PROOF.clients}+ buyers ·{' '}
              {PROOF.countries}+ countries
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.about.ctaTitle}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">{t.about.ctaDesc}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] shrink-0 items-center gap-2 rounded-xl bg-white px-6 text-base font-semibold text-slate-900 hover:bg-blue-50"
          >
            {t.about.ctaButton}
            <FiArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
