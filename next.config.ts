import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    // 完全禁用图片优化以解决生产环境缓存问题
    unoptimized: true,
    // 禁用图片缓存
    minimumCacheTTL: 0,
    // 添加本地路径支持
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // 生成sitemap
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

export default nextConfig;
