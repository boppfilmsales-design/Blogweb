import React from 'react';
import type { Metadata } from 'next';
import ContactContent from './ContactContent';
import { SITE_URL, SITE } from '@/lib/site';
import en from '@/locales/en.json';

export const metadata: Metadata = {
  title: { absolute: en.seo.contactTitle },
  description: en.seo.contactDesc,
  alternates: { canonical: `${SITE_URL}/contact/` },
  openGraph: {
    url: `${SITE_URL}/contact/`,
    title: en.seo.contactTitle,
    description: en.seo.contactDesc,
    type: 'website',
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: en.seo.contactTitle,
  description: en.seo.contactDesc,
  url: `${SITE_URL}/contact/`,
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactContent />
    </>
  );
}
