// translate_llm.mjs
// 用 LLM（OpenAI 兼容）翻译中文缺口，效果比 DeepL 更自然。
// 运行： OPENAI_API_KEY=xxx OPENAI_BASE=https://api.openai.com/v1 OPENAI_MODEL=gpt-4o-mini node scripts/translate_llm.mjs
// 依赖： npm i openai
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const root = path.resolve('.');
const todo = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'to_translate.json'), 'utf-8'));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE || 'https://api.openai.com/v1',
});
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

async function translate(text) {
  if (!text || text.trim() === '') return text;
  const sys = '你是专业工业薄膜产品翻译。把英文产品名/描述准确、通顺地翻译成中文，保留原有的 HTML 标签结构，不要加额外解释。';
  try {
    const r = await client.chat.completions.create({
      model, messages: [
        { role: 'system', content: sys },
        { role: 'user', content: text },
      ], temperature: 0.2,
    });
    return r.choices[0].message.content.trim();
  } catch (e) {
    console.error('翻译失败:', text.slice(0, 50), e.message);
    return text;
  }
}

const out = [];
for (const t of todo) {
  const nameZh = t.need.nameZh ? await translate(t.nameEn) : t.nameZhExisting;
  const descriptionZh = t.need.descriptionZh ? await translate(t.descriptionEn) : t.descriptionZhExisting;
  const featuresZh = t.need.featuresZh ? await translate(t.featuresEn) : t.featuresZhExisting;
  const applicationsZh = t.need.applicationsZh ? await translate(t.applicationsEn) : t.applicationsZhExisting;
  out.push({ slug: t.slug, id: t.id, category: t.category, nameZh, descriptionZh, featuresZh, applicationsZh });
  console.log(`translated slug=${t.slug}`);
}
fs.writeFileSync(path.join(root, 'scripts', 'products_cn.json'), JSON.stringify(out, null, 2), 'utf-8');
console.log(`Done. ${out.length} products written to scripts/products_cn.json`);
