// 统一的分类配置：与各页面共享，确保链接、显示名一致
// category id 必须与数据库 Product.category 字段完全一致

export interface CategoryConfig {
  id: string;
  en: string;
  zh: string;
  group: string; // 用于分组显示
}

export const CATEGORIES: CategoryConfig[] = [
  // ===== BOPP 系列 =====
  { id: 'boppfilm-cigarette', en: 'BOPP Cigarette Film', zh: 'BOPP烟膜', group: 'BOPP' },
  { id: 'boppfilm-printing', en: 'BOPP Printing Film', zh: 'BOPP印刷膜', group: 'BOPP' },
  { id: 'boppfilm-capacitor', en: 'BOPP Capacitor Film', zh: 'BOPP电容膜', group: 'BOPP' },
  { id: 'boppfilm-flower', en: 'BOPP Flower Film', zh: 'BOPP花卉包装膜', group: 'BOPP' },
  { id: 'boppfilm-pearl', en: 'BOPP Pearl Film', zh: 'BOPP珠光膜', group: 'BOPP' },
  { id: 'boppfilm-metallized', en: 'BOPP Metallized Film', zh: 'BOPP镀铝膜', group: 'BOPP' },
  { id: 'boppfilm-heatseal', en: 'BOPP Heat Seal Film', zh: 'BOPP热封膜', group: 'BOPP' },
  { id: 'bopp-crystal-jumbo', en: 'BOPP Crystal Jumbo', zh: 'BOPP水晶大卷', group: 'BOPP' },
  { id: 'bopp-thermal-glossy', en: 'BOPP Thermal Glossy', zh: 'BOPP热敏光膜', group: 'BOPP' },
  { id: 'bopp-tape-jumbo', en: 'BOPP Tape Jumbo', zh: 'BOPP胶带大卷', group: 'BOPP' },
  { id: 'bopp-tape-finished', en: 'BOPP Tape Finished', zh: 'BOPP胶带成品', group: 'BOPP' },
  { id: 'printed-bopp-tape', en: 'Printed BOPP Tape', zh: '印刷BOPP胶带', group: 'BOPP' },
  { id: 'masking-tape-jumbo', en: 'Masking Tape Jumbo', zh: '美纹纸胶带大卷', group: 'BOPP' },
  { id: 'double-sides-jumbo', en: 'Double-sided Tape', zh: '双面胶大卷', group: 'BOPP' },

  // ===== BOPET 系列 =====
  { id: 'bopet-clear', en: 'BOPET Clear Film', zh: 'BOPET透明膜', group: 'BOPET' },
  { id: 'bopet-45mic', en: 'BOPET 45 Micron', zh: 'BOPET 45微米', group: 'BOPET' },
  { id: 'bopet-40mic', en: 'BOPET 40 Micron', zh: 'BOPET 40微米', group: 'BOPET' },
  { id: 'bopet-38-45mic', en: 'BOPET 38-45 Micron', zh: 'BOPET 38-45微米', group: 'BOPET' },
  { id: 'bopet-thermal', en: 'BOPET Thermal Film', zh: 'BOPET热敏膜', group: 'BOPET' },
  { id: 'bopet-metallized-45', en: 'Metallized BOPET 45', zh: '镀铝BOPET 45', group: 'BOPET' },
  { id: 'bopet-metallized-6', en: 'Metallized BOPET 6', zh: '镀铝BOPET 6', group: 'BOPET' },
  { id: 'bopet-capacitor', en: 'BOPET Capacitor Film', zh: 'BOPET电容膜', group: 'BOPET' },
  { id: 'bopet-color-vmpet', en: 'Colored VMPET', zh: '彩色VMPET膜', group: 'BOPET' },
  { id: 'bopet-insulating', en: 'BOPET Insulating Film', zh: 'BOPET绝缘膜', group: 'BOPET' },
  { id: 'laser-bopet-thermal', en: 'Laser BOPET Thermal', zh: '激光BOPET热敏膜', group: 'BOPET' },
  { id: 'matal-bopp-thermal', en: 'Metallic BOPP Thermal', zh: '金属BOPP热敏膜', group: 'BOPET' },

  // ===== BOPA 系列 =====
  { id: 'bopa-12mic', en: 'BOPA 12 Micron', zh: 'BOPA 12微米', group: 'BOPA' },
  { id: 'bopa-15mic', en: 'BOPA 15 Micron', zh: 'BOPA 15微米', group: 'BOPA' },
  { id: 'bopa-thermal', en: 'BOPA Thermal Film', zh: 'BOPA热敏膜', group: 'BOPA' },

  // ===== BOPS 系列 =====
  { id: 'bops-glossy', en: 'BOPS Glossy Film', zh: 'BOPS光膜', group: 'BOPS' },
  { id: 'bops-matt', en: 'BOPS Matte Film', zh: 'BOPS哑膜', group: 'BOPS' },
  { id: 'bops-shrink', en: 'BOPS Shrink Film', zh: 'BOPS收缩膜', group: 'BOPS' },
  { id: 'bops-food', en: 'BOPS Food Film', zh: 'BOPS食品膜', group: 'BOPS' },

  // ===== CPP / POF / PE =====
  { id: 'cpp', en: 'CPP Film', zh: 'CPP薄膜', group: 'CPP/POF/PE' },
  { id: 'gcpp-film', en: 'GCPP Film', zh: 'GCPP薄膜', group: 'CPP/POF/PE' },
  { id: 'pof-central', en: 'POF Central Fold', zh: 'POF中折膜', group: 'CPP/POF/PE' },
  { id: 'pof-single', en: 'POF Single Wound', zh: 'POF单张膜', group: 'CPP/POF/PE' },
  { id: 'pe-cling', en: 'PE Cling Film', zh: 'PE保鲜膜', group: 'CPP/POF/PE' },
  { id: 'pe-stretch', en: 'PE Stretch Film', zh: 'PE拉伸膜', group: 'CPP/POF/PE' },
  { id: 'pvc-cling', en: 'PVC Cling Film', zh: 'PVC保鲜膜', group: 'CPP/POF/PE' },

  // ===== 纸类 =====
  { id: 'a4-copy', en: 'A4 Copy Paper', zh: 'A4复印纸', group: 'Paper' },
  { id: 'copy-paper-jumbo', en: 'Copy Paper Jumbo', zh: '复印纸大卷', group: 'Paper' },
  { id: 'legal-copy', en: 'Legal Copy Paper', zh: '法律用复印纸', group: 'Paper' },
  { id: 'letter-copy', en: 'Letter Copy Paper', zh: '信纸用复印纸', group: 'Paper' },
  { id: 'photo-paper', en: 'Photo Paper', zh: '相纸', group: 'Paper' },
  { id: 'lwc-paper', en: 'LWC Paper', zh: '轻涂纸', group: 'Paper' },

  // ===== 标签 =====
  { id: 'labels-rolls', en: 'Label Rolls', zh: '标签卷', group: 'Labels' },
  { id: 'labels-sheets', en: 'Label Sheets', zh: '标签张', group: 'Labels' },

  // ===== 撕裂带 =====
  { id: 'tear-tape', en: 'Tear Tape', zh: '撕裂胶带', group: 'Tear Tape' },
  { id: 'clear-tear', en: 'Clear Tear Tape', zh: '透明撕裂带', group: 'Tear Tape' },
  { id: 'golden-tear', en: 'Golden Tear Tape', zh: '金色撕裂带', group: 'Tear Tape' },
  { id: 'red-tear', en: 'Red Tear Tape', zh: '红色撕裂带', group: 'Tear Tape' },
  { id: 'laser-tear', en: 'Laser Tear Tape', zh: '激光撕裂带', group: 'Tear Tape' },
  { id: 'printed-tear', en: 'Printed Tear Tape', zh: '印刷撕裂带', group: 'Tear Tape' },
  { id: 'bopp-sheet-tear', en: 'BOPP Sheet Tear', zh: 'BOPP片材撕裂带', group: 'Tear Tape' },
  { id: 'tear-clips', en: 'Tear Tape Clips', zh: '撕裂带夹', group: 'Tear Tape' },

  // ===== 包装袋/片材 =====
  { id: 'bags-sheets-group', en: 'Bags & Sheets', zh: '包装袋与片材', group: 'Packaging' },
  { id: 'soft-touch-velvet', en: 'Soft Touch Velvet Film', zh: '柔触绒面膜', group: 'Packaging' },

  // ===== 墨水/树脂 =====
  { id: 'inkjet-supply', en: 'Inkjet Supplies', zh: '喷墨耗材', group: 'Supplies' },
  { id: 'wax-resin', en: 'Wax/Resin Ribbon', zh: '蜡基/树脂碳带', group: 'Supplies' },

  // ===== 其他 =====
  { id: 'adhesive-glue', en: 'Adhesive & Glue', zh: '胶粘剂', group: 'Others' },
  { id: 'other-films', en: 'Other Films', zh: '其他薄膜', group: 'Others' },
  { id: 'others-group', en: 'Other Products', zh: '其他产品', group: 'Others' },
  { id: 'printing-machines', en: 'Printing Machines', zh: '印刷机械', group: 'Machines' },
  { id: 'slitting-machines', en: 'Slitting Machines', zh: '分切机械', group: 'Machines' },
  { id: 'test', en: 'Test Products', zh: '测试产品', group: 'Others' },
];

// 按 group 分组
export const CATEGORY_GROUPS: Record<string, CategoryConfig[]> = CATEGORIES.reduce((acc, cat) => {
  if (!acc[cat.group]) acc[cat.group] = [];
  acc[cat.group].push(cat);
  return acc;
}, {} as Record<string, CategoryConfig[]>);

// 获取分类显示名
export function getCategoryName(categoryId: string, locale: string = 'en'): string {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return categoryId;
  return locale === 'zh' ? cat.zh : cat.en;
}
