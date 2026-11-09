-- Blogweb D1 schema (SQLite) — replaces the Prisma PostgreSQL schema
-- (prisma/schema.prisma is kept in the repo as reference only).
--
-- Apply to the remote database with:
--   npx wrangler d1 execute blogweb-db --remote --file=d1-schema.sql
-- Apply to the local dev database with:
--   npx wrangler d1 execute blogweb-db --local --file=d1-schema.sql
--
-- Notes vs PostgreSQL:
--   * All ids are TEXT (the seed data uses string ids "1".."167").
--   * Timestamps are TEXT in ISO 8601 format (new Date().toISOString()).
--   * featured is INTEGER 0/1 (SQLite has no BOOLEAN).

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
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
  featured INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products (featured);

CREATE TABLE IF NOT EXISTS visitors (
  id TEXT PRIMARY KEY,
  ip TEXT NOT NULL DEFAULT '',
  userAgent TEXT NOT NULL DEFAULT '',
  referer TEXT,
  page TEXT NOT NULL DEFAULT '',
  country TEXT,
  city TEXT,
  browser TEXT,
  os TEXT,
  device TEXT,
  timestamp TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_visitors_timestamp ON visitors (timestamp);
CREATE INDEX IF NOT EXISTS idx_visitors_ip ON visitors (ip);
