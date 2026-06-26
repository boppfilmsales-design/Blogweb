import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dataDir = join(process.cwd(), 'public', 'data');
    const result: any = {};

    // 读取页面内容
    const pagesFile = join(dataDir, 'pages.json');
    if (existsSync(pagesFile)) {
      try {
        result.pages = JSON.parse(readFileSync(pagesFile, 'utf-8'));
        result.pagesSource = 'public/data/pages.json';
      } catch (e) {
        result.pagesError = 'Failed to parse pages.json';
      }
    }

    // 读取产品数据
    const productsFile = join(dataDir, 'products.json');
    if (existsSync(productsFile)) {
      try {
        result.products = JSON.parse(readFileSync(productsFile, 'utf-8'));
        result.productsSource = 'public/data/products.json';
        result.productCount = Array.isArray(result.products) ? result.products.length : 0;
      } catch (e) {
        result.productsError = 'Failed to parse products.json';
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
      note: 'This shows the default data from public/data/. Browser localStorage data is stored in the user\'s browser and is not visible here.',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to read data' }, { status: 500 });
  }
}
