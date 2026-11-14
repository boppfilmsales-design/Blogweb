import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          That page is not on this site
        </h1>
        <p className="mt-4 text-base text-slate-600">
          The product may have been renamed, or the link is out of date. Everything we make is listed in the
          product catalogue, and our team answers specification questions within one working day.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-blue-700 px-6 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Browse products
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 px-6 text-sm font-semibold text-slate-800 hover:border-blue-600 hover:text-blue-700"
          >
            Contact the plant
          </Link>
        </div>
      </div>
    </div>
  );
}
