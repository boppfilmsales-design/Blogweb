const { PrismaClient } = require('@prisma/client');
const { readFileSync } = require('fs');
const { join } = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Read products from JSON file
  const productsPath = join(process.cwd(), 'src', 'data', 'products.json');
  const productsData = readFileSync(productsPath, 'utf-8');
  const products = JSON.parse(productsData);

  // Clear existing data
  await prisma.product.deleteMany();

  // Insert products
  for (const product of products) {
    await prisma.product.create({
      data: {
        id: product.id,
        slug: product.slug,
        nameEn: product.name.en,
        nameZh: product.name.zh,
        category: product.category,
        descriptionEn: product.description.en,
        descriptionZh: product.description.zh,
        thickness: product.specifications.thickness,
        width: product.specifications.width,
        length: product.specifications.length,
        weight: product.specifications.weight,
        color: product.specifications.color,
        material: product.specifications.material,
        featuresEn: JSON.stringify(product.features.en),
        featuresZh: JSON.stringify(product.features.zh),
        applicationsEn: JSON.stringify(product.applications.en),
        applicationsZh: JSON.stringify(product.applications.zh),
        certifications: JSON.stringify(product.certifications),
        images: JSON.stringify(product.images),
        featured: product.featured,
      },
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
