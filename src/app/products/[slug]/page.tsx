import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from './ProductDetail';
import { requestProductBySlug } from '@/lib/catalog';
import {
  formatSpecValue,
  getCategoryDisplayName,
  getProductDesc,
  prettifyProductName,
} from '@/components/products/productUtils';
import { parseProductImages } from '@/lib/images';
import { SITE_URL } from '@/lib/site';

// Rendered on Cloudflare's edge at request time. The data layer falls back to
// the bundled catalogue if D1 is unavailable, so a crawler always gets a full
// page instead of an error.
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

function clamp(text: string, max: number): string {
  const value = text.replace(/\s+/g, ' ').trim();
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await requestProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product not found',
      robots: { index: false, follow: false },
    };
  }

  const category = getCategoryDisplayName(product.category, 'en');
  const spec = [product.thickness, formatSpecValue(product.width)]
    .filter(Boolean)
    .join(' · ');
  const displayName = prettifyProductName(product.nameEn);
  // Keep the <title> short enough that Google shows it whole; the site name is
  // appended by the root template.
  const title = clamp(`${displayName}${spec ? ` — ${spec}` : ''}`, 58);
  const description = clamp(
    (getProductDesc(product, 'en') ||
      `${displayName} from AEC Group: factory-direct packaging film with free samples and 24-hour quotation.`) +
      (spec ? ` Specifications: ${spec}.` : ''),
    158,
  );
  const firstImage = parseProductImages(product.images)[0];
  const image = firstImage
    ? firstImage.startsWith('http')
      ? firstImage
      : `https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev/${firstImage.replace(/^\/+/, '')}`
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products/${product.slug}/` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/products/${product.slug}/`,
      title,
      description,
      images: image ? [{ url: image, alt: displayName }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await requestProductBySlug(params.slug);
  if (!product) notFound();

  const spec = [product.thickness, product.width].filter(Boolean).join(', ');
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: prettifyProductName(product.nameEn),
    alternateName: product.nameZh || undefined,
    description: clamp(getProductDesc(product, 'en') || product.nameEn, 320),
    sku: product.slug,
    category: getCategoryDisplayName(product.category, 'en') || undefined,
    brand: { '@type': 'Brand', name: 'AEC Group' },
    manufacturer: { '@id': `${SITE_URL}/#organization` },
    image: parseProductImages(product.images)
      .slice(0, 3)
      .map((image) =>
        image.startsWith('http')
          ? image
          : `https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev/${image.replace(/^\/+/, '')}`,
      ),
    additionalProperty: [
      product.thickness ? { '@type': 'PropertyValue', name: 'Thickness', value: product.thickness } : null,
      product.width ? { '@type': 'PropertyValue', name: 'Width', value: product.width } : null,
      product.material ? { '@type': 'PropertyValue', name: 'Material', value: product.material } : null,
    ].filter(Boolean),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        valueAddedTaxIncluded: false,
        description: `Quoted per order${spec ? ` for ${spec}` : ''}. Request a quotation for current pricing.`,
      },
      url: `${SITE_URL}/products/${product.slug}/`,
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products/` },
      {
        '@type': 'ListItem',
        position: 3,
        name: prettifyProductName(product.nameEn),
        item: `${SITE_URL}/products/${product.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
