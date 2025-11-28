import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
    ],
    // Allow unoptimized images during development if assets are missing
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
