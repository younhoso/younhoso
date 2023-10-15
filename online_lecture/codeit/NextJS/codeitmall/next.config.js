/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/products/:id',
        destination: '/items/:id',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
