import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/next-ssr',
  assetPrefix: '/next-ssr',
  trailingSlash: false,
  output: 'standalone'
};

export default nextConfig;
