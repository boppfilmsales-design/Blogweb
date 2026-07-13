#!/usr/bin/env node
/**
 * Import BOPP products from backup JSON into Supabase via API
 */
const fs = require('fs');
const path = require('path');

const API_URL = 'https://blogweb-green.vercel.app';
const ADMIN_PASSWORD = 'aecgroup2024';

// Read backup data
const backupPath = path.join(__dirname, '..', 'bopp-backup.json');
const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
const products = backup.data.products;

console.log(`📦 Found ${products.length} products to import\n`);

// Transform product to blog format
function transformProduct(p) {
  const slug = p.id || p.nameEn?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `product-${Date.now()}`;
  
  return {
    slug,
    nameEn: p.nameEn || p.name || '',
    nameZh: p.nameZh || '',
    category: p.category || 'other',
    descriptionEn: p.descEn || '',
    descriptionZh: p.descZh || '',
    thickness: p.thickness || p.techSpecs?.[0]?.thickness || '',
    width: p.techSpecs?.[0]?.width || '',
    length: p.techSpecs?.[0]?.length || '',
    weight: p.techSpecs?.[0]?.weight || '',
    color: p.techSpecs?.[0]?.color || '',
    material: p.techSpecs?.[0]?.material || 'Polypropylene',
    featuresEn: Array.isArray(p.specs) ? p.specs.join('\n') : (p.specs || ''),
    featuresZh: p.techSpecsZh || '',
    applicationsEn: p.applicationsEn || '',
    applicationsZh: p.applicationsZh || '',
    certifications: '',
    images: p.image || '',
    featured: false
  };
}

async function importProduct(product) {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    const result = await response.json();
    return { success: !result.error, error: result.error };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function main() {
  let imported = 0;
  let failed = 0;
  
  for (const p of products) {
    const transformed = transformProduct(p);
    const result = await importProduct(transformed);
    
    if (result.success) {
      imported++;
      process.stdout.write(`✅ ${imported}/${products.length} - ${transformed.nameEn}\n`);
    } else {
      failed++;
      console.log(`❌ Failed: ${transformed.nameEn} - ${result.error}`);
    }
    
    // Rate limit: 100ms between requests
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${products.length}`);
}

main().catch(console.error);
