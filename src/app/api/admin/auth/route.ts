import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST - Validate admin password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = body.password || '';

    const expectedPassword = process.env.ADMIN_PASSWORD || 'aecgroup2024';

    if (password === expectedPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
