const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Read the original products.ts file
const productsTS = readFileSync(join(__dirname, '..', 'data', 'products.ts'), 'utf-8');

// Extract products using a more robust approach
const products = [];

// Find the products array start
const startIndex = productsTS.indexOf('export const products: Product[] = [');
if (startIndex === -1) {
  console.error('Could not find products array in products.ts');
  process.exit(1);
}

// Extract each product object
let depth = 0;
let currentProduct = '';
let inProduct = false;

for (let i = startIndex; i < productsTS.length; i++) {
  const char = productsTS[i];

  if (char === '{') {
    depth++;
    if (depth === 1) {
      inProduct = true;
      currentProduct = '';
    }
  }

  if (inProduct) {
    currentProduct += char;
  }

  if (char === '}') {
    depth--;
    if (depth === 0 && inProduct) {
      // Parse the product
      try {
        // Extract fields using regex
        const idMatch = currentProduct.match(/id:\s*'([^']+)'/);
        const slugMatch = currentProduct.match(/slug:\s*'([^']+)'/);
        const categoryMatch = currentProduct.match(/category:\s*'([^']+)'/);
        const featuredMatch = currentProduct.match(/featured:\s*(true|false)/);

        if (idMatch && slugMatch) {
          // Extract name (first en and zh values)
          const nameEnMatch = currentProduct.match(/en:\s*'([^']+)'/);
          const nameZhMatch = currentProduct.match(/zh:\s*'([^']+)'/);

          // Extract description (first en and zh values after descriptionEn/descriptionZh)
          const descEnMatch = currentProduct.match(/descriptionEn:\s*\{[\s\S]*?en:\s*'([^']+)'/);
          const descZhMatch = currentProduct.match(/descriptionEn:\s*\{[\s\S]*?zh:\s*'([^']+)'/);

          // Extract specifications
          const thicknessMatch = currentProduct.match(/thickness:\s*'([^']+)'/);
          const widthMatch = currentProduct.match(/width:\s*'([^']+)'/);
          const lengthMatch = currentProduct.match(/length:\s*'([^']+)'/);
          const weightMatch = currentProduct.match(/weight:\s*'([^']+)'/);
          const colorMatch = currentProduct.match(/color:\s*'([^']+)'/);
          const materialMatch = currentProduct.match(/material:\s*'([^']+)'/);

          // Extract features (first en and zh arrays)
          const featuresEnMatch = currentProduct.match(/featuresEn:\s*\[([^\]]*)\]/);
          const featuresZhMatch = currentProduct.match(/featuresZh:\s*\[([^\]]*)\]/);

          // Extract applications (first en and zh arrays)
          const appsEnMatch = currentProduct.match(/applicationsEn:\s*\[([^\]]*)\]/);
          const appsZhMatch = currentProduct.match(/applicationsZh:\s*\[([^\]]*)\]/);

          // Extract certifications
          const certsMatch = currentProduct.match(/certifications:\s*\[([^\]]*)\]/);

          // Extract images
          const imagesMatch = currentProduct.match(/images:\s*\[([^\]]*)\]/);

          products.push({
            id: idMatch[1],
            slug: slugMatch[1],
            nameEn: nameEnMatch ? nameEnMatch[1] : '',
            nameZh: nameZhMatch ? nameZhMatch[1] : '',
            category: categoryMatch ? categoryMatch[1] : '',
            descriptionEn: descEnMatch ? descEnMatch[1] : '',
            descriptionZh: descZhMatch ? descZhMatch[1] : '',
            thickness: thicknessMatch ? thicknessMatch[1] : '',
            width: widthMatch ? widthMatch[1] : '',
            length: lengthMatch ? lengthMatch[1] : '',
            weight: weightMatch ? weightMatch[1] : '',
            color: colorMatch ? colorMatch[1] : '',
            material: materialMatch ? materialMatch[1] : '',
            featuresEn: featuresEnMatch ? `[${featuresEnMatch[1]}]` : '[]',
            featuresZh: featuresZhMatch ? `[${featuresZhMatch[1]}]` : '[]',
            applicationsEn: appsEnMatch ? `[${appsEnMatch[1]}]` : '[]',
            applicationsZh: appsZhMatch ? `[${appsZhMatch[1]}]` : '[]',
            certifications: certsMatch ? `[${certsMatch[1]}]` : '[]',
            images: imagesMatch ? `[${imagesMatch[1]}]` : '[]',
            featured: featuredMatch ? featuredMatch[1] === 'true' : false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      } catch (e) {
        console.error('Error parsing product:', e.message);
      }
      inProduct = false;
      currentProduct = '';
    }
  }

  if (depth < 0) break;
}

console.log(`Parsed ${products.length} products from products.ts`);

// Write to database file
writeFileSync(
  join(__dirname, '..', 'data', 'products-db.json'),
  JSON.stringify(products, null, 2)
);

console.log(`Seeded ${products.length} products to database`);
