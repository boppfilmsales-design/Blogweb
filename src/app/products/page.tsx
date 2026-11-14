import React from 'react';
import type { Metadata } from 'next';
import ProductsBrowser from './ProductsBrowser';
import { staticProducts } from '@/lib/catalog';
import { SITE_URL } from '@/lib/site';
import en from '@/locales/en.json';

// Statically rendered from the bundled catalogue, so the product grid is in the
// HTML for crawlers. The browser then refreshes from the live API.
export const metadata: Metadata = {
  title: { absolute: en.seo.productsTitle },
  description: en.seo.productsDesc,
  alternates: { canonical: `${SITE_URL}/products/` },
  openGraph: {
    url: `${SITE_URL}/products/`,
    title: en.seo.productsTitle,
    description: en.seo.productsDesc,
    type: 'website',
  },
};

export default function ProductsPage() {
  const products = staticProducts();

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Packaging film products',
    numberOfItems: products.length,
    itemListElement: products.slice(0, 30).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/products/${product.slug}/`,
      name: product.nameEn,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProductsBrowser initialProducts={products} />
    </>
  );
}
