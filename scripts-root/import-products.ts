import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// 读取爬取的产品数据
const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../products_mapped.json'), 'utf-8'))
const products = rawData.products || []

console.log(`Found ${products.length} products to import`)

// 类别映射：将爬取的类别映射到网站的类别
const categoryMap: Record<string, string> = {
  'boppfilm-printing': 'boppfilm-printing',
  'bopetfilm-printing': 'bopetfilm-printing',
  'bags-sheets-group': 'bags-sheets-group',
  'tear-tape-ribbons': 'tear-tape-ribbons',
  'thermal-transfer-ribbons': 'tear-tape-ribbons',
  'pharmaceutical-intermediates': 'pharmaceutical-intermediates',
  'coating-film': 'coating-film',
  'label-sticker': 'label-sticker',
  'wheels-rims': 'wheels-rims',
  'machinery-equipment': 'machinery-equipment',
  'masks-meltblown': 'masks-meltblown',
  'paper-products': 'paper-products',
  'adhesive-glue': 'adhesive-glue',
  'other-films': 'other-films',
}

function cleanHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function extractFeatures(desc: string): string[] {
  if (!desc) return []
  const features = []
  // 从描述中提取关键特性
  const patterns = [
    /thickness[:\s]+([^<\n;]+)/gi,
    /width[:\s]+([^<\n;]+)/gi,
    /anti-?static/gi,
    /anti-?fog/gi,
    /heat.?seal/gi,
    /food.?contact/gi,
    /high.?clarity/gi,
    /excellent.?barrier/gi,
    /metalli[sz]ed/gi,
    /transparent/gi,
    /matte/gi,
    /glossy/gi,
    /pearl/gi,
    /coated/gi,
    /adhesive/gi,
    /tear.?tape/gi,
    /thermal.?transfer/gi,
    /ribbon/gi,
    /insulat/gi,
    /capacitor/gi,
    /pharmaceutical/gi,
    /grade/gi,
  ]
  
  for (const pat of patterns) {
    const matches = desc.match(pat)
    if (matches) {
      features.push(...matches.map(m => m.trim()))
    }
  }
  
  return [...new Set(features)].slice(0, 8)
}

function generateSlug(name: string, id: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60) + '-' + id.substring(0, 8)
}

async function main() {
  let imported = 0
  let skipped = 0
  let errors = 0

  for (const p of products) {
    try {
      const slug = p.slug || generateSlug(p.nameEn || p.nameZh || '', p.id)
      const category = categoryMap[p.category] || 'other-films'
      
      // 清理描述
      const descEn = cleanHtml(p.descriptionEn || '')
      const descZh = cleanHtml(p.descriptionZh || '')
      
      // 提取特性
      const featuresEn = p.featuresEn ? p.featuresEn.split('\n').map(f => f.trim()).filter(Boolean) : extractFeatures(descEn)
      const featuresZh = p.featuresZh ? p.featuresZh.split('\n').map(f => f.trim()).filter(Boolean) : extractFeatures(descZh)
      
      // 应用
      const appsEn = p.applicationsEn ? p.applicationsEn.split('\n').map(f => f.trim()).filter(Boolean) : []
      const appsZh = p.applicationsZh ? p.applicationsZh.split('\n').map(f => f.trim()).filter(Boolean) : []
      
      // 图片
      let images = p.images || ''
      if (images && !images.startsWith('http') && !images.startsWith('/')) {
        images = '/images/products/' + images
      }
      const imageArray = images ? [images] : ['/images/products/placeholder.jpg']
      
      // 厚度、宽度等规格
      const thickness = p.thickness || 'Customized'
      const width = p.width || 'Customized'
      const length = p.length || 'Customized'
      const weight = p.weight || 'Customized'
      const color = p.color || 'Transparent'
      const material = p.material || (p.nameEn?.includes('BOPP') ? 'BOPP' : p.nameEn?.includes('BOPET') ? 'BOPET' : 'Polymer')
      
      // 检查是否已存在
      const existing = await prisma.product.findUnique({ where: { slug } })
      if (existing) {
        console.log(`⏭️  Skipping existing: ${slug}`)
        skipped++
        continue
      }

      // 创建产品
      await prisma.product.create({
        data: {
          slug,
          nameEn: p.nameEn || p.nameZh || 'Unknown Product',
          nameZh: p.nameZh || p.nameEn || '未知产品',
          category,
          descriptionEn: descEn || `High-quality ${p.nameEn?.toLowerCase() || 'film product'} for industrial and packaging applications.`,
          descriptionZh: descZh || `高质量${p.nameZh?.toLowerCase() || '薄膜产品'}，适用于工业和包装应用。`,
          thickness,
          width,
          length,
          weight,
          color,
          material,
          featuresEn: featuresEn.join('\n'),
          featuresZh: featuresZh.join('\n'),
          applicationsEn: appsEn.join('\n'),
          applicationsZh: appsZh.join('\n'),
          certifications: p.certifications || 'ISO 9001, FDA, SGS, RoHS',
          images: imageArray.join(','),
          featured: p.featured || false,
        }
      })
      
      console.log(`✅ Imported: ${slug} (${p.nameEn || p.nameZh})`)
      imported++
      
    } catch (error) {
      console.error(`❌ Error importing ${p.id}:`, error)
      errors++
    }
  }

  console.log(`\n📊 Summary: ${imported} imported, ${skipped} skipped, ${errors} errors`)
  await prisma.$disconnect()
}

main().catch(console.error)