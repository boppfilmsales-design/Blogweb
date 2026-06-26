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
    story: {
      contentEn: 'Anhui Eastern Communication Group was established with a vision to become a leading supplier of high-quality packaging films to the global packaging industry.\n\nOur state-of-the-art manufacturing facility is equipped with advanced production lines and quality control systems. We specialize in producing a wide range of packaging films including gloss, matte, metalized, heat sealable, and white opaque films.\n\nToday, we serve over 500 clients across 50 countries, providing them with premium packaging film solutions for various applications including food packaging, printing, electronics, and more.',
      contentZh: '安徽东渐进出口集团成立于2014年，专注于为全球包装行业提供高品质的包装薄膜。\n\n我们拥有先进的生产设备和质量控制体系，专业生产各种包装薄膜，包括光膜、哑膜、镀铝膜、热封膜等。\n\n如今，我们为50多个国家的500多家客户提供服务，为他们提供优质的包装薄膜解决方案。',
    },
    values: [
      { titleEn: 'Quality First', titleZh: '质量优先', descEn: 'We maintain the highest quality standards in every product we manufacture.', descZh: '我们在每个产品中保持最高的质量标准。' },
      { titleEn: 'Customer Focus', titleZh: '客户至上', descEn: 'Our customers success is our success. We provide comprehensive support.', descZh: '客户的成功就是我们的成功。我们提供全方位的支持。' },
      { titleEn: 'Innovation', titleZh: '创新驱动', descEn: 'Continuous improvement and innovation drive our product development.', descZh: '持续改进和创新推动我们的产品开发。' },
      { titleEn: 'Sustainability', titleZh: '可持续发展', descEn: 'Committed to environmentally responsible manufacturing practices.', descZh: '致力于环保的制造实践。' },
    ],
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
    logoTextZh: '安徽东渐进出口',
    logoSubtext: 'Professional Packaging Film Supplier',
    logoSubtextZh: '专业BOPP薄膜供应商',
    email: 'sale@boppfilmsale.com',
    phone: '86-551-64687285',
    mobile: '86-18919659471',
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
    friendLinks: [
      { name: '东渐公司官网新版', url: 'http://www.boppfilmsale.com' },
      { name: '东渐公司官网旧版', url: '#' },
      { name: 'CNZZ', url: '#' },
    ],
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
