/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages 配置
  basePath: '/Blogweb',
  assetPrefix: '/Blogweb/',
}

module.exports = nextConfig

// 网站配置信息
export const siteConfig = {
  // 联系邮箱
  email: 'sale@boppfilmsale.com',
  // 默认语言
  defaultLocale: 'en',
  // 网站标题
  title: 'BOPP Films Sale - Professional Packaging Film Supplier',
  // 网站描述
  description: 'Professional supplier of BOPP, BOPET, BOPS, CPP films and tape products for packaging industry.',
}
