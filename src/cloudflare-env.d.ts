// Type declaration for the Cloudflare bindings used by this app on Pages.
// Declares the global `CloudflareEnv` interface that
// @cloudflare/next-on-pages `getRequestContext()` returns as `env`.
// (Previously this merged with @opennextjs/cloudflare's declaration;
// that package is no longer used — see src/lib/cloudflare-env.ts.)
// Regenerate from wrangler.toml with: npm run cf-typegen
// (that command rewrites this file; keep the R2_PUBLIC_URL line if you re-run it)
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

declare global {
  interface CloudflareEnv {
    /** D1 database (blogweb-db) — products + visitors. */
    DB: D1Database;
    /** R2 bucket (blogweb-images) — uploaded product images. */
    IMAGES: R2Bucket;
    /** Optional public base URL of the R2 bucket (r2.dev domain or custom domain). */
    R2_PUBLIC_URL?: string;
  }
}

export {};
