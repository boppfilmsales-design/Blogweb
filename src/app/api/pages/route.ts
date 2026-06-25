import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// 使用tmp目录存储运行时数据（Vercel Serverless可写）
const DATA_DIR = '/tmp/aec-data';
const PAGES_FILE = join(DATA_DIR, 'pages.json');

// 确保目录存在
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// 默认页面内容
const defaultPages = {
  hero: {
    titleEn: 'Professional Packaging Film Supplier',
    titleZh: '专业BOPP薄膜供应商',
    subtitleEn: 'Providing High-Quality Packaging Film Solutions',
    subtitleZh: '为全球包装行业提供高品质BOPP薄膜解决方案',
    descEn: 'We specialize in the production and export of BOPP films.',
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
  header: {
    logoText: 'AEC Group',
    logoSubtext: 'Professional Packaging Film Supplier',
  },
  footer: {
    companyDescEn: 'Professional supplier of BOPP, BOPET, BOPS, CPP, POF films and tape products.',
    companyDescZh: '专业BOPP、BOPET、BOPS、CPP、POF薄膜和胶带产品供应商。',
    address: 'Industrial Park, Suzhou, Jiangsu, China',
    phone: '+86 138 0000 0000',
    email: 'sale@boppfilmsale.com',
    whatsapp: '+86 138 0000 0000',
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    instagram: '#',
    copyright: 'All Rights Reserved',
  },
  navigation: [
    { id: 'home', labelEn: 'Home', labelZh: '首页', href: '/', order: 1, visible: true },
    { id: 'products', labelEn: 'Products', labelZh: '产品中心', href: '/products', order: 2, visible: true },
    { id: 'certifications', labelEn: 'Certifications', labelZh: '认证资质', href: '/certifications', order: 3, visible: true },
    { id: 'about', labelEn: 'About', labelZh: '关于我们', href: '/about', order: 4, visible: true },
    { id: 'contact', labelEn: 'Contact', labelZh: '联系我们', href: '/contact', order: 5, visible: true },
  ],
};

function loadPages() {
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

function savePages(pages: typeof defaultPages): void {
  try {
    writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save pages:', error);
  }
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
    if (body.header) pages.header = { ...pages.header, ...body.header };
    if (body.footer) pages.footer = { ...pages.footer, ...body.footer };
    if (body.navigation) pages.navigation = body.navigation;

    savePages(pages);

    return NextResponse.json({ success: true, pages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pages' }, { status: 500 });
  }
}
