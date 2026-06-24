'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <CTASection />
    </>
  );
}
