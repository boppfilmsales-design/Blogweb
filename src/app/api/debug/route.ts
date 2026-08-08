import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  return NextResponse.json({
    hasDatabaseUrl: !!dbUrl,
    dbUrlPrefix: dbUrl ? dbUrl.substring(0, 80) : 'not set',
    nodeEnv: process.env.NODE_ENV,
  });
}