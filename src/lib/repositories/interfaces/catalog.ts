import type { SaleConditionCode } from '@/lib/regulatory/isp';

export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  path: string;
  level: 1 | 2 | 3;
  sortOrder: number;
  isPharma: boolean;
  parentId: string | null;
  children: CategoryNode[];
}

export interface BrandSummary {
  id: string;
  name: string;
  slug: string;
  featured: boolean;
}

export interface ProductVariantSummary {
  id: string;
  sku: string;
  label: string;
  priceClp: number;
  compareAtClp: number | null;
  stock: number;
  isDefault: boolean;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  activeIngredient: string | null;
  saleCondition: SaleConditionCode;
  maxQtyPerOrder: number;
  isBioequivalent: boolean;
  isFeatured: boolean;
  isPlaceholder: boolean;
  ratingAvg: number;
  ratingCount: number;
  brand: BrandSummary | null;
  imageUrl: string;
  imageAlt: string;
  defaultVariant: ProductVariantSummary;
  categoryPaths: string[];
  primaryCategoryName: string;
}

export interface ProductReviewItem {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ProductDetail extends ProductSummary {
  description: string;
  ispRegistryCode: string | null;
  variants: ProductVariantSummary[];
  images: Array<{ id: string; url: string; alt: string }>;
  reviews: ProductReviewItem[];
  relatedProducts: ProductSummary[];
}

export interface FeaturedCategorySection {
  categorySlug: string;
  title: string;
  subtitle: string;
  ctaHref: string;
  products: ProductSummary[];
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  imageUrl: string;
  isPlaceholder: boolean;
}

export interface DiscountProgramSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  badgeText: string | null;
  discountPct: number | null;
  requiresRut: boolean;
  bodyMdx: string;
  products: ProductSummary[];
}

export interface SearchSuggestionResult {
  products: Array<{
    id: string;
    slug: string;
    name: string;
    brandName: string | null;
    priceClp: number;
    imageUrl: string;
    saleCondition: SaleConditionCode;
    primaryCategoryName: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    path: string;
  }>;
}

export interface CollectionFilterParams {
  categoryPath?: string;
  query?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
  page?: number;
  pageSize?: number;
}

export interface CollectionPageResult {
  category: CategoryNode | null;
  products: ProductSummary[];
  total: number;
  page: number;
  pageSize: number;
  availableBrands: BrandSummary[];
}

export interface CatalogRepository {
  getCategoryTree(): Promise<CategoryNode[]>;
  getCategoryByPath(path: string): Promise<CategoryNode | null>;
  getFeaturedSections(): Promise<FeaturedCategorySection[]>;
  getProductsForCollection(params: CollectionFilterParams): Promise<CollectionPageResult>;
  getProductBySlug(slug: string): Promise<ProductDetail | null>;
  searchSuggestions(query: string, limit?: number): Promise<SearchSuggestionResult>;
  getFeaturedBrands(): Promise<BrandSummary[]>;
  getRecentBlogPosts(limit?: number): Promise<BlogPostSummary[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPostSummary | null>;
  getActivePrograms(): Promise<DiscountProgramSummary[]>;
  getProgramBySlug(slug: string): Promise<DiscountProgramSummary | null>;
  getAllSitemapEntries(): Promise<{
    categoryPaths: string[];
    productSlugs: string[];
    programSlugs: string[];
    blogSlugs: string[];
  }>;
}
