// translate_deepl.mjs
// 读取 scripts/to_translate.json，调用 DeepL 翻译中文缺口，写回 products_cn.json。
// 运行： DEEPL_KEY=xxx node scripts/translate_deepl.mjs
// 依赖： npm i @deepl/node-api
import fs from 'fs';
import path from 'path';
import * as deepl from '@deepl/node-api';

const root = path.resolve('.');
const todo = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'to_translate.json'), 'utf-8'));

const authKey = process.env.DEEPL_KEY;
if (!authKey) { console.error('缺少 DEEPL_KEY 环境变量'); process.exit(1); }
const translator = new deepl.Translator(authKey);

// 把 HTML 描述里的文本翻译，但保留标签：DeepL 会自动忽略 XML/HTML 标签（需开启）
async function translate(text, isHtml) {
  if (!text || text.trim() === '') return text;
  try {
    const res = await translator.translateText(text, null, 'zh', {
      tagHandling: isHtml ? 'html' : undefined,
    });
    return res.text;
  } catch (e) {
    console.error('翻译失败:', text.slice(0, 50), e.message);
    return text; // 失败保留原文
  }
}

const out = [];
for (const t of todo) {
  const isHtml = /<[a-z][\s\S]*>/i.test(t.descriptionEn);
  const nameZh = t.need.nameZh ? await translate(t.nameEn, false) : t.nameZhExisting;
  const descriptionZh = t.need.descriptionZh ? await translate(t.descriptionEn, isHtml) : t.descriptionZhExisting;
  const featuresZh = t.need.featuresZh ? await translate(t.featuresEn, false) : t.featuresZhExisting;
  const applicationsZh = t.need.applicationsZh ? await translate(t.applicationsEn, false) : t.applicationsZhExisting;
  out.push({ slug: t.slug, id: t.id, category: t.category, nameZh, descriptionZh, featuresZh, applicationsZh });
  console.log(`translated slug=${t.slug}`);
}

fs.writeFileSync(path.join(root, 'scripts', 'products_cn.json'), JSON.stringify(out, null, 2), 'utf-8');
console.log(`Done. ${out.length} products written to scripts/products_cn.json`);
