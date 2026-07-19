import { prisma } from '../lib/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

async function main() {
  // 读取 JSON 数据
  const productsFile = join(process.cwd(), 'src', 'data', 'products.json');
  const rawData = readFileSync(productsFile, 'utf-8');
  const products = JSON.parse(rawData);

  // 转换数据格式
  const formattedProducts = products.map((p: any) => ({
    id: p.id?.toString() || undefined,
    slug: p.slug,
    nameEn: p.name?.en || p.nameEn,
    nameZh: p.name?.zh || p.nameZh,
    category: p.category,
    descriptionEn: typeof p.description?.en === 'string' ? p.description.en : p.descriptionEn,
    descriptionZh: typeof p.description?.zh === 'string' ? p.description.zh : p.descriptionZh,
    thickness: p.specifications?.thickness || p.thickness,
    width: p.specifications?.width || p.width,
    length: p.specifications?.length || p.length,
    weight: p.specifications?.weight || p.weight,
    color: p.specifications?.color || p.color,
    material: p.specifications?.material || p.material,
    featuresEn: Array.isArray(p.features?.en) ? p.features.en.join('\n') : p.featuresEn,
    featuresZh: Array.isArray(p.features?.zh) ? p.features.zh.join('\n') : p.featuresZh,
    applicationsEn: Array.isArray(p.applications?.en) ? p.applications.en.join('\n') : p.applicationsEn,
    applicationsZh: Array.isArray(p.applications?.zh) ? p.applications.zh.join('\n') : p.applicationsZh,
    certifications: Array.isArray(p.certifications) ? p.certifications.join('\n') : p.certifications,
    images: Array.isArray(p.images) ? p.images.join('\n') : p.images,
    featured: p.featured ?? false,
  }));

  // 批量插入
  for (const product of formattedProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    console.log(`✓ ${product.nameEn || product.nameZh}`);
  }

  console.log('\n✅ All products seeded!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });