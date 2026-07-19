/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure Prisma client and its native engine are bundled with serverless functions (Next 14)
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', '.prisma/client'],
  },
}

module.exports = nextConfig
