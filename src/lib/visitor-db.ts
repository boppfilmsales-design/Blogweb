import { prisma } from './prisma';

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

// Convert Prisma Visitor to our Visitor type
function toVisitor(prismaVisitor: any): Visitor {
  return {
    ...prismaVisitor,
    timestamp: prismaVisitor.timestamp?.toISOString() || new Date().toISOString(),
  };
}

export async function recordVisitor(
  ip: string,
  userAgent: string,
  referer: string,
  page: string
): Promise<void> {
  const uaInfo = parseUserAgent(userAgent);
  
  await prisma.visitor.create({
    data: {
      ip,
      userAgent,
      referer: referer || '',
      page,
      ...uaInfo,
    }
  });
}

export async function getVisitors(): Promise<Visitor[]> {
  const visitors = await prisma.visitor.findMany({
    orderBy: { timestamp: 'desc' },
    take: 500
  });
  return visitors.map(toVisitor);
}