import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { staticProducts } from '@/lib/catalog';

// Every page is slash-terminated (next.config.js `trailingSlash: true`), so the
// sitemap URLs carry the trailing slash too and match the canonical tags.
const withSlash = (path: string) => `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: withSlash('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: withSlash('/products'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: withSlash('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: withSlash('/certifications'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: withSlash('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const products: MetadataRoute.Sitemap = staticProducts().map((product) => ({
    url: withSlash(`/products/${product.slug}`),
    lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...pages, ...products];
}
