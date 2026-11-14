import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Served at /robots.txt. Note: if the Cloudflare zone has "Managed robots.txt"
// enabled (Bots → AI Crawl Control), Cloudflare writes its own file at the edge
// and this one is not reached — see the deployment notes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
