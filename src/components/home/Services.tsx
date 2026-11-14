'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { PROOF } from '@/lib/site';

const Services = () => {
  const { t } = useLanguage();
  const services: Array<{ title: string; desc: string }> = t.services.items;
  const specs: Array<{ label: string; value: string }> = t.services.specs;
  const process: Array<{ title: string; desc: string }> = t.services.process;

  return (
    <section className="bg-white py-16 sm:py-20" id="custom">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{t.services.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {t.services.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{t.services.subtitle}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.title} className="rounded-xl border border-slate-200 p-4">
                  <h3 className="flex items-start gap-2 text-sm font-semibold text-slate-900">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                    {service.title}
                  </h3>
                  <p className="mt-1.5 ps-6 text-sm leading-relaxed text-slate-600">{service.desc}</p>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {t.services.cta}
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="space-y-6">
            {/* Capability table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <h3 className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900">
                {t.services.specsTitle}
              </h3>
              <dl className="divide-y divide-slate-100">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4 px-5 py-3">
                    <dt className="text-sm text-slate-600">{spec.label}</dt>
                    <dd className="text-sm font-semibold text-slate-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Process */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200">
                {t.services.processTitle}
              </h3>
              <ol className="mt-4 space-y-4">
                {process.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{step.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-slate-300">{step.desc}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">
                {PROOF.thickness} · {PROOF.width} · {PROOF.capacityTonnes.toLocaleString('en-US')}+ t / year
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
