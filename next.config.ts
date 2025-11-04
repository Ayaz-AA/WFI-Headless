import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.workforceinstitute.io',
        pathname: '/**',
      },
    ],
  },
  // Allow loading external scripts and styles from WordPress
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https://backend.workforceinstitute.io http://backend.workforceinstitute.io; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://backend.workforceinstitute.io http://backend.workforceinstitute.io; style-src 'self' 'unsafe-inline' https://backend.workforceinstitute.io http://backend.workforceinstitute.io https://fonts.googleapis.com; img-src 'self' data: https://backend.workforceinstitute.io http://backend.workforceinstitute.io; font-src 'self' data: https://backend.workforceinstitute.io http://backend.workforceinstitute.io https://fonts.gstatic.com https://fonts.googleapis.com; frame-src 'self' https://backend.workforceinstitute.io http://backend.workforceinstitute.io https://www.youtube.com https://youtube.com https://player.vimeo.com https://www.google.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
