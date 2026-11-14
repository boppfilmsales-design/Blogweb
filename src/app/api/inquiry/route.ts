// Inquiry notification endpoint.
//
// The public contact form POSTs here; the server sends the notification email
// (so the visitor never needs a mail client) and keeps a copy in D1 so no lead
// is lost when both email channels are down.
//
//   visitor → POST /api/inquiry
//     channel 1: Service binding EMAIL_SENDER → blogweb-email-sender Worker
//                (`send_email` binding, Cloudflare Email Service)
//     channel 2: Resend REST API (only when RESEND_API_KEY is configured)
//     storage  : D1 `inquiries` table (best effort, always attempted)
//
// The recipient and sender are fixed here — this endpoint is not an open relay.
import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cloudflare-env';
import {
  INQUIRY_LIMITS as LIMITS,
  buildInquiryEmail,
  cleanField,
  validateInquiry,
  type InquiryPayload,
} from '@/lib/inquiry-email';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const DEFAULT_FROM = 'AEC Group Inquiry <sale@apigcl.com>';
const DEFAULT_TO = 'message@boppfilmsale.com';
type Channel = 'cloudflare-email' | 'resend';

async function sendViaWorker(
  sender: NonNullable<CloudflareEnv['EMAIL_SENDER']>,
  message: { to: string; from: string; replyTo: string; subject: string; html: string; text: string },
): Promise<{ ok: boolean; detail?: string }> {
  try {
    const response = await sender.fetch('https://email-sender/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (response.ok) return { ok: true };
    const body = await response.text().catch(() => '');
    return { ok: false, detail: `worker ${response.status}: ${body.slice(0, 300)}` };
  } catch (error: any) {
    return { ok: false, detail: `worker threw: ${error?.message || error}` };
  }
}

async function sendViaResend(
  apiKey: string,
  message: { to: string; from: string; replyTo: string; subject: string; html: string; text: string },
): Promise<{ ok: boolean; detail?: string }> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: message.from,
        to: [message.to],
        subject: message.subject,
        html: message.html,
        text: message.text,
        reply_to: message.replyTo,
      }),
    });
    if (response.ok) return { ok: true };
    const body = await response.text().catch(() => '');
    return { ok: false, detail: `resend ${response.status}: ${body.slice(0, 300)}` };
  } catch (error: any) {
    return { ok: false, detail: `resend threw: ${error?.message || error}` };
  }
}

/** Best-effort copy in D1. Never throws. */
async function saveToDatabase(inquiry: InquiryPayload, channels: string[], receivedAt: string): Promise<boolean> {
  try {
    const env = await getEnv();
    if (!env.DB) return false;
    const db = env.DB;
    await db
      .prepare(
        `CREATE TABLE IF NOT EXISTS inquiries (
           id TEXT PRIMARY KEY,
           name TEXT NOT NULL,
           email TEXT NOT NULL,
           phone TEXT,
           company TEXT,
           country TEXT,
           product TEXT,
           message TEXT,
           page TEXT,
           channels TEXT,
           createdAt TEXT
         )`,
      )
      .run();
    await db
      .prepare(
        `INSERT INTO inquiries (id, name, email, phone, company, country, product, message, page, channels, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        crypto.randomUUID(),
        inquiry.name,
        inquiry.email,
        inquiry.phone || null,
        inquiry.company || null,
        inquiry.country || null,
        inquiry.product || null,
        inquiry.message,
        inquiry.page || null,
        channels.join(',') || null,
        receivedAt,
      )
      .run();
    return true;
  } catch (error: any) {
    console.error('inquiry: D1 save failed', error?.message || error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const inquiry: InquiryPayload = {
    name: cleanField(body?.name, LIMITS.name),
    email: cleanField(body?.email, LIMITS.email),
    phone: cleanField(body?.phone, LIMITS.phone),
    company: cleanField(body?.company, LIMITS.company),
    country: cleanField(body?.country, LIMITS.country),
    product: cleanField(body?.product, LIMITS.product),
    message: cleanField(body?.message, LIMITS.message),
    page: cleanField(body?.page, 300),
  };

  const problems = validateInquiry(inquiry);
  if (problems.length > 0) {
    return NextResponse.json(
      { success: false, error: problems.join('; ') },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const receivedAt = new Date().toISOString();
  const env = await getEnv();
  const from = (typeof env.INQUIRY_FROM === 'string' && env.INQUIRY_FROM) || DEFAULT_FROM;
  const to = (typeof env.INQUIRY_TO === 'string' && env.INQUIRY_TO) || DEFAULT_TO;
  const { subject, html, text } = buildInquiryEmail(inquiry, receivedAt);

  const message = { to, from, replyTo: inquiry.email, subject, html, text };
  const channels: Channel[] = [];
  const failures: string[] = [];

  if (env.EMAIL_SENDER) {
    const result = await sendViaWorker(env.EMAIL_SENDER, message);
    if (result.ok) channels.push('cloudflare-email');
    else {
      failures.push(result.detail || 'cloudflare-email failed');
      console.error('inquiry: EMAIL_SENDER failed', result.detail);
    }
  } else {
    failures.push('EMAIL_SENDER binding is not configured');
  }

  // Resend is the fallback channel: used when the Worker is missing or failed.
  if (channels.length === 0 && env.RESEND_API_KEY) {
    const result = await sendViaResend(env.RESEND_API_KEY, message);
    if (result.ok) channels.push('resend');
    else {
      failures.push(result.detail || 'resend failed');
      console.error('inquiry: Resend failed', result.detail);
    }
  }

  const savedToDb = await saveToDatabase(inquiry, channels, receivedAt);

  if (channels.length > 0) {
    console.log(`inquiry: delivered via ${channels.join(', ')} (db=${savedToDb})`);
    return NextResponse.json(
      { success: true, channels, savedToDb },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }

  // No email channel worked: 502 so the form shows the mailto fallback. The lead
  // is still stored (savedToDb) when D1 is available.
  console.error('inquiry: no email channel delivered', failures.join(' | '));
  return NextResponse.json(
    {
      success: false,
      error: 'Inquiry could not be delivered by email',
      channels,
      savedToDb,
    },
    { status: 502, headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function GET() {
  // The endpoint only accepts inquiries; there is nothing public to read here.
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } },
  );
}
