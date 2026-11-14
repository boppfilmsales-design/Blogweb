import React from 'react';
import type { Metadata } from 'next';
import CertificationsContent from './CertificationsContent';
import { SITE_URL } from '@/lib/site';
import en from '@/locales/en.json';

export const metadata: Metadata = {
  title: { absolute: en.seo.certTitle },
  description: en.seo.certDesc,
  alternates: { canonical: `${SITE_URL}/certifications/` },
  openGraph: {
    url: `${SITE_URL}/certifications/`,
    title: en.seo.certTitle,
    description: en.seo.certDesc,
    type: 'website',
  },
};

export default function CertificationsPage() {
  return <CertificationsContent />;
}
