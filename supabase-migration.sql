-- Supabase Migration SQL
-- Run this in Supabase SQL Editor to initialize database

-- Create extensions for UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Product table
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
    "updatedAt" TIMESTAMP NOT NULL
);

-- Create Visitor table  
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
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

-- Create indexes
CREATE INDEX IF NOT EXISTS "idx_product_slug" ON "Product"("slug");
CREATE INDEX IF NOT EXISTS "idx_visitor_timestamp" ON "Visitor"("timestamp");
CREATE INDEX IF NOT EXISTS "idx_visitor_ip" ON "Visitor"("ip");

-- Enable Row Level Security (optional, for public access)
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Visitor" ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read products" ON "Product" FOR SELECT USING (true);

-- Allow service_role full access
CREATE POLICY "Allow service_role all" ON "Product" FOR ALL USING (true);