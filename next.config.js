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
