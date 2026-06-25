import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // 检查文件大小 (最大5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // 创建上传目录
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // 生成唯一文件名
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${timestamp}-${randomStr}.${ext}`;
    const filePath = join(uploadDir, fileName);

    // 保存文件
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    writeFileSync(filePath, buffer);

    // 返回文件URL
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: fileName,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

// 获取已上传文件列表
export async function GET() {
  try {
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    if (!existsSync(uploadDir)) {
      return NextResponse.json({ files: [] });
    }

    const { readdirSync } = await import('fs');
    const files = readdirSync(uploadDir).map((fileName) => ({
      name: fileName,
      url: `/uploads/${fileName}`,
    }));

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({ files: [] });
  }
}
