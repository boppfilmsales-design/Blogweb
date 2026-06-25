import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const PAGES_FILE = join(process.cwd(), 'src', 'data', 'pages.json');

interface PageContent {
  hero: {
    titleEn: string;
    titleZh: string;
    subtitleEn: string;
    subtitleZh: string;
    descEn: string;
    descZh: string;
    ctaTextEn: string;
    ctaTextZh: string;
  };
  about: {
    titleEn: string;
    titleZh: string;
    contentEn: string;
    contentZh: string;
  };
  contact: {
    titleEn: string;
    titleZh: string;
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
}

const defaultPages: PageContent = {
  hero: {
    titleEn: 'Professional Packaging Film Supplier',
    titleZh: '专业BOPP薄膜供应商',
    subtitleEn: 'Providing High-Quality Packaging Film Solutions',
    subtitleZh: '为全球包装行业提供高品质BOPP薄膜解决方案',
    descEn: 'We specialize in the production and export of packaging films.',
    descZh: '我们专注于BOPP薄膜的生产和出口。',
    ctaTextEn: 'Browse Products',
    ctaTextZh: '浏览产品',
  },
  about: {
    titleEn: 'About AEC Group',
    titleZh: '关于我们',
    contentEn: 'AEC Group was established in 2014.',
    contentZh: 'AEC集团成立于2014年。',
  },
  contact: {
    titleEn: 'Contact Us',
    titleZh: '联系我们',
    address: 'Industrial Park, Suzhou, Jiangsu, China',
    phone: '+86 138 0000 0000',
    email: 'sale@boppfilmsale.com',
    whatsapp: '+86 138 0000 0000',
  },
};

function loadPages(): PageContent {
  try {
    if (existsSync(PAGES_FILE)) {
      const data = readFileSync(PAGES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load pages:', error);
  }
  return defaultPages;
}

function savePages(pages: PageContent): void {
  writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 2), 'utf-8');
}

// GET - 获取页面内容
export async function GET() {
  try {
    const pages = loadPages();
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load pages' }, { status: 500 });
  }
}

// POST - 更新页面内容
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pages = loadPages();

    // 更新页面内容
    if (body.hero) pages.hero = { ...pages.hero, ...body.hero };
    if (body.about) pages.about = { ...pages.about, ...body.about };
    if (body.contact) pages.contact = { ...pages.contact, ...body.contact };

    savePages(pages);

    return NextResponse.json({ success: true, pages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pages' }, { status: 500 });
  }
}
