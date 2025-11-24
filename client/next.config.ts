import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // allow all paths under this hostname
      },
      {
        protocol: 'https',
        hostname: 'images.deliveryhero.io',
        port: '',
        pathname: '/**', // allow all paths under this hostname
      },
    ],
  },
}

export default withBundleAnalyzer(nextConfig)
