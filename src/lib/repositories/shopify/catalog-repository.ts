import type {
  BlogPostSummary,
  BrandSummary,
  CatalogRepository,
  CategoryNode,
  CollectionFilterParams,
  CollectionPageResult,
  DiscountProgramSummary,
  FeaturedCategorySection,
  ProductDetail,
  SearchSuggestionResult,
} from '@/lib/repositories/interfaces/catalog';

const NOT_CONFIGURED_ERROR =
  'ShopifyStorefrontCatalogRepository requiere SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN.';

/**
 * Adaptador preparado para migrar la capa de catálogo a Shopify Storefront API
 * sin modificar los Server Components ni la UI.
 */
export class ShopifyStorefrontCatalogRepository implements CatalogRepository {
  async getCategoryTree(): Promise<CategoryNode[]> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getCategoryByPath(): Promise<CategoryNode | null> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getFeaturedSections(): Promise<FeaturedCategorySection[]> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getProductsForCollection(_params: CollectionFilterParams): Promise<CollectionPageResult> {
    void _params;
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getProductBySlug(_slug: string): Promise<ProductDetail | null> {
    void _slug;
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async searchSuggestions(_query: string): Promise<SearchSuggestionResult> {
    void _query;
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getFeaturedBrands(): Promise<BrandSummary[]> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getRecentBlogPosts(): Promise<BlogPostSummary[]> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getBlogPostBySlug(): Promise<BlogPostSummary | null> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getActivePrograms(): Promise<DiscountProgramSummary[]> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getProgramBySlug(): Promise<DiscountProgramSummary | null> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
  async getAllSitemapEntries(): Promise<{
    categoryPaths: string[];
    productSlugs: string[];
    programSlugs: string[];
    blogSlugs: string[];
  }> {
    throw new Error(NOT_CONFIGURED_ERROR);
  }
}
