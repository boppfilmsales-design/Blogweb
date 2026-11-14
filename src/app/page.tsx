import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import PainPoints from '@/components/home/PainPoints';
import Features from '@/components/home/Features';
import Services from '@/components/home/Services';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Certifications from '@/components/home/Certifications';
import Cases from '@/components/home/Cases';
import About from '@/components/home/About';
import FAQ from '@/components/home/FAQ';
import CTASection from '@/components/home/CTASection';
import { highlightedProducts } from '@/lib/catalog';
import { SITE_URL } from '@/lib/site';
import en from '@/locales/en.json';

// The homepage is statically rendered: the product selection comes from the
// bundled catalogue snapshot, so the full HTML is in the response for every
// crawler and the page needs no database round-trip to paint.
export const metadata: Metadata = {
  title: {
    absolute: en.seo.homeTitle,
  },
  description: en.seo.homeDesc,
  alternates: { canonical: '/' },
  openGraph: {
    url: SITE_URL,
    title: en.seo.homeTitle,
    description: en.seo.homeDesc,
  },
};

export default function Home() {
  const products = highlightedProducts(6);

  return (
    <>
      <Hero />
      <PainPoints />
      <Features />
      <Services />
      <FeaturedProducts products={products} />
      <Certifications />
      <Cases />
      <About />
      <FAQ />
      <CTASection />
    </>
  );
}
