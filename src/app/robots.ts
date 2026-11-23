import type { MetadataRoute } from 'next';
import { getAppConfig } from '@/lib/config/env';

export default function robots(): MetadataRoute.Robots {
  const { NEXT_PUBLIC_SITE_URL } = getAppConfig();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/checkout', '/cuenta', '/propuesta'],
      },
    ],
    sitemap: `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
