import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

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
  const client = getPrisma();
  const uaInfo = parseUserAgent(userAgent);

  await client.visitor.create({
    data: {
      ip,
      userAgent,
      referer: referer || '',
      page,
      browser: uaInfo.browser,
      os: uaInfo.os,
      device: uaInfo.device,
    },
  });
}

export async function getVisitors(): Promise<Visitor[]> {
  const client = getPrisma();
  const visitors = await client.visitor.findMany({
    orderBy: { timestamp: 'desc' },
    take: 500,
  });
  return visitors.map(v => ({
    id: v.id,
    ip: v.ip,
    userAgent: v.userAgent,
    referer: v.referer || undefined,
    page: v.page,
    country: v.country || undefined,
    city: v.city || undefined,
    browser: v.browser || undefined,
    os: v.os || undefined,
    device: v.device || undefined,
    timestamp: v.timestamp.toISOString(),
  }));
}

export async function clearVisitors(): Promise<void> {
  const client = getPrisma();
  await client.visitor.deleteMany();
}
