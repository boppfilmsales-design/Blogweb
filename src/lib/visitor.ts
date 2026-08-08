// Visitor tracking: deprecated Prisma dependency removed.
// Kept as no-op stubs so /api/visitors still builds and runs without a DB table.
// If you later want visitor analytics on Turso, implement here with @libsql/client.

export interface Visitor {
  id: string;
  ip: string;
  userAgent: string;
  referer?: string;
  page: string;
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  device?: string;
  timestamp: string;
}

function parseUserAgent(ua: string): { browser?: string; os?: string; device?: string } {
  const result: { browser?: string; os?: string; device?: string } = {};
  if (ua.includes('Firefox')) result.browser = 'Firefox';
  else if (ua.includes('Edg')) result.browser = 'Edge';
  else if (ua.includes('Chrome')) result.browser = 'Chrome';
  else if (ua.includes('Safari')) result.browser = 'Safari';
  else if (ua.includes('Opera')) result.browser = 'Opera';

  if (ua.includes('Windows')) result.os = 'Windows';
  else if (ua.includes('Mac OS')) result.os = 'macOS';
  else if (ua.includes('Linux')) result.os = 'Linux';
  else if (ua.includes('Android')) result.os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) result.os = 'iOS';

  if (ua.includes('Mobile')) result.device = 'Mobile';
  else if (ua.includes('Tablet')) result.device = 'Tablet';
  else result.device = 'Desktop';

  return result;
}

export async function recordVisitor(
  ip: string,
  userAgent: string,
  referer: string,
  page: string
): Promise<void> {
  // No-op: visitor analytics disabled (no DB table). Safe to call.
  void parseUserAgent(userAgent);
  void ip; void referer; void page;
}

export async function getVisitors(): Promise<Visitor[]> {
  return [];
}

export async function clearVisitors(): Promise<void> {
  // No-op
}
