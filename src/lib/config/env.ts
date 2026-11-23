import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Farmacias Vertical'),
  NEXT_PUBLIC_SITE_URL: z.string().default('http://localhost:3000'),
  STORE_REGULATORY_MODE: z.enum(['PRE_ISP', 'FULL_ISP']).default('PRE_ISP'),
  CATALOG_PROVIDER: z.enum(['prisma', 'seed', 'shopify']).default('prisma'),
  GOOGLE_SHEETS_CSV_URL: z.string().optional(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().default('56900000000'),
  NEXT_PUBLIC_CHAT_PROVIDER: z.enum(['none', 'crisp', 'tawk', 'custom']).default('none'),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
});

export type RegulatoryMode = 'PRE_ISP' | 'FULL_ISP';
export type CatalogProvider = 'prisma' | 'seed' | 'shopify';

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

export function getAppConfig() {
  const siteUrl = resolveSiteUrl();
  const parsed = envSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Farmacias Vertical',
    NEXT_PUBLIC_SITE_URL: siteUrl,
    STORE_REGULATORY_MODE: process.env.STORE_REGULATORY_MODE || 'PRE_ISP',
    CATALOG_PROVIDER: process.env.CATALOG_PROVIDER || 'prisma',
    GOOGLE_SHEETS_CSV_URL: process.env.GOOGLE_SHEETS_CSV_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56900000000',
    NEXT_PUBLIC_CHAT_PROVIDER: process.env.NEXT_PUBLIC_CHAT_PROVIDER || 'none',
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  });

  if (!parsed.success) {
    return {
      DATABASE_URL: undefined,
      NEXT_PUBLIC_SITE_NAME: 'Farmacias Vertical',
      NEXT_PUBLIC_SITE_URL: siteUrl,
      STORE_REGULATORY_MODE: 'PRE_ISP' as RegulatoryMode,
      CATALOG_PROVIDER: 'seed' as CatalogProvider,
      GOOGLE_SHEETS_CSV_URL: undefined,
      NEXT_PUBLIC_WHATSAPP_NUMBER: '56900000000',
      NEXT_PUBLIC_CHAT_PROVIDER: 'none' as const,
      NEXT_PUBLIC_GTM_ID: undefined,
    };
  }

  return parsed.data;
}
