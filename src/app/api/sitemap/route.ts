import { NextResponse } from 'next/server';
import { mockPosts } from '@/lib/data';

export async function GET() {
  const baseUrl = 'https://ainovalife.com';
  
  const staticPages = [
    { url: '', changefreq: 'weekly', priority: 1, lastmod: undefined },
    { url: '/about', changefreq: 'monthly', priority: 0.8, lastmod: undefined },
    { url: '/archive', changefreq: 'weekly', priority: 0.9, lastmod: undefined },
    { url: '/subscribe', changefreq: 'monthly', priority: 0.7, lastmod: undefined },
    { url: '/contact', changefreq: 'monthly', priority: 0.7, lastmod: undefined },
  ];

  const categoryPages = [
    { url: '/category/ai', changefreq: 'weekly', priority: 0.9, lastmod: undefined },
    { url: '/category/nova', changefreq: 'weekly', priority: 0.9, lastmod: undefined },
    { url: '/category/life', changefreq: 'weekly', priority: 0.9, lastmod: undefined },
  ];

  const postPages = mockPosts.map(post => ({
    url: `/posts/${post.slug}`,
    changefreq: 'monthly' as const,
    priority: 0.8,
    lastmod: post.updatedAt.toISOString(),
  }));

  const allPages = [...staticPages, ...categoryPages, ...postPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages.map(page => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
          ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
        </url>
      `).join('')}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}