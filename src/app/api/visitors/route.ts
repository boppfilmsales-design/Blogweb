import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const VISITORS_FILE = join(process.cwd(), 'src', 'data', 'visitors.json');

interface Visitor {
  id: string;
  ip: string;
  userAgent: string;
  referer: string;
  page: string;
  timestamp: string;
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  device?: string;
}

function getVisitors(): Visitor[] {
  try {
    if (existsSync(VISITORS_FILE)) {
      const data = readFileSync(VISITORS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load visitors:', error);
  }
  return [];
}

function saveVisitors(visitors: Visitor[]): void {
  writeFileSync(VISITORS_FILE, JSON.stringify(visitors, null, 2), 'utf-8');
}

function parseUserAgent(ua: string): { browser?: string; os?: string; device?: string } {
  const result: { browser?: string; os?: string; device?: string } = {};

  // Browser detection
  if (ua.includes('Firefox')) result.browser = 'Firefox';
  else if (ua.includes('Edg')) result.browser = 'Edge';
  else if (ua.includes('Chrome')) result.browser = 'Chrome';
  else if (ua.includes('Safari')) result.browser = 'Safari';
  else if (ua.includes('Opera')) result.browser = 'Opera';

  // OS detection
  if (ua.includes('Windows')) result.os = 'Windows';
  else if (ua.includes('Mac OS')) result.os = 'macOS';
  else if (ua.includes('Linux')) result.os = 'Linux';
  else if (ua.includes('Android')) result.os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) result.os = 'iOS';

  // Device detection
  if (ua.includes('Mobile')) result.device = 'Mobile';
  else if (ua.includes('Tablet')) result.device = 'Tablet';
  else result.device = 'Desktop';

  return result;
}

// POST - Record a new visitor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const visitors = getVisitors();

    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    const uaInfo = parseUserAgent(userAgent);

    const visitor: Visitor = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
      ip: body.ip || 'unknown',
      userAgent,
      referer,
      page: body.page || '/',
      timestamp: new Date().toISOString(),
      ...uaInfo,
    };

    visitors.unshift(visitor);

    // Keep only last 500 visitors
    if (visitors.length > 500) {
      visitors.splice(500);
    }

    saveVisitors(visitors);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record visitor' }, { status: 500 });
  }
}

// GET - Get all visitors
export async function GET() {
  try {
    const visitors = getVisitors();
    return NextResponse.json(visitors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load visitors' }, { status: 500 });
  }
}

// DELETE - Clear visitor logs
export async function DELETE() {
  try {
    saveVisitors([]);
    return NextResponse.json({ success: true, message: 'Visitor logs cleared' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear visitors' }, { status: 500 });
  }
}
