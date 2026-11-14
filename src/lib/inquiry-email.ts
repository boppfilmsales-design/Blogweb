// Pure helpers for the inquiry notification email: input cleaning, validation
// constants and the HTML/text templates. Kept separate from the route so the
// email content can be rendered and reviewed without a Cloudflare context.

export const INQUIRY_EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const INQUIRY_LIMITS = {
  name: 200,
  email: 320,
  phone: 60,
  company: 200,
  country: 100,
  product: 200,
  message: 5000,
} as const;

export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  product: string;
  message: string;
  page: string;
}

export interface RenderedInquiryEmail {
  subject: string;
  html: string;
  text: string;
}

/** Trim, drop control characters, normalise line endings and cap the length. */
export function cleanField(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  const text = value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return text.trim().slice(0, max);
}

/** Header-safe single line: no CR/LF, collapsed whitespace, capped length. */
export function headerSafe(value: string, max = 160): string {
  return value
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function validateInquiry(inquiry: InquiryPayload): string[] {
  const problems: string[] = [];
  if (!inquiry.name) problems.push('name is required');
  if (!inquiry.email) problems.push('email is required');
  else if (!INQUIRY_EMAIL_RE.test(inquiry.email)) problems.push('email is not valid');
  if (!inquiry.message) problems.push('message is required');
  return problems;
}

export function buildInquiryEmail(
  inquiry: InquiryPayload,
  receivedAt: string,
): RenderedInquiryEmail {
  const product = inquiry.product || 'General';
  const who = inquiry.company || inquiry.country || '';
  const subjectParts = [
    `New Film Inquiry: ${headerSafe(product, 80)}`,
    `— ${headerSafe(inquiry.name, 80)}`,
  ];
  if (who) subjectParts.push(`(${headerSafe(who, 80)})`);
  const subject = headerSafe(subjectParts.join(' '), 200);

  const rows: Array<[string, string]> = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Phone / WhatsApp', inquiry.phone],
    ['Company', inquiry.company],
    ['Country', inquiry.country],
    ['Product of interest', inquiry.product],
    ['Sent from', inquiry.page],
    ['Received', receivedAt],
  ];

  const text = [
    'New inquiry from the website',
    '',
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    inquiry.message,
    '',
    `Reply directly to this email to answer ${inquiry.name} (${inquiry.email}).`,
  ].join('\n');

  const htmlRows = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(
          label,
        )}</td><td style="padding:6px 0;color:#0f172a;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px">
    <tr><td style="padding:20px 24px;border-bottom:1px solid #e2e8f0">
      <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#2563eb;font-weight:700">Website inquiry</div>
      <div style="font-size:20px;font-weight:700;color:#0f172a;margin-top:4px">${escapeHtml(product)}</div>
    </td></tr>
    <tr><td style="padding:16px 24px">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${htmlRows}</table>
    </td></tr>
    <tr><td style="padding:0 24px 20px">
      <div style="font-size:13px;font-weight:700;color:#0f172a;margin-bottom:6px">Message</div>
      <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:#1e293b;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px">${escapeHtml(
        inquiry.message,
      )}</div>
    </td></tr>
    <tr><td style="padding:16px 24px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px">
      Reply to this email to answer ${escapeHtml(inquiry.name)} directly.
    </td></tr>
  </table>
</body></html>`;

  return { subject, html, text };
}
