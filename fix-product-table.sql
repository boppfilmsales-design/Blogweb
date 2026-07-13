-- 先备份现有数据
CREATE TABLE Product_backup AS SELECT * FROM Product;

-- 删除旧表
DROP TABLE Product;

-- 创建新表，id 为自增主键
CREATE TABLE Product (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  nameEn TEXT NOT NULL DEFAULT '',
  nameZh TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  descriptionEn TEXT NOT NULL DEFAULT '',
  descriptionZh TEXT NOT NULL DEFAULT '',
  thickness TEXT NOT NULL DEFAULT '',
  width TEXT NOT NULL DEFAULT '',
  length TEXT NOT NULL DEFAULT '',
  weight TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '',
  material TEXT NOT NULL DEFAULT '',
  featuresEn TEXT NOT NULL DEFAULT '',
  featuresZh TEXT NOT NULL DEFAULT '',
  applicationsEn TEXT NOT NULL DEFAULT '',
  applicationsZh TEXT NOT NULL DEFAULT '',
  certifications TEXT NOT NULL DEFAULT '',
  images TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 恢复数据
INSERT INTO Product (slug, nameEn, nameZh, category, descriptionEn, descriptionZh, thickness, width, length, weight, color, material, featuresEn, featuresZh, applicationsEn, applicationsZh, certifications, images, featured, "createdAt", "updatedAt")
SELECT slug, nameEn, nameZh, category, descriptionEn, descriptionZh, thickness, width, length, weight, color, material, featuresEn, featuresZh, applicationsEn, applicationsZh, certifications, images, featured, "createdAt", "updatedAt"
FROM Product_backup;

-- 删除备份表
DROP TABLE Product_backup;

-- 启用 RLS（可选）
ALTER TABLE Product ENABLE ROW LEVEL SECURITY;

-- 允许匿名读取
CREATE POLICY "Allow anonymous read" ON Product FOR SELECT USING (true);

-- 允许认证用户操作
CREATE POLICY "Allow authenticated operations" ON Product FOR ALL USING (auth.role() = 'authenticated');