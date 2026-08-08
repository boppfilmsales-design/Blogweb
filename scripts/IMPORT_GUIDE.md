# 产品搬运执行清单（boppfilmsale-next → Turso）

## 最终方案（已锁定）
- 搬运范围：products_mapped.json 中 167 个有英文介绍的产品；旧站无英文的舍弃
- 语言：英文为主；中文由英文翻译补全（DeepL 或 LLM，方案 X）
- 数据库：Turso (LibSQL)，src/lib/db.ts 已改为 @libsql/client 直连，复用 Vercel 现有 TURSO_DATABASE_URL / TURSO_AUTH_TOKEN
- 图片：只搬 167 个产品引用的图，本地化进 public/products/（方案 A，控体积 <100MB）

## 已完成的改动（机器人做好，无需你改）
- src/lib/db.ts 重写为 @libsql/client 直连 Turso，导出函数签名不变
- package.json 移除 prisma/supabase，加入 @libsql/client，移除 postinstall prisma generate
- scripts/import_to_turso.mjs 建表+导入脚本
- scripts/prepare_translate.mjs / translate_deepl.mjs / translate_llm.mjs / merge_translate.mjs / localize_images.mjs

## 你本地执行顺序

### 0. 安装依赖
```bash
cd Blogweb
npm install        # 现在装的是 @libsql/client，不再跑 prisma generate
```

### 1. 准备待翻译清单（纯本地，不需 key）
```bash
node scripts/prepare_translate.mjs
# 生成 scripts/to_translate.json，打印缺口统计
```

### 2. 翻译中文（二选一，需 key）
```bash
# DeepL
DEEPL_KEY=你的key node scripts/translate_deepl.mjs
# 或 LLM（更自然）
OPENAI_API_KEY=你的key OPENAI_BASE=https://api.openai.com/v1 OPENAI_MODEL=gpt-4o-mini node scripts/translate_llm.mjs
# 都输出 scripts/products_cn.json
```

### 3. 合并回主数据
```bash
node scripts/merge_translate.mjs
# 生成 scripts/products_final.json（含完整中文）
```

### 4. 图片本地化
```bash
OLD_SITE="C:\Users\DELL\.qwenpaw\workspaces\default\web-东渐网站源码" node scripts/localize_images.mjs
# 图片进 public/products/，products_final.json 的 images 改为 /products/xxx.jpg
# 报告总体积，若 >100MB 需精简
```

### 5. 导入 Turso
```bash
# 确保 Vercel 环境变量 TURSO_DATABASE_URL / TURSO_AUTH_TOKEN 有效
# 本地跑导入（用同样的两个变量）：
TURSO_DATABASE_URL=libsql://你的url TURSO_AUTH_TOKEN=你的token node scripts/import_to_turso.mjs
# 输出：新建/更新条数
```

### 6. 部署
```bash
git add -A
git commit -m "feat: import 167 products (EN+ZH) via Turso, localized images"
git push   # 触发 Vercel 部署；Vercel 用环境变量的 TURSO_* 连库
```

### 7. 验证
- 访问 https://boppfilmsale-next.vercel.app/products 确认产品数量
- 本地查库：node -e "const{createClient}=require('@libsql/client');..." 或Turso控制台看行数
- 抽查产品图片是否显示

## 备注
- key 走环境变量，不写进仓库
- 图片外链 telegraph-image 会下载本地化，不依赖第三方图床
- 若 Turso 凭证失效，去 turbo.new 控制台重新生成 TURSO_AUTH_TOKEN
