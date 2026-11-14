// Admin authentication for the Pages deployment.
//
// Edge-compatible on purpose: only Web Crypto (`crypto.subtle`) and the Next
// request/response objects are used, no Node APIs. The admin area is protected
// by an HMAC-signed, HttpOnly session cookie; nothing is trusted from the
// client beyond that signature.
//
//   aec_admin_session = <exp unix seconds>.<base64url HMAC-SHA256>
//
// The signing key is ADMIN_SESSION_SECRET when configured, otherwise
// ADMIN_PASSWORD itself — so rotating the password logs every session out.
// When neither is configured every check fails closed (401 / 503).
import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from './cloudflare-env';

export const ADMIN_SESSION_COOKIE = 'aec_admin_session';
/** 7 days, in seconds. */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();

function readBinding(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/** ADMIN_PASSWORD from the Pages bindings, falling back to process.env.
 *  Returns an empty string when it is not configured (callers must fail closed). */
export async function getAdminPassword(): Promise<string> {
  let fromBindings = '';
  try {
    const env = await getEnv();
    fromBindings = readBinding((env as unknown as Record<string, unknown>)?.ADMIN_PASSWORD);
  } catch {
    // getRequestContext() throws outside a request scope (e.g. during build).
  }
  return fromBindings || readBinding(process.env.ADMIN_PASSWORD);
}

/** Key used to sign session cookies: an explicit ADMIN_SESSION_SECRET when
 *  set, otherwise ADMIN_PASSWORD. Empty string means "unconfigured". */
export async function getSessionSecret(): Promise<string> {
  let fromBindings = '';
  try {
    const env = await getEnv();
    fromBindings = readBinding((env as unknown as Record<string, unknown>)?.ADMIN_SESSION_SECRET);
  } catch {
    // see getAdminPassword()
  }
  return (
    fromBindings ||
    readBinding(process.env.ADMIN_SESSION_SECRET) ||
    (await getAdminPassword())
  );
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signExpiry(exp: string, secret: string): Promise<string> {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${ADMIN_SESSION_COOKIE}:${exp}`),
  );
  return toBase64Url(signature);
}

/** Length-independent comparison so password/signature checks do not leak
 *  their timing. */
function timingSafeEqual(a: string, b: string): boolean {
  const max = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < max; i += 1) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/** True when the supplied password matches ADMIN_PASSWORD (constant time).
 *  False when ADMIN_PASSWORD is not configured. */
export async function verifyAdminPassword(candidate: string): Promise<boolean> {
  const expected = await getAdminPassword();
  if (!expected) return false;
  return timingSafeEqual(candidate, expected);
}

/** Build a fresh session cookie value. Null when no secret is configured. */
export async function createSessionValue(): Promise<{ value: string; maxAge: number } | null> {
  const secret = await getSessionSecret();
  if (!secret) return null;
  const maxAge = ADMIN_SESSION_MAX_AGE;
  const exp = String(Math.floor(Date.now() / 1000) + maxAge);
  const signature = await signExpiry(exp, secret);
  return { value: `${exp}.${signature}`, maxAge };
}

/** Verify signature and expiry of a session cookie value. */
export async function verifySessionValue(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const secret = await getSessionSecret();
  if (!secret) return false;

  const dot = value.indexOf('.');
  if (dot <= 0) return false;
  const exp = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  if (!/^\d{1,15}$/.test(exp) || !signature) return false;

  const expiresAt = Number(exp);
  if (!Number.isFinite(expiresAt) || expiresAt * 1000 <= Date.now()) return false;

  const expected = await signExpiry(exp, secret);
  return timingSafeEqual(signature, expected);
}

/** The request arrived over HTTPS (Cloudflare terminates TLS and sets
 *  x-forwarded-proto). */
export function isSecureRequest(request: NextRequest): boolean {
  const forwarded = request.headers.get('x-forwarded-proto') || '';
  const first = forwarded.split(',')[0].trim().toLowerCase();
  if (first) return first === 'https';
  try {
    return new URL(request.url).protocol === 'https:';
  } catch {
    return false;
  }
}

export function attachSessionCookie(
  response: NextResponse,
  value: string,
  maxAge: number,
  secure: boolean,
): NextResponse {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure,
    maxAge,
  });
  return response;
}

export function clearSessionCookie(response: NextResponse, secure: boolean): NextResponse {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure,
    maxAge: 0,
  });
  return response;
}

/**
 * Guard for admin-only API routes.
 *
 * Returns `null` when the caller may proceed (valid session cookie, or an
 * `Authorization: Bearer <ADMIN_PASSWORD>` header), otherwise the 401 response
 * the route should return as-is.
 */
export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  const password = await getAdminPassword();
  if (!password) {
    // Fail closed: no password configured means nobody is an admin.
    return NextResponse.json(
      { error: 'Unauthorized', reason: 'ADMIN_PASSWORD is not configured' },
      { status: 401 },
    );
  }

  const authorization = request.headers.get('authorization') || '';
  const bearer = /^Bearer\s+(.+)$/i.exec(authorization.trim());
  if (bearer && timingSafeEqual(bearer[1].trim(), password)) {
    return null;
  }

  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (await verifySessionValue(cookie)) {
    return null;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

/** Convenience wrapper: run `handler` only when the caller is authorized. */
export async function withAdmin(
  request: NextRequest,
  handler: () => Promise<NextResponse> | NextResponse,
): Promise<NextResponse> {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  return handler();
}
