import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load .env.local
config({ path: '.env.local' });

// Read the products-data.js file
const content = readFileSync('products-data.js', 'utf-8');

// Extract the productsData object
const match = content.match(/var productsData = (\{[\s\S]*\});/);
if (!match) {
  console.error('Could not parse products-data.js');
  process.exit(1);
}

const data = JSON.parse(match[1]);
console.log(`Found ${data.products?.length || 0} products`);

// Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  console.log('Current env:', { url: supabaseUrl, key: supabaseKey ? '***' : 'undefined' });
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface Product {
  id: number;
  slug: string;
  nameEn: string;
  nameZh: string;
  category: string;
  descriptionEn: string;
  descriptionZh: string;
  thickness: string;
  width: string;
  length: string;
  weight: string;
  color: string;
  material: string;
  featuresEn: string;
  featuresZh: string;
  applicationsEn: string;
  applicationsZh: string;
  certifications: string;
  images: string;
  featured: boolean;
  status: string;
  price: string;
  specs: string[];
  detailLink: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function mapCategory(cat: string): string {
  const categoryMap: Record<string, string> = {
    'boppfilm-printing': 'bopp-printing',
    'boppfilm-heatseal': 'bopp-heatseal',
    'boppfilm-flower': 'bopp-flower',
    'boppfilm-pearl': 'bopp-pearl',
    'boppfilm-cigarette': 'bopp-cigarette',
    'boppfilm-metallized': 'bopp-metallized',
    'boppfilm-capacitor': 'bopp-capacitor',
    'bopet-45mic': 'bopet-thermal',
    'bopet-metallized-45': 'bopet-metallized',
    'bopet-clear': 'bopet-clear',
    'bopet-capacitor': 'bopet-capacitor',
    'pvdc-kfilm': 'pvdc-coating',
    'acrylic-coat': 'acrylic-coating',
    'packingtape-cat': 'packing-tape',
    'bags-sheets-group': 'bags-sheets',
  };
  return categoryMap[cat] || cat;
}

async function importProducts() {
  if (!data.products) {
    console.error('No products array found in data');
    process.exit(1);
  }

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const product of data.products) {
    try {
      const slug = generateSlug(product.nameEn);
      
      const productData = {
        slug,
        nameEn: product.nameEn || '',
        nameZh: product.nameZh || '',
        category: mapCategory(product.category || ''),
        descriptionEn: product.descEn || '',
        descriptionZh: product.descZh || '',
        thickness: product.thickness || '',
        width: '',
        length: '',
        weight: '',
        color: '',
        material: 'Polypropylene',
        featuresEn: (product.specs || []).join('\n'),
        featuresZh: '',
        applicationsEn: product.applicationsEn || '',
        applicationsZh: product.applicationsZh || '',
        certifications: '',
        images: product.image || '/images/products/default.jpg',
        featured: product.id <= 10,
        status: product.status || 'active',
        price: product.price || '',
      };

      // Check if product exists by slug
      const { data: existing } = await supabase
        .from('Product')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('Product')
          .update(productData)
          .eq('id', existing.id);
        
        if (error) throw error;
        updated++;
        console.log(`Updated: ${product.nameEn}`);
      } else {
        // Insert new
        const { error } = await supabase
          .from('Product')
          .insert(productData);
        
        if (error) throw error;
        created++;
        console.log(`Created: ${product.nameEn}`);
      }
    } catch (err: any) {
      failed++;
      console.error(`Failed: ${product.nameEn} - ${err.message}`);
    }
  }

  console.log(`\nImport complete:`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Failed: ${failed}`);
}

importProducts();