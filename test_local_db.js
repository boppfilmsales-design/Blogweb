const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.product.count()
  .then(n => { console.log('Local DB count:', n); return p.$disconnect(); })
  .catch(e => { console.log('Local err:', e.message.substring(0, 150)); return p.$disconnect(); });
