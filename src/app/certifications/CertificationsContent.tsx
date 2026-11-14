'use client';

import React from 'react';
import Link from 'next/link';
import { FiAward, FiCheck, FiArrowRight, FiFileText } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { CERTIFICATIONS, PROOF, SITE } from '@/lib/site';

export default function CertificationsContent() {
  const { t, locale } = useLanguage();

  const commitments = [
    {
      en: 'Strict quality control at every production stage',
      zh: '每个生产阶段严格的质量控制',
    },
    { en: 'In-line thickness gauging on every roll', zh: '每卷在线测厚' },
    { en: 'Documentation prepared with the shipment', zh: '证书随货准备' },
    { en: 'Batch traceability from resin to pallet', zh: '从原料到托盘的批次追溯' },
    { en: 'Customer satisfaction guaranteed by rework or credit', zh: '质量问题返工或折让' },
    { en: 'Technical support from film engineers', zh: '薄膜工程师技术支持' },
  ];

  return (
    <div className="bg-slate-50">
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
            {locale === 'zh' ? '质量与合规' : 'Quality & compliance'}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t.nav.certifications}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-blue-100">
            {locale === 'zh'
              ? '我们的产品符合国际标准和认证要求，相关证书与检测报告可按牌号提供。'
              : 'Our films are produced under certified quality and environmental systems, with grade-specific documents available for your QA and customs.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <FiAward className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="text-base font-bold text-slate-900">{cert.name}</h2>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-800">{cert.full}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {locale === 'zh' ? cert.scopeZh : cert.scopeEn}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {locale === 'zh' ? '质量承诺' : 'Quality commitment'}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {commitments.map((item) => (
                <li key={item.en} className="flex items-start gap-2 text-sm text-slate-700">
                  <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  {locale === 'zh' ? item.zh : item.en}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
              <FiFileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden />
              {locale === 'zh'
                ? '需要某牌号的证书或检测报告？发邮件到 ' + SITE.email + '，注明牌号与用途，我们会附上现有文件。'
                : `Need a certificate for a specific grade? Email ${SITE.email} with the grade and application and we will send what we hold.`}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white">
            <p className="text-5xl font-bold">{PROOF.passRate}</p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-blue-200">
              {locale === 'zh' ? '产品合格率' : 'Product pass rate'}
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-t border-white/10 pt-3">
                <dt className="text-slate-300">{locale === 'zh' ? '年产能' : 'Annual capacity'}</dt>
                <dd className="font-semibold">{PROOF.capacityTonnes.toLocaleString('en-US')}+ t</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <dt className="text-slate-300">{locale === 'zh' ? '厚度范围' : 'Thickness range'}</dt>
                <dd className="font-semibold">{PROOF.thickness}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <dt className="text-slate-300">{locale === 'zh' ? '分切宽度' : 'Slitting width'}</dt>
                <dd className="font-semibold">{PROOF.width}</dd>
              </div>
            </dl>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-blue-50"
            >
              {t.common.contactUs}
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
