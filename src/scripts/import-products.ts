import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const raw = require('fs').readFileSync('scraped-products.json', 'utf8');
  const products = JSON.parse(raw);
  
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        nameEn: p.nameEn,
        nameZh: p.nameZh,
        category: p.category,
        descriptionEn: p.descriptionEn,
        descriptionZh: p.descriptionZh || '',
        thickness: p.thickness || '',
        width: p.width || '',
        length: p.length || '',
        weight: p.weight || '',
        color: p.color || '',
        material: p.material || '',
        featuresEn: p.featuresEn || '',
        featuresZh: p.featuresZh || '',
        applicationsEn: p.applicationsEn || '',
        applicationsZh: p.applicationsZh || '',
        certifications: p.certifications || '',
        images: p.images || '',
        featured: p.featured || false,
        updatedAt: new Date(),
      },
      create: {
        slug: p.slug,
        nameEn: p.nameEn,
        nameZh: p.nameZh,
        category: p.category,
        descriptionEn: p.descriptionEn,
        descriptionZh: p.descriptionZh || '',
        thickness: p.thickness || '',
        width: p.width || '',
        length: p.length || '',
        weight: p.weight || '',
        color: p.color || '',
        material: p.material || '',
        featuresEn: p.featuresEn || '',
        featuresZh: p.featuresZh || '',
        applicationsEn: p.applicationsEn || '',
        applicationsZh: p.applicationsZh || '',
        certifications: p.certifications || '',
        images: p.images || '',
        featured: p.featured || false,
      },
    });
  }
  
  console.log(`Imported ${products.length} products`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
