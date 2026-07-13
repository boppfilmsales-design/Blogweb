const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  try {
    console.log('Connecting...');
    const count = await prisma.product.count();
    console.log('Connected! Product count:', count);
    const products = await prisma.product.findMany({ take: 3 });
    console.log('Sample products:', JSON.stringify(products, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
