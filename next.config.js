/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: "loose",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.wombo.art',
      }
    ]
  }
}

module.exports = nextConfig
