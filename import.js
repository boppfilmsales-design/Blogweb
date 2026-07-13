// Import products from source website
const https = require('https');

// Fetch products from source website
async function fetchProducts() {
  const url = 'https://boppfilmsale-new.vercel.app/products-data.js';
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        // Extract productsData from the JS file
        const match = data.match(/var productsData = (\{[\s\S]*\});/);
        if (match) {
          const productsData = eval('(' + match[1] + ')');
          resolve(productsData.products);
        } else {
          reject(new Error('Could not parse productsData'));
        }
      });
    }).on('error', reject);
  });
}

// Transform products to blog format
function transformProduct(p) {
  return {
    slug: String(p.id),
    nameEn: p.nameEn || p.name,
    nameZh: p.nameZh,
    category: p.category || 'bopp-film',
    descriptionEn: p.descEn ? p.descEn.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 1000) : '',
    descriptionZh: p.descZh ? p.descZh.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 1000) : '',
    thickness: p.thickness || '',
    width: Array.isArray(p.specs) ? p.specs.join(', ') : String(p.specs || ''),
    length: '',
    weight: '',
    color: '',
    material: 'Polypropylene',
    featuresEn: p.techSpecs ? p.techSpecs.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 500) : '',
    featuresZh: p.techSpecsZh || '',
    applicationsEn: p.applicationsEn ? p.applicationsEn.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 500) : '',
    applicationsZh: p.applicationsZh || '',
    certifications: '',
    images: p.image || '',
    featured: true
  };
}

// Import products to blog API
async function importProducts(products) {
  const blogApiUrl = 'https://blogweb-green.vercel.app/api/products/import';
  
  console.log(`Importing ${products.length} products...`);
  
  const response = await fetch(blogApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products })
  });
  
  return await response.json();
}

// Main
async function main() {
  try {
    console.log('Fetching products from source website...');
    const rawProducts = await fetchProducts();
    console.log(`Found ${rawProducts.length} products`);
    
    console.log('Transforming products...');
    const transformedProducts = rawProducts.map(transformProduct);
    console.log(`Transformed ${transformedProducts.length} products`);
    
    console.log('Importing to blog...');
    const result = await importProducts(transformedProducts);
    console.log('Import result:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();