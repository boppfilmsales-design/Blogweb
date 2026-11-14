import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import FooterSection from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import UmamiScript from '@/components/analytics/UmamiScript';
import { SITE, SITE_URL } from '@/lib/site';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const OG_IMAGE = 'https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev/hero/mg-4031.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BOPP Film Manufacturer & Supplier | Factory-Direct Packaging Films | AEC Group',
    template: '%s | AEC Group',
  },
  description:
    'AEC Group manufactures BOPP, BOPET, BOPS, CPP and POF packaging films in Hefei, China: 15–50 µm, 200–1600 mm slitting, 10,000+ tonnes a year, ISO 9001, FDA, SGS, RoHS and REACH. Free samples and 24-hour quotations.',
  keywords: [
    'BOPP film manufacturer',
    'BOPP film supplier',
    'packaging film factory',
    'BOPET film',
    'metallized BOPP film',
    'BOPS film',
    'CPP film',
    'POF shrink film',
    'cigarette film',
    'packaging film China',
    'AEC Group',
    'boppfilmsale',
  ],
  authors: [{ name: SITE.legalName, url: SITE_URL }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: 'Packaging films',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE.name,
    title: 'BOPP Film Manufacturer & Supplier | Factory-Direct Packaging Films | AEC Group',
    description:
      'Factory-direct BOPP, BOPET, BOPS, CPP and POF packaging film from Hefei, China. 15–50 µm, 200–1600 mm slitting, 10,000+ t/year, ISO 9001, FDA, SGS, RoHS and REACH.',
    locale: 'en_US',
    alternateLocale: ['zh_CN', 'es_ES', 'pt_BR', 'ar_SA'],
    images: [
      {
        url: OG_IMAGE,
        alt: 'Metallized BOPP film rolls in gold, copper and silver — AEC Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BOPP Film Manufacturer & Supplier | AEC Group',
    description:
      'Factory-direct BOPP, BOPET, BOPS, CPP and POF packaging film. 15–50 µm, 200–1600 mm, 10,000+ t/year. Free samples, 24-hour quotations.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.jpg', type: 'image/jpeg' }],
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e40af',
  colorScheme: 'light',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: SITE.legalNameZh,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.jpg`,
  image: OG_IMAGE,
  foundingDate: String(SITE.founded),
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'sales',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Chinese', 'Spanish', 'Portuguese', 'Arabic'],
    },
  ],
  makesOffer: [
    'BOPP film',
    'BOPET film',
    'BOPA film',
    'BOPS film',
    'CPP film',
    'POF shrink film',
    'metallized film',
  ].map((name) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Product', name },
  })),
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE.name,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-blue-700 focus:shadow-lg"
          >
            Skip to content
          </a>
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main id="main" className="flex-grow">
              {children}
            </main>
            <FooterSection />
            <BackToTop />
          </div>
        </LanguageProvider>
        {umamiSrc && umamiWebsiteId && (
          <UmamiScript src={umamiSrc} websiteId={umamiWebsiteId} />
        )}
      </body>
    </html>
  );
}
