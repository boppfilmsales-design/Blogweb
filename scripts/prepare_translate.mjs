// prepare_translate.mjs
// 读取 products_mapped.json，找出中文缺口，生成 to_translate.json 待翻译清单。
// 纯本地运行，不联网。在 Blogweb 目录下：node scripts/prepare_translate.mjs
import fs from 'fs';
import path from 'path';

const root = path.resolve('.');
const src = path.join(root, 'products_mapped.json');
const out = path.join(root, 'scripts', 'to_translate.json');

const raw = JSON.parse(fs.readFileSync(src, 'utf-8'));
const products = raw.products || raw;

// 判断一个字符串是否看起来是乱码（含大量 CJK 但夹杂明显非预期字符）
function looksGarbled(s) {
  if (!s) return true;
  // 常见乱码特征：连续出现 鎴 朾 嬪 鏈 瑁 闃 鑶 績 鏌 绫 绛 绛 绛 绛 (GBK/UTF-8 错位)
  return /[鎴朾嬪鏈瑁闃鑶績鏌绫绛夊]/.test(s);
}

const todo = [];
for (const p of products) {
  const needNameZh = !p.nameZh || looksGarbled(p.nameZh);
  const needDescZh = !p.descriptionZh || p.descriptionZh.trim() === '';
  const needFeaturesZh = !p.featuresZh || p.featuresZh.trim() === '';
  const needAppsZh = !p.applicationsZh || p.applicationsZh.trim() === '';

  if (needNameZh || needDescZh || needFeaturesZh || needAppsZh) {
    todo.push({
      slug: p.slug,
      id: p.id,
      category: p.category,
      // 英文原文（翻译输入）
      nameEn: p.nameEn || '',
      descriptionEn: p.descriptionEn || '',
      featuresEn: p.featuresEn || '',
      applicationsEn: p.applicationsEn || '',
      // 现有中文（保留已好的，避免覆盖）
      nameZhExisting: p.nameZh || '',
      descriptionZhExisting: p.descriptionZh || '',
      featuresZhExisting: p.featuresZh || '',
      applicationsZhExisting: p.applicationsZh || '',
      // 缺口标记
      need: { nameZh: needNameZh, descriptionZh: needDescZh, featuresZh: needFeaturesZh, applicationsZh: needAppsZh }
    });
  }
}

fs.writeFileSync(out, JSON.stringify(todo, null, 2), 'utf-8');
console.log(`Total products: ${products.length}`);
console.log(`Need Chinese work: ${todo.length}`);
console.log(`  - nameZh:        ${todo.filter(t => t.need.nameZh).length}`);
console.log(`  - descriptionZh: ${todo.filter(t => t.need.descriptionZh).length}`);
console.log(`  - featuresZh:    ${todo.filter(t => t.need.featuresZh).length}`);
console.log(`  - applicationsZh:${todo.filter(t => t.need.applicationsZh).length}`);
console.log(`Written to scripts/to_translate.json`);
