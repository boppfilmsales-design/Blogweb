// Type declaration for the Cloudflare bindings used by this app on Pages.
// Declares the global `CloudflareEnv` interface that
// @cloudflare/next-on-pages `getRequestContext()` returns as `env`.
// (Previously this merged with @opennextjs/cloudflare's declaration;
// that package is no longer used — see src/lib/cloudflare-env.ts.)
// Regenerate from wrangler.toml with: npm run cf-typegen
// (that command rewrites this file; keep the hand-added lines below if you re-run it)
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

/** Service binding to a Worker: `env.BINDING.fetch(request)` runs the request
 *  in that Worker. Declared locally so this file does not depend on a
 *  particular @cloudflare/workers-types export shape. */
export interface ServiceBindingFetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

declare global {
  interface CloudflareEnv {
    /** D1 database (blogweb-db) — products + visitors + inquiries. */
    DB: D1Database;
    /** R2 bucket (blogweb-images) — uploaded product images. */
    IMAGES: R2Bucket;
    /** Optional public base URL of the R2 bucket (r2.dev domain or custom domain). */
    R2_PUBLIC_URL?: string;

    /** Admin area password. Required: without it every admin route fails closed. */
    ADMIN_PASSWORD?: string;
    /** Optional separate signing key for the admin session cookie.
     *  Defaults to ADMIN_PASSWORD (rotating the password ends all sessions). */
    ADMIN_SESSION_SECRET?: string;

    /** Optional Resend API key (https://resend.com) — second delivery channel
     *  for inquiry notifications when the email Worker is unavailable. */
    RESEND_API_KEY?: string;
    /** Optional overrides for the inquiry notification addresses.
     *  Defaults: from "AEC Group Inquiry <sale@apigcl.com>" to
     *  "message@boppfilmsale.com". */
    INQUIRY_FROM?: string;
    INQUIRY_TO?: string;
    /** Service binding to the `blogweb-email-sender` Worker, which holds the
     *  `send_email` binding (Pages Functions cannot bind `send_email` directly). */
    EMAIL_SENDER?: ServiceBindingFetcher;
  }
}

export {};
