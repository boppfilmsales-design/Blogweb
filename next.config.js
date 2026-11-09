/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

// Cloudflare Pages build (@cloudflare/next-on-pages).
// The previous OpenNext dev init (initOpenNextCloudflareForDev) was removed:
// it only applies to the Workers/OpenNext route, not to Pages.
module.exports = nextConfig
