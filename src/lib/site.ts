// Canonical, single-source site facts.
// Everything a page needs about the company lives here so the header, footer,
// hero, about page, structured data and sitemap can never drift apart.

export const SITE_URL = 'https://blog.boppfilmsale.com';

export const SITE = {
  url: SITE_URL,
  name: 'AEC Group',
  legalName: 'Anhui Eastern Communication Imp. & Exp. Co., Ltd.',
  legalNameZh: '安徽东渐进出口有限公司',
  founded: 2014,
  tagline: 'Factory-direct packaging film, manufactured in Hefei since 2014',
  description:
    'Manufacturer and exporter of BOPP, BOPET, BOPS, CPP and POF packaging films: 15–50 µm, 200–1600 mm slitting, 10,000+ tonnes a year.',
  address: {
    street: 'No.1158 Huizhou Ave., Baohe Industrial District',
    postalCode: '230051',
    city: 'Hefei',
    region: 'Anhui',
    country: 'CN',
    full: 'No.1158 Huizhou Ave., Baohe Industrial District, 230051, Hefei, Anhui, P.R. China',
  },
  phone: '+86-551-64687285',
  phoneDisplay: '86-551-64687285',
  mobile: '+86-18919659471',
  mobileDisplay: '86-18919659471',
  email: 'sale@boppfilmsale.com',
  whatsapp: '8618919659471',
  whatsappDisplay: '+86 189 1965 9471',
  hours: 'Mo-Sa 09:00-18:00',
  hoursDisplay: 'Monday – Saturday, 09:00–18:00 (GMT+8)',
  languages: ['en', 'zh', 'es', 'pt', 'ar'],
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  'Hello AEC Group, I would like a quotation for packaging film.',
)}`;

export const MAILTO_URL = `mailto:${SITE.email}`;

/** Verified production facts used across the site and in structured data. */
export const PROOF = {
  founded: 2014,
  capacityTonnes: 10000,
  passRate: '99.9%',
  clients: 500,
  countries: 50,
  thickness: '15–50 µm',
  width: '200–1600 mm',
} as const;

export interface Certification {
  name: string;
  full: string;
  scopeEn: string;
  scopeZh: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'ISO 9001',
    full: 'ISO 9001:2015 Quality management',
    scopeEn: 'Documented process control from incoming resin to final inspection.',
    scopeZh: '从原料进厂到成品检验的全过程文件化管控。',
  },
  {
    name: 'FDA',
    full: 'FDA food-contact compliance',
    scopeEn: 'Grades intended for food packaging, with declaration on request.',
    scopeZh: '用于食品包装的牌号，可按需提供声明。',
  },
  {
    name: 'SGS',
    full: 'SGS third-party testing',
    scopeEn: 'Independent testing of physical and barrier properties.',
    scopeZh: '物理与阻隔性能的第三方检测。',
  },
  {
    name: 'RoHS',
    full: 'RoHS restricted substances',
    scopeEn: 'Restricted heavy metals and substances controlled per batch.',
    scopeZh: '受限重金属及物质按批次管控。',
  },
  {
    name: 'REACH',
    full: 'REACH (EU) chemical compliance',
    scopeEn: 'SVHC screening and declarations for EU-bound shipments.',
    scopeZh: '面向欧盟订单的 SVHC 筛查与声明。',
  },
  {
    name: 'ISO 14001',
    full: 'ISO 14001:2015 Environmental management',
    scopeEn: 'Waste, energy and emissions managed under a certified system.',
    scopeZh: '废弃物、能源与排放在认证体系下管理。',
  },
];

/** Product families shown in navigation and on the homepage.
 *  `name` must match a key of CATEGORY_GROUPS (src/lib/categories.ts), because
 *  the links are /products?group=<name> and an unknown group filters to nothing. */
export const FAMILIES = [
  { name: 'BOPP', en: 'BOPP Films', zh: 'BOPP 薄膜', blurbEn: 'Clear, matte, metallized, pearl, cigarette and capacitor grades.', blurbZh: '透明、哑光、镀铝、珠光、烟膜与电容膜。' },
  { name: 'BOPET', en: 'BOPET Films', zh: 'BOPET 薄膜', blurbEn: 'Clear, thermal, metallized and capacitor-grade polyester film.', blurbZh: '透明、热敏、镀铝及电容级聚酯薄膜。' },
  { name: 'BOPA', en: 'BOPA Films', zh: 'BOPA 薄膜', blurbEn: 'Nylon film for high-strength laminates and vacuum packs.', blurbZh: '用于高强度复合与真空包装的尼龙膜。' },
  { name: 'BOPS', en: 'BOPS Films', zh: 'BOPS 薄膜', blurbEn: 'Glossy, matte, shrink and food-grade polystyrene film.', blurbZh: '光面、哑光、收缩及食品级聚苯乙烯薄膜。' },
  { name: 'CPP/POF/PE', en: 'CPP / POF / PE', zh: 'CPP / POF / PE', blurbEn: 'Cast polypropylene, shrink film and stretch film.', blurbZh: '流延聚丙烯、收缩膜与拉伸膜。' },
  { name: 'Tear Tape', en: 'Tear Tape', zh: '撕裂带', blurbEn: 'Clear, printed, gold and laser tear tape for cigarette and food packs.', blurbZh: '用于烟包与食品包装的透明、印刷、金色及镭射撕裂带。' },
  { name: 'Labels', en: 'Labels', zh: '标签', blurbEn: 'Label rolls and label sheets for printing and converting.', blurbZh: '用于印刷与加工的标签卷与标签片材。' },
  { name: 'Packaging', en: 'Bags & Sheets', zh: '包装袋与片材', blurbEn: 'BOPP and PE bags, sheets and converted packaging.', blurbZh: 'BOPP 与 PE 袋子、片材及加工包装。' },
] as const;
