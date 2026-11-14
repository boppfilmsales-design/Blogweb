'use client';

import React from 'react';
import Link from 'next/link';
import { FiAward, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { CERTIFICATIONS, PROOF } from '@/lib/site';

const Certifications = () => {
  const { t, locale } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-20" id="certifications">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              {locale === 'zh' ? '质量与合规' : 'Quality & compliance'}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {locale === 'zh' ? '认证不是墙上的证书' : 'Paperwork that arrives with the goods'}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {locale === 'zh'
                ? 'AEC Group 的薄膜按 ISO 9001 与 ISO 14001 体系生产，并按牌号提供 FDA、SGS、RoHS 与 REACH 文件。客户与报关需要的证书随货准备，不需要事后追单。'
                : 'AEC Group runs to ISO 9001 and ISO 14001, and supplies FDA, SGS, RoHS and REACH documentation with the grade. Certificates travel with the shipment, so your broker and your customer are never waiting.'}
            </p>

            <div className="mt-6 flex items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div>
                <p className="text-3xl font-bold text-slate-900">{PROOF.passRate}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                  {locale === 'zh' ? '质检合格率' : 'QC pass rate'}
                </p>
              </div>
              <div className="h-12 w-px bg-slate-200" aria-hidden />
              <div>
                <p className="text-3xl font-bold text-slate-900">{PROOF.clients}+</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                  {locale === 'zh' ? '全球客户' : 'Buyers worldwide'}
                </p>
              </div>
            </div>

            <Link
              href="/certifications"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
            >
              {t.nav.certifications}
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.name} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <FiAward className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm font-bold text-slate-900">{cert.name}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {locale === 'zh' ? cert.scopeZh : cert.scopeEn}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
