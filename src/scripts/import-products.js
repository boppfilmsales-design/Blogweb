const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Read the original products.ts file
const productsTS = readFileSync(join(__dirname, '..', 'data', 'products.ts'), 'utf-8');

// Extract products array using regex (simplified parser)
const products = [];
const productRegex = /\{[\s\S]*?\n\s*\}/g;
const matches = productsTS.match(productRegex) || [];

// Parse each product (simplified - just extract key fields)
for (const match of matches) {
  const idMatch = match.match(/id:\s*'([^']+)'/);
  const slugMatch = match.match(/slug:\s*'([^']+)'/);
  const categoryMatch = match.match(/category:\s*'([^']+)'/);
  const featuredMatch = match.match(/featured:\s*(true|false)/);

  if (idMatch && slugMatch) {
    // Extract name
    const nameEnMatch = match.match(/en:\s*'([^']+)'/);
    const nameZhMatch = match.match(/zh:\s*'([^']+)'/);

    // Extract description
    const descEnMatch = match.match(/descriptionEn:\s*\{[\s\S]*?en:\s*'([^']+)'/);
    const descZhMatch = match.match(/descriptionEn:\s*\{[\s\S]*?zh:\s*'([^']+)'/);

    // Extract specifications
    const thicknessMatch = match.match(/thickness:\s*'([^']+)'/);
    const widthMatch = match.match(/width:\s*'([^']+)'/);
    const lengthMatch = match.match(/length:\s*'([^']+)'/);
    const weightMatch = match.match(/weight:\s*'([^']+)'/);
    const colorMatch = match.match(/color:\s*'([^']+)'/);
    const materialMatch = match.match(/material:\s*'([^']+)'/);

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
      featuresEn: '[]',
      featuresZh: '[]',
      applicationsEn: '[]',
      applicationsZh: '[]',
      certifications: '[]',
      images: '[]',
      featured: featuredMatch ? featuredMatch[1] === 'true' : false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
}

console.log(`Found ${products.length} products`);

// Write to database file
writeFileSync(
  join(__dirname, '..', 'data', 'products-db.json'),
  JSON.stringify(products, null, 2)
);

console.log(`Imported ${products.length} products to database`);
