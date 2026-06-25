'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import About from '@/components/home/About';
import Certifications from '@/components/home/Certifications';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <About />
      <Certifications />
      <FeaturedProducts />
      <CTASection />
    </div>
  );
}
