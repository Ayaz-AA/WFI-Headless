import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
      // WordPress backend for media files
      {
        protocol: 'https',
        hostname: 'backend.workforceinstitute.io',
        pathname: '/wp-content/uploads/**',
      },
      // Gravatar for author avatars
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
      // CDN domain (if you use one in the future)
      {
        protocol: 'https',
        hostname: 'cdn.workforceinstitute.io',
        pathname: '/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
