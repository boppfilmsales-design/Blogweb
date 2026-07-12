import { getSupabase } from './supabase';

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
  const client = getSupabase();
  const uaInfo = parseUserAgent(userAgent);
  
  await client.from('Visitor').insert({
    ip,
    userAgent,
    referer: referer || '',
    page,
    ...uaInfo,
  });
}

export async function getVisitors(): Promise<Visitor[]> {
  const client = getSupabase();
  const { data, error } = await client
    .from('Visitor')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(500);
  
  if (error) throw error;
  return data || [];
}