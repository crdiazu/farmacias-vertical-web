import type { MetadataRoute } from 'next';
import { getAppConfig } from '@/lib/config/env';
import { getCatalogRepository } from '@/lib/repositories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { NEXT_PUBLIC_SITE_URL } = getAppConfig();
  const repo = getCatalogRepository();
  const entries = await repo.getAllSitemapEntries();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: NEXT_PUBLIC_SITE_URL, changeFrequency: 'daily', priority: 1.0 },
    { url: `${NEXT_PUBLIC_SITE_URL}/programas`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${NEXT_PUBLIC_SITE_URL}/club`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${NEXT_PUBLIC_SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = entries.categoryPaths.map((path) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/c/${path}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = entries.productSlugs.map((slug) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/p/${slug}`,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const programRoutes: MetadataRoute.Sitemap = entries.programSlugs.map((slug) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/programas/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = entries.blogSlugs.map((slug) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...programRoutes, ...blogRoutes];
}
