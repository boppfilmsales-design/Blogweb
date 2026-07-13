// Import script for products
const https = require('https');

const products = [
  {
    slug: "bopp-gloss-15",
    nameEn: "BOPP Gloss Film 15 Micron",
    nameZh: "BOPP光膜 15微米",
    category: "bopp-gloss",
    descriptionEn: "Ultra-thin BOPP gloss film with 15 micron thickness, featuring exceptional transparency and gloss. Ideal for high-speed printing and precision packaging.",
    descriptionZh: "超薄BOPP光膜，厚度15微米，具有卓越的透明度和光泽度。适用于高速印刷和精密包装。",
    thickness: "15 microns",
    width: "200-1200mm",
    length: "3000-6000m",
    weight: "Customized",
    color: "Transparent",
    material: "Polypropylene",
    featuresEn: "Ultra-thin design\nHigh transparency\nExcellent gloss\nHigh-speed printing\nSuperior moisture barrier",
    featuresZh: "超薄设计\n高透明度\n优异光泽度\n高速印刷适用\n优异防潮性能",
    applicationsEn: "Food packaging\nPrinting lamination\nLabel making\nGift wrapping",
    applicationsZh: "食品包装\n印刷覆膜\n标签制作\n礼品包装",
    certifications: "ISO 9001\nFDA\nSGS\nRoHS",
    images: "/images/products/bopp-gloss-15.jpg",
    featured: true
  }
];

console.log('Import script ready. Products count:', products.length);