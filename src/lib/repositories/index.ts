import { getAppConfig } from '@/lib/config/env';
import type { CatalogRepository } from '@/lib/repositories/interfaces/catalog';
import { PrismaCatalogRepository } from '@/lib/repositories/prisma/catalog-repository';
import { SeedCatalogRepository } from '@/lib/repositories/seed/catalog-repository';
import { ShopifyStorefrontCatalogRepository } from '@/lib/repositories/shopify/catalog-repository';

let cachedRepository: CatalogRepository | null = null;

export function getCatalogRepository(): CatalogRepository {
  if (cachedRepository) return cachedRepository;

  const config = getAppConfig();

  if (config.CATALOG_PROVIDER === 'shopify') {
    const repo = new ShopifyStorefrontCatalogRepository();
    cachedRepository = repo;
    return repo;
  }

  if (config.CATALOG_PROVIDER === 'prisma' && config.DATABASE_URL) {
    const repo = new PrismaCatalogRepository();
    cachedRepository = repo;
    return repo;
  }

  const repo = new SeedCatalogRepository();
  cachedRepository = repo;
  return repo;
}
