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
    titleEn: 'Anhui Eastern Communication Imp.& Exp. Co., Ltd.',
    titleZh: '安徽东方通信进出口有限公司',
    subtitleEn: 'Professional BOPP Film Supplier',
    subtitleZh: '专业BOPP薄膜供应商',
    descEn: 'Professional BOPP film manufacturer and exporter, committed to providing high-quality packaging solutions for global customers.',
    descZh: '专业BOPP薄膜制造商和出口商，致力于为全球客户提供优质的包装解决方案。',
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
    address: 'No.1158 Huizhou Ave., Baohe Industrial District, 230051, Hefei city, Anhui Province, P.R.China',
    phone: '86-551-64687285',
    fax: '86-551-64683490',
    mobile: '86-18919659471',
    email: 'sale@boppfilmsale.com',
    whatsapp: '86-18919659471',
    website: 'http://www.boppfilmsale.com',
  },
  header: {
    logoText: 'AEC Group',
    logoSubtext: 'Professional Packaging Film Supplier',
    email: 'sale@boppfilmsale.com',
    phone: '86-551-64687285',
  },
  footer: {
    companyDescEn: 'Professional supplier of BOPP, BOPET, BOPS, CPP, POF films and tape products.',
    companyDescZh: '专业BOPP、BOPET、BOPS、CPP、POF薄膜和胶带产品供应商。',
    address: 'No.1158 Huizhou Ave., Baohe Industrial District, 230051, Hefei city, Anhui Province, P.R.China',
    phone: '86-551-64687285',
    fax: '86-551-64683490',
    mobile: '86-18919659471',
    email: 'sale@boppfilmsale.com',
    whatsapp: '86-18919659471',
    website: 'http://www.boppfilmsale.com',
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    instagram: '#',
    copyright: 'All Rights Reserved',
  },
  cta: {
    titleEn: 'Ready to Get Started?',
    titleZh: '准备开始合作？',
    descEn: 'Contact us today for professional product consultation and competitive quotations',
    descZh: '联系我们，获取专业的产品咨询和报价',
    buttonTextEn: 'Contact Us Now',
    buttonTextZh: '立即联系我们',
    email: 'sale@boppfilmsale.com',
    phone: '86-551-64687285',
    whatsapp: '86-18919659471',
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
