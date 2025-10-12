import type { NextConfig } from "next";

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
};

export default nextConfig;
