-- Fix: Drop and recreate table with correct schema, then seed
DROP TABLE IF EXISTS "Visitor" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "nameEn" TEXT NOT NULL,
    "nameZh" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionZh" TEXT NOT NULL,
    "thickness" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "featuresEn" TEXT NOT NULL,
    "featuresZh" TEXT NOT NULL,
    "applicationsEn" TEXT NOT NULL,
    "applicationsZh" TEXT NOT NULL,
    "certifications" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "referer" TEXT,
    "page" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "device" TEXT,
    "timestamp" TIMESTAMP NOT NULL DEFAULT now()
);

-- Insert products with escaped newlines
INSERT INTO "Product" ("id", "slug", "nameEn", "nameZh", "category", "descriptionEn", "descriptionZh", "thickness", "width", "length", "weight", "color", "material", "featuresEn", "featuresZh", "applicationsEn", "applicationsZh", "certifications", "images", "featured", "createdAt", "updatedAt") VALUES
('1', 'bopp-gloss-15', 'BOPP Gloss Film 15 Micron', 'BOPP光膜 15微米', 'bopp-gloss', 'Ultra-thin BOPP gloss film with 15 micron thickness, featuring exceptional transparency and gloss. Ideal for high-speed printing and precision packaging.', '超薄BOPP光膜，厚度15微米，具有卓越的透明度和光泽度。适用于高速印刷和精密包装。', '15 microns', '200-1200mm', '3000-6000m', 'Customized', 'Transparent', 'Polypropylene', 'Ultra-thin design\nHigh transparency\nExcellent gloss\nHigh-speed printing\nSuperior moisture barrier', '超薄设计\n高透明度\n优异光泽度\n高速印刷适用\n优异防潮性能', 'Food packaging\nPrinting lamination\nLabel making\nGift wrapping', '食品包装\n印刷覆膜\n标签制作\n礼品包装', 'ISO 9001\nFDA\nSGS\nRoHS', '/images/products/bopp-gloss-15.jpg', true, now(), now()),
('2', 'bopp-gloss-18', 'BOPP Gloss Film 18 Micron', 'BOPP光膜 18微米', 'bopp-gloss', 'Standard BOPP gloss film with 18 micron thickness, balancing transparency, strength and printability.', '标准BOPP光膜，厚度18微米，平衡了透明度、强度和印刷适性。', '18 microns', '200-1400mm', '2500-5000m', 'Customized', 'Transparent', 'Polypropylene', 'Standard thickness\nBalanced performance\nGood transparency\nExcellent printability', '标准厚度\n平衡性能\n良好透明度\n优异印刷适性', 'Food packaging\nDaily necessities packaging\nPrinting lamination\nLabel making', '食品包装\n日用品包装\n印刷覆膜\n标签制作', 'ISO 9001\nFDA\nSGS\nRoHS', '/images/products/bopp-gloss-18.jpg', true, now(), now());

CREATE INDEX "idx_product_slug" ON "Product"("slug");
CREATE INDEX "idx_visitor_timestamp" ON "Visitor"("timestamp");
CREATE INDEX "idx_visitor_ip" ON "Visitor"("ip");

ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Visitor" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read products" ON "Product" FOR SELECT USING (true);
CREATE POLICY "Allow service_role all" ON "Product" FOR ALL USING (true);