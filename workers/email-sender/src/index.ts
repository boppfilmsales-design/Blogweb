// blogweb-email-sender
//
// Internal Cloudflare Worker that sends one transactional email per request via
// the Email Service `send_email` binding. It is called by the Pages project
// (`blogweb`) through a Service Binding named EMAIL_SENDER:
//
//   POST https://email-sender/send
//   { "to": "...", "from": "...", "replyTo": "...",
//     "subject": "...", "html": "...", "text": "..." }
//
// There is no public route: `workers_dev = false` and no zone route, so only a
// Worker/Pages that holds the binding can call it. The Worker also refuses any
// sender outside ALLOWED_FROM_DOMAINS so a compromised caller cannot send mail
// from unrelated addresses on the onboarded domain.

interface EmailAddress {
  email: string;
  name?: string;
}

interface EmailSendResult {
  messageId: string;
}

interface SendEmail {
  send(message: {
    to: string | EmailAddress | (string | EmailAddress)[];
    from: string | EmailAddress;
    subject: string;
    html?: string;
    text?: string;
    replyTo?: string | EmailAddress;
  }): Promise<EmailSendResult>;
}

interface Env {
  EMAIL: SendEmail;
}

/** Senders this Worker may use. Keep in step with the domain onboarded in
 *  Email Service and with ALLOWED_RECIPIENTS in the Pages inquiry route. */
const ALLOWED_FROM_DOMAINS = ['apigcl.com', 'boppfilmsale.com'];

const MAX_HTML = 200_000;
const MAX_TEXT = 100_000;
const EMAIL_RE = /^[^\s@<>]{1,64}@[A-Za-z0-9.-]{1,190}\.[A-Za-z]{2,24}$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/** Extracts `addr@domain` from `Name <addr@domain>` or `addr@domain`. */
function bareAddress(value: string): string {
  const match = /<([^<>]+)>\s*$/.exec(value) || /([^\s<>]+)\s*$/.exec(value);
  return (match ? match[1] : value).trim().toLowerCase();
}

function isAllowedSender(from: string): boolean {
  const address = bareAddress(from);
  if (!EMAIL_RE.test(address)) return false;
  const domain = address.split('@')[1] || '';
  return ALLOWED_FROM_DOMAINS.some((allowed) => domain === allowed || domain.endsWith(`.${allowed}`));
}

async function handleSend(request: Request, env: Env): Promise<Response> {
  if (!env.EMAIL || typeof env.EMAIL.send !== 'function') {
    return json({ success: false, error: 'EMAIL binding is not configured' }, 503);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Body must be JSON' }, 400);
  }

  const to = typeof body?.to === 'string' ? body.to.trim() : '';
  const from = typeof body?.from === 'string' ? body.from.trim() : '';
  const subject = typeof body?.subject === 'string' ? body.subject.trim() : '';
  const html = typeof body?.html === 'string' ? body.html : '';
  const text = typeof body?.text === 'string' ? body.text : '';
  const replyTo = typeof body?.replyTo === 'string' ? body.replyTo.trim() : '';

  if (!to || !EMAIL_RE.test(bareAddress(to))) {
    return json({ success: false, error: 'A valid `to` address is required' }, 400);
  }
  if (!from || !EMAIL_RE.test(bareAddress(from)) || !isAllowedSender(from)) {
    return json({ success: false, error: '`from` must be an allowed sender address' }, 400);
  }
  if (!subject) {
    return json({ success: false, error: '`subject` is required' }, 400);
  }
  if (!html && !text) {
    return json({ success: false, error: '`html` or `text` is required' }, 400);
  }
  if (html.length > MAX_HTML || text.length > MAX_TEXT) {
    return json({ success: false, error: 'Message body is too large' }, 413);
  }
  if (replyTo && !EMAIL_RE.test(bareAddress(replyTo))) {
    return json({ success: false, error: '`replyTo` is not a valid address' }, 400);
  }

  try {
    const result = await env.EMAIL.send({
      to,
      from,
      subject,
      html: html || undefined,
      text: text || undefined,
      replyTo: replyTo || undefined,
    });
    return json({ success: true, messageId: result?.messageId ?? null });
  } catch (error: any) {
    // Email Service errors carry a `code` (e.g. E_SENDER_NOT_VERIFIED).
    console.error('email send failed', error?.code, error?.message);
    return json(
      { success: false, error: error?.message || 'Email send failed', code: error?.code ?? null },
      502,
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname !== '/send' && pathname !== '/') {
      return json({ success: false, error: 'Not found' }, 404);
    }
    if (request.method !== 'POST') {
      return json({ success: false, error: 'Method not allowed' }, 405);
    }
    return handleSend(request, env);
  },
};
