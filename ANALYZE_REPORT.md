# AEC Group 网站架构分析报告

## 项目概览

**技术栈：** Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS + Prisma + Supabase (PostgreSQL)

**整体结构：**
```
Blogweb/
├── src/
│   ├── app/                  # 页面路由（全 Client Components）
│   │   ├── layout.tsx        # 根布局
│   │   ├── page.tsx          # 首页
│   │   ├── products/         # 产品列表 + 详情 [slug]
│   │   ├── about/            # 关于页面
│   │   ├── contact/          # 联系页面
│   │   ├── certifications/   # 认证页面
│   │   ├── admin/            # 后台（login + main + visitors）
│   │   └── api/              # API 路由
│   ├── components/           # UI 组件
│   ├── context/             # LanguageContext（多语言）
│   ├── data/                # 静态数据（products.ts/json、pages.json）
│   ├── lib/                 # db.ts / supabase.ts / prisma.ts / api.ts
│   ├── locales/             # 5 种语言 JSON
│   └── scripts/             # 导入脚本
├── prisma/schema.prisma     # Product + Visitor 模型
└── vercel.json              # 部署配置
```

---

## 核心数据流

### 产品数据

**数据库（PostgreSQL via Supabase）：**
- 已有 **163 个产品** 在数据库中
- 类别分布：boppfilm-cigarette (13)、boppfilm-printing (11)、bopet-clear (10) 等 70+ 个分类

**前端展示逻辑：**
- `src/lib/api.ts` → `getProducts()` → fetch `/api/products`
- `/api/products` → `src/lib/db.ts` → 实际指向 `src/lib/supabase.ts` 的 `getSupabase()`
- ⚠️ **问题**：`src/lib/db.ts` re-export 的是 `supabase.ts` 而非 `prisma.ts`，所以当前使用的可能是 Supabase JS SDK 而非 Prisma

**静态数据文件：**
- `src/data/products.ts` — 格式化为 `{ name: {en, zh, ...}, specifications, features }` 嵌套结构（旧格式）
- `src/data/products-db.json` — 扁平结构（id, slug, nameEn, nameZh, category...）与 DB schema 对齐
- `src/data/products.json` — 混合结构
- `src/data/pages.json` / `pages-runtime.json` — 页面内容

**前端组件引用：**
- `FeaturedProducts.tsx` 引入 `import { products } from '@/data/products'`（旧格式）
- `ProductCard.tsx` 使用 `product.specifications.thickness`（旧格式）
- `products/page.tsx` 使用 `getProducts()` + `product.thickness`（DB 格式）
- `products/[slug]/page.tsx` 使用 `getProductBySlug()` + `product.featuresEn`（DB 格式）

### 页面内容数据

- `/api/pages` → 读写 `/tmp/aec-data/pages.json`（Vercel 临时存储）
- 前端组件（Header、Footer、Hero 等）从 `localStorage('aec-page-content')` 优先读取，再从 API 补充
- `defaultPages` 在 `src/app/api/pages/route.ts` 中硬编码

### 多语言

- `LanguageContext.tsx` 管理 5 种语言（zh/en/ar/es/pt）
- ar 为 RTL
- 各页面使用 `useLanguage()` 的 `t` 对象做翻译
- **注意**：产品详情页（[slug]）未使用 `t`，而是直接显示 nameEn/nameZh 双语

---

## 发现的问题

### 1. 数据格式不一致 ⚠️ 严重
- **首页 FeaturedProducts** 使用 `src/data/products.ts` 的嵌套格式（name.en, specifications.thickness）
- **产品列表/详情页** 使用 DB 格式的扁平结构（nameEn, thickness）
- 两套数据格式不兼容，且 `products.ts` 中的数据（28 个示例）与 DB（163 个）不同步
- FeaturedProducts 仅显示 `products.ts` 中的 featured 产品（约 5 个），不显示 DB 中的 featured

### 2. 数据来源混乱 ⚠️ 中等
- `src/lib/db.ts` 实际指向 Supabase SDK
- `src/lib/prisma.ts` 存在但未在 db.ts 中使用
- `.env` 中同时有 `DATABASE_URL`（PostgreSQL）和 `NEXT_PUBLIC_SUPABASE_URL`
- `/api/products` 日志会打印 `DATABASE_URL` 是否 set，但实际用 Supabase 连接

### 3. 图片缺失 ⚠️ 中等
- 所有产品的 `images` 字段为空数组 `[]` 或指向不存在的 `/images/products/*.jpg`
- 产品卡片和详情页显示占位符 "A" logo
- 无 `public/images/` 目录
- `import-scraped.ts` 中部分产品有真实图片 URL（telegraph-image CDN）

### 4. 分类映射不完整 ⚠️ 中等
- Header 下拉菜单硬编码了 8 个分类（bopp-gloss, bopp-matte, bopp-metalized, bopet, bops, cpp, tape, pof）
- DB 中实际有 70+ 个不同 category 值（如 boppfilm-cigarette, bopet-clear, bopa-12mic 等）
- `products/page.tsx` 中的 `getCategoryName()` 映射表仅涵盖 14 个旧分类
- 大部分 DB 产品的 category 在前端无对应中文/英文显示名

### 5. 产品描述为空 ⚠️ 低
- `products-db.json` 中大部分产品的 `descriptionEn`/`descriptionZh` 为空
- 详情页会显示空白描述

### 6. 联系方式不一致 ⚠️ 低
- `pages.json` 中地址为合肥（Huizhou Ave., Hefei）
- `pages-runtime.json` 和 locales 中为苏州（Suzhou）
- Contact 页面默认显示苏州地址

### 7. 管理后台密码硬编码 ⚠️ 安全
- `admin/login/page.tsx` 中硬编码 `aecgroup2024`
- `.env` 有 `ADMIN_PASSWORD` 但未在登录逻辑中使用

---

## 改进建议

### 高优先级
1. **统一数据格式**：将 FeaturedProducts 改为从 API/DB 读取，废弃 `products.ts` 旧格式
2. **统一数据层**：决定使用 Prisma 还是 Supabase（建议 Prisma + PostgreSQL，因 schema 已定义）
3. **修复分类显示**：建立完整的 category → 中英文名称映射表（70+ 个）
4. **填充产品图片**：使用 import-scraped.ts 中的真实图片 URL 或添加占位图

### 中优先级
5. **填充产品描述**：从爬取数据生成 descriptionEn/Zh
6. **统一联系方式**：确定正确地址（合肥 or 苏州），更新所有文件
7. **环境变量管理**：清理未使用的变量，确保 ADMIN_PASSWORD 生效

### 低优先级
8. **SEO 优化**：添加 sitemap.xml、robots.txt
9. **性能**：图片懒加载、next/image 优化
10. **测试**：添加单元测试

---

## ✅ 已完成修复：A. 修复数据一致性（2026-07-19）

**改动文件：**
1. `src/lib/db.ts` — 重写为使用 Prisma（不再依赖 Supabase SDK）
2. `src/lib/api-types.ts` — 新增统一 Product 类型定义（与 DB schema 对齐）
3. `src/lib/api.ts` — 更新导入，使用统一类型
4. `src/components/home/FeaturedProducts.tsx` — 改为从 API 加载真实产品（不再用 `products.ts` 静态数据）
5. `src/components/products/ProductCard.tsx` — 适配新的扁平 Product 格式，支持图片解析
6. `src/app/products/page.tsx` — 补全 `getCategoryName()` 映射（70+ 分类）
7. `src/components/layout/Header.tsx` — 更新下拉菜单分类列表
8. `src/utils/export.ts` — 适配新格式
9. `scripts/` → `scripts-root/`（移出 src/ 避免被 Next.js 编译）
10. `tsconfig.json` — 排除 scripts-root

**验证结果：**
- `next build` 成功编译
- 数据库 163 个产品全部有英文描述
- 134/163 个产品有图片
- API `/api/products` 现在走 Prisma → PostgreSQL

**剩余问题：**
- 29 个产品仍无图片（显示占位符）
- Supabase 相关代码（`lib/supabase.ts`、`lib/visitor-db.ts`）仍存在但未在主链路使用

---

## ✅ 已完成修复：B. 补全分类映射（2026-07-19）

**新增文件：**
- `src/lib/categories.ts` — 统一分类配置（62 个分类，含中英文 + 分组），导出 `CATEGORIES`、`CATEGORY_GROUPS`、`getCategoryName()`

**改动文件：**
- `src/app/products/page.tsx` — 使用共享 categories；**新增 category 过滤功能**（之前只读了 `?search=` 忽略了 `?category=`）；添加分类筛选按钮组
- `src/components/layout/Header.tsx` — 下拉菜单分类改为实际 DB 分类 ID
- `src/components/layout/Footer.tsx` — 产品分类链接改为实际 DB 分类 ID
- `src/components/products/ProductCard.tsx` — 使用共享 `getCategoryName()` 替代内联映射
- `src/app/products/[slug]/page.tsx` — 详情页使用共享 `getCategoryName()` 显示分类中文/英文名

**验证结果：**
- `next build` 通过
- 所有分类链接的 `?category=xxx` 参数与数据库 `Product.category` 字段一致
- 产品列表页现在支持按分类筛选

---

## ✅ 已完成修复：D. 清理残留 + 统一配置（2026-07-19）

### 1. 清理 Supabase 残留
- 删除 `src/lib/supabase.ts`（不再使用）
- 删除 `src/lib/visitor-db.ts`（不再使用）
- 新增 `src/lib/visitor.ts` — 统一用 Prisma 操作 Visitor 表
- 更新 `src/app/api/visitors/route.ts` — 改用 `lib/visitor.ts`

### 2. 统一联系方式（合肥 vs 苏州）
- `src/app/contact/page.tsx` — Suzhou → Hefei 真实地址
- `src/data/pages-runtime.json` — Suzhou → Hefei
- `src/locales/*.json` — 5 种语言的 addressDetail 全部改为合肥地址
- `src/app/api/pages/route.ts` 硬编码的合肥地址保持不变（正确）

### 3. 环境变量管理
- `src/app/admin/login/page.tsx` — 移除硬编码密码，改为调用 `/api/admin/auth`
- 新增 `src/app/api/admin/auth/route.ts` — 服务端验证 `ADMIN_PASSWORD` 环境变量
- 登录页不再显示明文密码提示

**验证结果：**
- `next build` 通过
- 全站搜索 `supabase` 仅剩 `lib/db.ts` 注释中的说明文字
- 全站搜索 `Suzhou` 已无残留
- 后台密码验证走服务端，不再硬编码在客户端

---

## ✅ 已完成修复：C. 填充产品图片（2026-07-19）

### 问题
- 数据库 163 个产品中，134 个有图片（多为 `boppfilmsale-new.vercel.app/images/...` 或 telegraph CDN URL），29 个 `images` 字段为空

### 方案
- 为 29 个无图产品生成 **SVG 占位图**（data URI 格式），显示产品英文名 + 分类名 + AEC Group 标识
- 新增 `src/lib/images.ts` — `parseProductImages()` 统一解析图片字段（支持 JSON 数组 / 逗号分隔 / 单个 URL / data URI）
- 更新 `ProductCard.tsx`、`products/page.tsx`、`[slug]/page.tsx`、`admin/page.tsx` 全部改用统一解析器
- 脚本 `scripts-root/fix-no-images.js` 执行更新（29 条记录已写入数据库）

### 验证
- `next build` 通过
- 数据库 163/163 产品均有图片（29 个为 SVG 占位图）
- 前端解析器兼容所有图片格式

---

## 部署说明

所有改动均在 **本地代码**（`C:\Users\DELL\.qwenpaw\workspaces\default\Blogweb\`），`next build` 编译通过。
**线上 Vercel 站点需重新部署才能生效** —— 将代码 push 到 Git 仓库或手动触发 Vercel 重新构建。

---

## 数据库产品分类清单（70+）

完整列表请运行 `node check_cats.js` 查看。主要类别：
- BOPP 系列：boppfilm-cigarette, boppfilm-printing, boppfilm-capacitor, boppfilm-flower, boppfilm-pearl, boppfilm-metallized, boppfilm-heatseal
- BOPET 系列：bopet-clear, bopet-45mic, bopet-metallized-45, bopet-thermal, bopet-40mic, bopet-38-45mic, bopet-capacitor, bopet-color-vmpet, bopet-insulating, bopet-metallized-6
- BOPA 系列：bopa-12mic, bopa-15mic, bopa-thermal
- BOPS 系列：bops-glossy, bops-matt, bops-shrink, bops-food
- 胶带系列：bopp-tape-jumbo, bopp-tape-finished, printed-bopp-tape, masking-tape-jumbo
- 其他：cpp, pof, pe-cling, pvc-cling, paper, labels, bags, inkjet, wax-resin, adhesive-glue, printing-machines, slitting-machines 等
