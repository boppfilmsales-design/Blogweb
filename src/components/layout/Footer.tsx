'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { CERTIFICATIONS, FAMILIES, SITE, WHATSAPP_URL } from '@/lib/site';

const FooterSection = () => {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/favicon.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-cover" />
              <span className="text-lg font-bold text-white">{SITE.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{t.footer.tagline}</p>
            <dl className="mt-5 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {t.footer.specTitle}
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-200">{t.footer.specValue}</dd>
            </dl>
          </div>

          {/* Company */}
          <nav aria-label={t.footer.quickLinks}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{t.footer.quickLinks}</h2>
            <ul className="mt-4 space-y-1">
              {[
                { href: '/', label: t.nav.home },
                { href: '/about', label: t.nav.about },
                { href: '/certifications', label: t.nav.certifications },
                { href: '/contact', label: t.nav.contact },
                { href: '/products', label: t.nav.products },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-slate-400 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label={t.footer.productsTitle}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{t.footer.productsTitle}</h2>
            <ul className="mt-4 space-y-1">
              {FAMILIES.map((family) => (
                <li key={family.name}>
                  <Link
                    href={`/products?group=${encodeURIComponent(family.name)}`}
                    className="inline-flex min-h-[44px] items-center text-sm text-slate-400 hover:text-white"
                  >
                    {locale === 'zh' ? family.zh : family.en}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{t.footer.contactTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                <span className="text-slate-400">{SITE.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                <a href={`tel:${SITE.phone}`} className="text-slate-400 hover:text-white">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="text-slate-400 hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiClock className="h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                <span className="text-slate-400">{SITE.hoursDisplay}</span>
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-green-600 px-4 text-sm font-semibold text-white hover:bg-green-700"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Certifications strip */}
        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {t.footer.certificationsTitle}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.name}>{cert.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {SITE.legalName}. {t.footer.rights}
          </p>
          <p>{locale === 'zh' ? SITE.legalNameZh : SITE.legalName}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
