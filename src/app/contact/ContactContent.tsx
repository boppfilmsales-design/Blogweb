'use client';

import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import InquiryForm from '@/components/contact/InquiryForm';
import { SITE, WHATSAPP_URL } from '@/lib/site';

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'No.1158 Huizhou Avenue, Baohe Industrial District, Hefei, Anhui, China',
)}`;

export default function ContactContent() {
  const { t, locale } = useLanguage();

  const info = [
    { icon: FiMapPin, label: t.contact.address, value: SITE.address.full, href: MAP_URL },
    { icon: FiPhone, label: t.contact.phoneLabel, value: SITE.phoneDisplay, href: `tel:${SITE.phone}` },
    { icon: FiMail, label: t.contact.emailLabel, value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: FiMessageCircle, label: t.contact.whatsappLabel, value: SITE.whatsappDisplay, href: WHATSAPP_URL },
    { icon: FiClock, label: t.contact.hoursLabel, value: SITE.hoursDisplay, href: null },
  ];

  return (
    <div className="bg-slate-50">
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.contact.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-blue-100">{t.contact.subtitle}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-100">
            <FiGlobe className="h-3.5 w-3.5" aria-hidden />
            {t.contact.responseNote}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Details */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">{t.contact.infoTitle}</h2>
              <dl className="mt-4 space-y-4">
                {info.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <item.icon className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">{item.label}</dt>
                      <dd className="mt-0.5 text-sm text-slate-800">
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="hover:text-blue-700 hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">
                {locale === 'zh' ? '下单前需要准备什么' : 'What to send with your inquiry'}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {[
                  locale === 'zh' ? '膜种（BOPP 光膜 / 镀铝 / 烟膜 / 胶带膜…）' : 'Film type (BOPP clear, metallized, cigarette, tape…)',
                  locale === 'zh' ? '厚度（µm）与宽度（mm）' : 'Thickness (µm) and width (mm)',
                  locale === 'zh' ? '处理方式、纸芯与卷绕方向' : 'Treatment, core size and winding direction',
                  locale === 'zh' ? '首单数量与目的港' : 'First-order quantity and destination port',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
              >
                <FiMapPin className="h-4 w-4" aria-hidden />
                {locale === 'zh' ? '在地图上查看合肥工厂' : 'Find the Hefei plant on the map'}
              </a>
            </div>
          </div>

          {/* Form */}
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
