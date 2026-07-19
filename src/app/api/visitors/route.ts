import { NextRequest, NextResponse } from 'next/server';
import { recordVisitor, getVisitors, clearVisitors } from '@/lib/visitor';

export const dynamic = 'force-dynamic';

// POST - Record a new visitor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    
    await recordVisitor(
      body.ip || 'unknown',
      userAgent,
      referer,
      body.page || '/'
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to record visitor', details: error?.message }, { status: 500 });
  }
}

// GET - Get all visitors
export async function GET() {
  try {
    const visitors = await getVisitors();
    return NextResponse.json(visitors);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to load visitors', details: error?.message }, { status: 500 });
  }
}

// DELETE - Clear visitor logs
export async function DELETE() {
  try {
    await clearVisitors();
    return NextResponse.json({ success: true, message: 'Visitor logs cleared' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to clear visitors', details: error?.message }, { status: 500 });
  }
}
