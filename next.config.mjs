/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Allow images from same origin
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Powered-By',
            value: 'PHP/8.1.0',
          },
          {
            key: 'Server',
            value: 'Apache/2.4.52 (Ubuntu)',
          },
        ],
      },
    ]
  },
}

export default nextConfig
