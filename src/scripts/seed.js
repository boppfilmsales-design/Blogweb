const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Read products from TypeScript file (manually converted)
const productsTS = readFileSync(join(__dirname, '..', 'data', 'products.ts'), 'utf-8');

// For now, let's create a simple seed with the key products
const products = [
  {
    id: "1",
    slug: "bopp-gloss-15",
    nameEn: "BOPP Gloss Film 15 Micron",
    nameZh: "BOPP光膜 15微米",
    category: "bopp-gloss",
    descriptionEn: "Ultra-thin BOPP gloss film with 15 micron thickness, featuring exceptional transparency and gloss.",
    descriptionZh: "超薄BOPP光膜，厚度15微米，具有卓越的透明度和光泽度。",
    thickness: "15 microns",
    width: "200-1200mm",
    length: "3000-6000m",
    weight: "Customized",
    color: "Transparent",
    material: "Polypropylene",
    featuresEn: JSON.stringify(["Ultra-thin design", "High transparency", "Excellent gloss"]),
    featuresZh: JSON.stringify(["超薄设计", "高透明度", "优异光泽度"]),
    applicationsEn: JSON.stringify(["Food packaging", "Printing lamination"]),
    applicationsZh: JSON.stringify(["食品包装", "印刷覆膜"]),
    certifications: JSON.stringify(["ISO 9001", "FDA", "SGS"]),
    images: JSON.stringify(["/images/products/bopp-gloss-15.jpg"]),
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "28",
    slug: "bopet-4.5-ttr",
    nameEn: "BOPET TTR Film 4.5 Micron",
    nameZh: "BOPET TTR薄膜 4.5微米",
    category: "bopet",
    descriptionEn: "Ultra-thin BOPET TTR film with 4.5 micron thickness, featuring excellent transparency and thermal transfer properties.",
    descriptionZh: "超薄BOPET TTR薄膜，厚度4.5微米，具有卓越的透明度和热转印性能。",
    thickness: "4.5 microns",
    width: "200-1200mm",
    length: "4000-8000m",
    weight: "Customized",
    color: "Transparent",
    material: "Polyethylene Terephthalate",
    featuresEn: JSON.stringify(["Ultra-thin design", "High transparency", "Excellent thermal transfer"]),
    featuresZh: JSON.stringify(["超薄设计", "高透明度", "优异热转印性能"]),
    applicationsEn: JSON.stringify(["Thermal transfer labels", "High-speed printing"]),
    applicationsZh: JSON.stringify(["热转印标签", "高速印刷"]),
    certifications: JSON.stringify(["ISO 9001", "FDA", "SGS"]),
    images: JSON.stringify(["/images/products/bopet-4.5-ttr.jpg"]),
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "130",
    slug: "pof-4.5",
    nameEn: "BOPET Film 4.5 Micron",
    nameZh: "BOPET薄膜 4.5微米",
    category: "pof",
    descriptionEn: "Ultra-thin BOPET film with 4.5 micron thickness, featuring excellent transparency and shrinkage properties.",
    descriptionZh: "超薄BOPET薄膜，厚度4.5微米，具有卓越的透明度和收缩性能。",
    thickness: "4.5 microns",
    width: "200-1000mm",
    length: "4000-8000m",
    weight: "Customized",
    color: "Transparent",
    material: "Polyethylene Terephthalate",
    featuresEn: JSON.stringify(["Ultra-thin design", "High transparency", "Good shrinkage"]),
    featuresZh: JSON.stringify(["超薄设计", "高透明度", "良好收缩性"]),
    applicationsEn: JSON.stringify(["Heat shrink packaging", "Label making"]),
    applicationsZh: JSON.stringify(["热收缩包装", "标签制作"]),
    certifications: JSON.stringify(["ISO 9001", "FDA", "SGS"]),
    images: JSON.stringify(["/images/products/pof-4.5.jpg"]),
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Write to database file
writeFileSync(
  join(__dirname, '..', 'data', 'products-db.json'),
  JSON.stringify(products, null, 2)
);

console.log(`Seeded ${products.length} products`);
