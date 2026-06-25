import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const UPLOAD_DIR = '/tmp/aec-uploads';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filePath = join(UPLOAD_DIR, params.filename);

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = readFileSync(filePath);

    // 根据文件扩展名设置Content-Type
    const ext = params.filename.split('.').pop()?.toLowerCase();
    let contentType = 'image/jpeg';
    switch (ext) {
      case 'png':
        contentType = 'image/png';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Image serve error:', error);
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
  }
}
