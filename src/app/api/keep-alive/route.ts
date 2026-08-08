import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 最轻量的保活查询
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();

    return NextResponse.json({ 
      success: true, 
      message: 'keep-alive OK',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}