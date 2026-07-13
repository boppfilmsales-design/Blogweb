// Import products from source website to blog
const https = require('https');
const http = require('http');

// Products from source website (167 products)
const products = [
  {
    slug: "1",
    nameEn: "Pe or Bopp Bags",
    nameZh: "Pe或bopp袋子",
    category: "bags-sheets-group",
    descriptionEn: "High-quality bopp film product for industrial and packaging applications.",
    descriptionZh: "",
    thickness: "3-75μm",
    width: "High clarity",
    length: "",
    weight: "",
    color: "",
    material: "Polypropylene",
    featuresEn: "",
    featuresZh: "",
    applicationsEn: "",
    applicationsZh: "",
    certifications: "",
    images: "images/AEC-group-boppfilmsale-PEbag-01.jpg",
    featured: true
  },
  {
    slug: "2",
    nameEn: "Bopp Anti-Fog Film",
    nameZh: "Bopp防雾薄膜",
    category: "boppfilm-printing",
    descriptionEn: "BOPP anti-fog film treated on one or both sides to stop condensation from clouding the pack, keeping fresh produce, meat, seafood and frozen food clearly visible on the shelf.",
    descriptionZh: "BOPP防雾膜经单面或双面防雾处理，可有效防止包装内壁凝露起雾，让新鲜果蔬、肉类、海鲜及冷冻食品在货架上保持清晰可见。",
    thickness: "20-60 microns",
    width: "Thickness 18-35 micron, Single or double-side anti-fog, Heat sealable, Food-contact grade",
    length: "",
    weight: "",
    color: "",
    material: "Polypropylene",
    featuresEn: "Excellent anti-fog and heat sealing properties; high clearness; good puncture resistance performance",
    featuresZh: "",
    applicationsEn: "Used for fresh vegetable, fish, fruit, sushi, flower and so forth",
    applicationsZh: "",
    certifications: "",
    images: "https://484e5af0.telegraph-image-8xr.pages.dev/file/AgACAgUAAyEGAATkLALaAANgak5Kf7GQdMk83PzooLoRZYVB2GcAAvMSaxttEnBWV0HFBBfcwawBAAMCAAN4AAM8BA.jpg",
    featured: true
  },
  {
    slug: "3",
    nameEn: "Bopp Anti Static Film",
    nameZh: "Bopp抗静电薄膜",
    category: "boppfilm-printing",
    descriptionEn: "BOPP anti-static film formulated so the sheet won't cling to itself or attract dust. It is well suited to wrapping textiles and other goods that are sensitive to static build-up and dust pickup during handling.",
    descriptionZh: "BOPP防静电膜经特殊处理，薄膜不会自粘或吸附灰尘。非常适合包装纺织品和其他在处理过程中对静电积累和灰尘吸附敏感的物品。",
    thickness: "25-38 microns",
    width: "200-1200mm",
    length: "",
    weight: "",
    color: "",
    material: "Polypropylene",
    featuresEn: "Anti-static treatment\nDust-free\nTextile packaging suitable",
    featuresZh: "抗静电处理\n无尘\n适合纺织品包装",
    applicationsEn: "Textile packaging\nElectronics wrapping\nDust-free packaging",
    applicationsZh: "纺织品包装\n电子产品包装\n无尘包装",
    certifications: "",
    images: "",
    featured: true
  }
];

async function importProducts() {
  const blogApiUrl = 'https://blogweb-green.vercel.app/api/products/import';
  
  console.log(`Importing ${products.length} products...`);
  
  try {
    const response = await fetch(blogApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products })
    });
    
    const result = await response.json();
    console.log('Import result:', result);
  } catch (error) {
    console.error('Import error:', error.message);
  }
}

importProducts();