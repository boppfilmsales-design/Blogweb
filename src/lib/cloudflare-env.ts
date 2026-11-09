// Access to the Cloudflare bindings (D1 + R2) on Cloudflare Pages.
// Uses @cloudflare/next-on-pages `getRequestContext()` — the Pages way to
// reach the bindings configured on the Pages project (DB, IMAGES).
// (Previously this used @opennextjs/cloudflare's getCloudflareContext,
// which only works on Workers/OpenNext, not on Pages.)
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

export async function getEnv(): Promise<CloudflareEnv> {
  return getRequestContext().env;
}

export async function getDB(): Promise<D1Database> {
  const env = await getEnv();
  if (!env.DB) {
    throw new Error('D1 binding "DB" is not configured (see the Pages project bindings)');
  }
  return env.DB;
}

export async function getR2(): Promise<R2Bucket> {
  const env = await getEnv();
  if (!env.IMAGES) {
    throw new Error('R2 binding "IMAGES" is not configured (see the Pages project bindings)');
  }
  return env.IMAGES;
}
