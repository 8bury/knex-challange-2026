import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'knex.zernis.space',
      },
    ],
  },
}

export default nextConfig
