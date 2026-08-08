// merge_translate.mjs
// 把翻译结果 products_cn.json 合并回 products_mapped.json，生成 products_final.json。
// 已有正确中文的保留，翻译结果覆盖缺口。运行： node scripts/merge_translate.mjs
import fs from 'fs';
import path from 'path';

const root = path.resolve('.');
const base = JSON.parse(fs.readFileSync(path.join(root, 'products_mapped.json'), 'utf-8'));
const cn = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'products_cn.json'), 'utf-8'));

const cnBySlug = new Map(cn.map(c => [c.slug, c]));

const products = (base.products || base).map(p => {
  const c = cnBySlug.get(p.slug);
  if (!c) return p;
  return {
    ...p,
    nameZh: c.nameZh || p.nameZh,
    descriptionZh: c.descriptionZh || p.descriptionZh,
    featuresZh: c.featuresZh || p.featuresZh,
    applicationsZh: c.applicationsZh || p.applicationsZh,
  };
});

fs.writeFileSync(path.join(root, 'scripts', 'products_final.json'), JSON.stringify(products, null, 2), 'utf-8');
console.log(`Merged. ${products.length} products -> scripts/products_final.json`);
