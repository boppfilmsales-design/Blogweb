const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// 生成 SVG 占位图（data URI），显示产品名 + 分类
function makePlaceholderSVG(nameEn, category) {
  const colors = ['#3B82F6', '#2563EB', '#1D4ED8', '#60A5FA', '#7C3AED', '#0891B2']
  let hash = 0
  for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash)
  const color = colors[Math.abs(hash) % colors.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <circle cx="400" cy="220" r="80" fill="${color}" fill-opacity="0.15"/>
  <text x="400" y="240" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="${color}" text-anchor="middle">A</text>
  <text x="400" y="380" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1E293B" text-anchor="middle">${nameEn.substring(0, 40)}</text>
  <text x="400" y="430" font-family="Arial, sans-serif" font-size="20" fill="#64748B" text-anchor="middle">${category}</text>
  <text x="400" y="500" font-family="Arial, sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">AEC Group</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

async function main() {
  try {
    const noImg = await prisma.product.findMany({
      where: { images: '' },
      select: { id: true, slug: true, nameEn: true, category: true }
    })

    console.log(`Found ${noImg.length} products without images\n`)

    let updated = 0
    for (const p of noImg) {
      const placeholder = makePlaceholderSVG(p.nameEn, p.category)
      await prisma.product.update({
        where: { id: p.id },
        data: { images: placeholder }
      })
      updated++
      console.log(`  ✓ ${p.slug}`)
    }

    console.log(`\nUpdated ${updated} products with placeholder images`)
  } catch (e) {
    console.error('Error:', e.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()
