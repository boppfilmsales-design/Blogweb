import React from 'react';
import type { Metadata } from 'next';
import AboutContent from './AboutContent';
import { SITE_URL, SITE } from '@/lib/site';
import en from '@/locales/en.json';

export const metadata: Metadata = {
  title: { absolute: en.seo.aboutTitle },
  description: en.seo.aboutDesc,
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    url: `${SITE_URL}/about/`,
    title: en.seo.aboutTitle,
    description: en.seo.aboutDesc,
    type: 'website',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: en.seo.aboutTitle,
  description: en.seo.aboutDesc,
  url: `${SITE_URL}/about/`,
  about: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    foundingDate: String(SITE.founded),
    numberOfEmployees: undefined,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutContent />
    </>
  );
}
