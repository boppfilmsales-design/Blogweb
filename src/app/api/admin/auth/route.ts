// Admin session endpoint.
//
//   POST   { password }  -> sets the HttpOnly `aec_admin_session` cookie
//   GET                  -> { authenticated: true|false }
//   DELETE               -> clears the session cookie
//
// The password is compared against ADMIN_PASSWORD (Pages environment variable).
// There is no default: while ADMIN_PASSWORD is unset, POST answers 503 and every
// protected route answers 401.
import { NextRequest, NextResponse } from 'next/server';
import {
  attachSessionCookie,
  clearSessionCookie,
  createSessionValue,
  getAdminPassword,
  isSecureRequest,
  requireAdmin,
  verifyAdminPassword,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Never let a proxy or browser cache an auth response.
const NO_STORE = { 'Cache-Control': 'no-store' } as const;

// POST - validate the admin password and start a session
export async function POST(request: NextRequest) {
  let password = '';
  try {
    const body: any = await request.json();
    password = typeof body?.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400, headers: NO_STORE },
    );
  }

  const expected = await getAdminPassword();
  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'Admin password is not configured' },
      { status: 503, headers: NO_STORE },
    );
  }

  if (!(await verifyAdminPassword(password))) {
    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401, headers: NO_STORE },
    );
  }

  const session = await createSessionValue();
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Admin session secret is not configured' },
      { status: 503, headers: NO_STORE },
    );
  }

  const response = NextResponse.json({ success: true }, { headers: NO_STORE });
  return attachSessionCookie(response, session.value, session.maxAge, isSecureRequest(request));
}

// GET - is the caller already authenticated?
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  return NextResponse.json({ authenticated: !denied }, { headers: NO_STORE });
}

// DELETE - log out
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true }, { headers: NO_STORE });
  return clearSessionCookie(response, isSecureRequest(request));
}
