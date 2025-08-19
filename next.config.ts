import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' && { basePath: '/next-ssr' }),
  trailingSlash: false,
  output: 'standalone',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
