const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = require('path').join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  const idx = line.indexOf('=');
  if (idx > 0) {
    const key = line.substring(0, idx).trim();
    let val = line.substring(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', SUPABASE_URL);
console.log('Key:', ANON_KEY ? 'loaded' : 'missing');

// Read products-data.js
const content = fs.readFileSync(path.join(__dirname, 'products-data.js'), 'utf-8');
const match = content.match(/var productsData = (\{[\s\S]*\});/);
if (!match) {
  console.error('Could not parse products-data.js');
  process.exit(1);
}

const data = JSON.parse(match[1]);
const products = data.products || [];
console.log('Found', products.length, 'products');

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function supabaseRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'apikey': ANON_KEY,
        'Authorization': 'Bearer ' + ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
        } else {
          reject(new Error('HTTP ' + res.statusCode + ': ' + data));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  let created = 0, updated = 0, failed = 0;

  for (const p of products) {
    try {
      const slug = generateSlug(p.nameEn);
      const productData = {
        slug: slug,
        nameEn: p.nameEn || '',
        nameZh: p.nameZh || '',
        category: p.category || '',
        descriptionEn: (p.descEn || '').replace(/<[^>]*>/g, '').substring(0, 2000),
        descriptionZh: (p.descZh || '').replace(/<[^>]*>/g, '').substring(0, 2000),
        thickness: p.thickness || '',
        width: '',
        length: '',
        weight: '',
        color: '',
        material: 'Polypropylene',
        featuresEn: (p.specs || []).join('\n'),
        featuresZh: '',
        applicationsEn: '',
        applicationsZh: '',
        certifications: '',
        images: p.image || '/images/products/default.jpg',
        featured: p.id <= 10,
      };

      const searchUrl = SUPABASE_URL + '/rest/v1/Product?slug=eq.' + encodeURIComponent(slug) + '&select=id';
      const existing = await supabaseRequest('GET', searchUrl);

      if (existing.data && existing.data.length > 0) {
        const updateUrl = SUPABASE_URL + '/rest/v1/Product?id=eq.' + existing.data[0].id;
        await supabaseRequest('PATCH', updateUrl, productData);
        updated++;
      } else {
        const insertUrl = SUPABASE_URL + '/rest/v1/Product';
        await supabaseRequest('POST', insertUrl, productData);
        created++;
      }
      
      if ((created + updated) % 20 === 0) {
        console.log('Progress:', created, 'created,', updated, 'updated');
      }
    } catch (err) {
      failed++;
      console.error('Failed:', p.nameEn, '-', err.message.substring(0, 100));
    }
  }

  console.log('\n=== Import Complete ===');
  console.log('Created:', created);
  console.log('Updated:', updated);
  console.log('Failed:', failed);
}

main();
