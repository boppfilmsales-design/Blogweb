'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiPlayCircle } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { PROOF, SITE } from '@/lib/site';

const R2_PUBLIC = 'https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev';

interface HeroSlide {
  src: string;
  alt: string;
  captionEn: string;
  captionZh: string;
}

const slides: HeroSlide[] = [
  {
    src: `${R2_PUBLIC}/hero/mg-3943.jpg`,
    alt: 'Gold metallized BOPP film roll on a production pallet',
    captionEn: 'Gold metallized BOPP film',
    captionZh: '金色镀铝 BOPP 膜',
  },
  {
    src: `${R2_PUBLIC}/hero/mg-4031.jpg`,
    alt: 'Metallized BOPP film rolls in gold, copper and silver',
    captionEn: 'Metallized film, three finishes',
    captionZh: '三种色泽的镀铝膜',
  },
  {
    src: `${R2_PUBLIC}/hero/mg-4053.jpg`,
    alt: 'BOPP film rolls in assorted colours',
    captionEn: 'Coloured and pearl BOPP',
    captionZh: '彩色与珠光 BOPP',
  },
  {
    src: `${R2_PUBLIC}/hero/jumboroll-factory.jpg`,
    alt: 'Jumbo film rolls on the production line at the Hefei plant',
    captionEn: 'Jumbo rolls on our line',
    captionZh: '产线上的大卷膜',
  },
];

const Hero = () => {
  const { t, locale } = useLanguage();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setSlide((prev) => (prev + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const stats = [
    { value: t.hero.statSinceValue, label: t.hero.statSinceLabel },
    { value: t.hero.statCapacityValue, label: t.hero.statCapacityLabel },
    { value: t.hero.statPassValue, label: t.hero.statPassLabel },
    { value: t.hero.statCountriesValue, label: t.hero.statCountriesLabel },
  ];

  const badges = ['ISO 9001', 'FDA', 'SGS', 'REACH'];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background: soft light + engineering grid, no image so text always reads */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-600/25 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden>
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Copy */}
          <div className="text-center lg:text-start">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-100 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              {t.hero.badge}
            </p>

            <h1 className="mt-5 text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.25rem]">
              <span className="block text-white">{t.hero.titleLead}</span>
              <span className="mt-1 block bg-gradient-to-r from-blue-300 via-sky-200 to-white bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100/90 sm:text-lg lg:mx-0">
              {t.hero.subtitle}
            </p>
            <p className="mx-auto mt-3 hidden max-w-xl text-sm leading-relaxed text-slate-300 lg:mx-0 lg:block">
              {t.hero.description}
            </p>

            {/* Dual CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-6 text-base font-semibold text-slate-900 shadow-lg shadow-blue-950/40 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t.hero.ctaPrimary}
                <FiArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/products"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/30 px-6 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-blue-100/80 lg:justify-start">
              {badges.map((badge) => (
                <li key={badge} className="inline-flex items-center gap-1.5">
                  <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                  {badge}
                </li>
              ))}
              <li className="inline-flex items-center gap-1.5">
                <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                {t.common.freeSample}
              </li>
            </ul>
          </div>

          {/* Visual */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl shadow-blue-950/50"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                {slides.map((s, index) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    width={960}
                    height={600}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      index === slide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-4 pt-10">
                  <p className="text-sm font-medium text-white">
                    {locale === 'zh' ? slides[slide].captionZh : slides[slide].captionEn}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-blue-200/80">
                    {`${SITE.address.city}, ${locale === 'zh' ? '中国安徽' : 'Anhui, China'} · ${PROOF.thickness} · ${PROOF.width}`}
                  </p>
                </div>
                <div className="absolute right-3 top-3 flex gap-1.5">
                  {slides.map((s, index) => (
                    <button
                      key={s.src}
                      type="button"
                      aria-label={`${locale === 'zh' ? '第' : 'Slide'} ${index + 1}`}
                      aria-current={index === slide}
                      onClick={() => setSlide(index)}
                      className="h-8 w-8 rounded-full text-[0px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span
                        className={`mx-auto block h-2 rounded-full transition-all ${
                          index === slide ? 'w-6 bg-white' : 'w-2 bg-white/60'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating proof card */}
            <div className="absolute -bottom-5 end-4 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-xl sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {locale === 'zh' ? '年产能' : 'Annual capacity'}
              </p>
              <p className="text-xl font-bold leading-tight">
                {PROOF.capacityTonnes.toLocaleString('en-US')}+ t
              </p>
            </div>
          </div>
        </div>

        {/* Stats — in normal flow, never covered by the divider */}
        <dl className="mt-12 grid grid-cols-2 gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm sm:mt-14 sm:grid-cols-4 sm:gap-6 sm:p-6">
          {stats.map((stat) => (
            <div key={stat.label} className="px-1 text-center sm:px-2 sm:text-start">
              <dt className="order-2 mt-1 text-[11px] font-medium uppercase tracking-wider text-blue-200/80 sm:text-xs">
                {stat.label}
              </dt>
              <dd className="order-1 text-2xl font-bold leading-none text-white sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 text-center lg:text-start">
          <a
            href="#what-we-make"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-blue-200 hover:text-white"
          >
            <FiPlayCircle className="h-4 w-4" aria-hidden />
            {t.hero.scrollHint}
          </a>
        </div>
      </div>

      {/* Divider into the white section. A block-level element in flow, so it
          can never overlap the statistics the way the old absolute wave did. */}
      <svg
        className="block h-8 w-full text-white sm:h-12"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        <path
          d="M0 80V44c120 0 240-24 360-24s240 20 360 20 240-20 360-20 240 16 360 16v44H0Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
};

export default Hero;
