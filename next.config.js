/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure @libsql/client native binding is external (not bundled) for serverless
  experimental: {
    serverComponentsExternalPackages: ['@libsql/client'],
  },
}

module.exports = nextConfig
