import { normalizeText } from '@/lib/chile/format';
import {
  buildCategoryTree,
  SEED_BLOG_POSTS,
  SEED_BRANDS,
  SEED_CATEGORIES_FLAT,
  SEED_PRODUCTS,
  SEED_PROGRAMS,
} from '@/lib/data/seed-catalog';
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
  ProductSummary,
  SearchSuggestionResult,
} from '@/lib/repositories/interfaces/catalog';

function toSummary(p: ProductDetail): ProductSummary {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortDescription: p.shortDescription,
    activeIngredient: p.activeIngredient,
    saleCondition: p.saleCondition,
    maxQtyPerOrder: p.maxQtyPerOrder,
    isBioequivalent: p.isBioequivalent,
    isFeatured: p.isFeatured,
    isPlaceholder: p.isPlaceholder,
    ratingAvg: p.ratingAvg,
    ratingCount: p.ratingCount,
    brand: p.brand,
    imageUrl: p.imageUrl,
    imageAlt: p.imageAlt,
    defaultVariant: p.defaultVariant,
    categoryPaths: p.categoryPaths,
    primaryCategoryName: p.primaryCategoryName,
  };
}

function findNodeByPath(nodes: CategoryNode[], path: string): CategoryNode | null {
  for (const node of nodes) {
    if (node.path === path) return node;
    const found = findNodeByPath(node.children, path);
    if (found) return found;
  }
  return null;
}

export class SeedCatalogRepository implements CatalogRepository {
  private readonly tree: CategoryNode[] = buildCategoryTree(SEED_CATEGORIES_FLAT);

  async getCategoryTree(): Promise<CategoryNode[]> {
    return this.tree;
  }

  async getCategoryByPath(path: string): Promise<CategoryNode | null> {
    return findNodeByPath(this.tree, path);
  }

  async getFeaturedSections(): Promise<FeaturedCategorySection[]> {
    const byCategory = (prefix: string) =>
      SEED_PRODUCTS.filter((p) => p.categoryPaths.some((cp) => cp.startsWith(prefix))).map(
        toSummary,
      );

    return [
      {
        categorySlug: 'dermocosmetica',
        title: 'Dermocosmética destacada',
        subtitle: 'Cuidado facial, hidratación y fotoprotección diaria (productos de muestra)',
        ctaHref: '/c/dermocosmetica',
        products: byCategory('dermocosmetica'),
      },
      {
        categorySlug: 'cuidado-capilar',
        title: 'Cuidado capilar',
        subtitle: 'Shampoos dermatológicos, óleos y fortalecimiento capilar',
        ctaHref: '/c/cuidado-capilar',
        products: byCategory('cuidado-capilar'),
      },
      {
        categorySlug: 'cuidado-personal',
        title: 'Cuidado personal e insumos',
        subtitle: 'Afeitado, antisépticos y botiquín esencial para el hogar',
        ctaHref: '/c/cuidado-personal',
        products: byCategory('cuidado-personal'),
      },
      {
        categorySlug: 'vitaminas-bienestar',
        title: 'Vitaminas y bienestar',
        subtitle: 'Suplementos, minerales y probióticos de uso cotidiano',
        ctaHref: '/c/vitaminas-bienestar',
        products: byCategory('vitaminas-bienestar'),
      },
      {
        categorySlug: 'medicamentos',
        title: 'Medicamentos en mesón (acreditación ISP en curso)',
        subtitle:
          'Catálogo referencial para consulta presencial y verificación de condiciones de venta DS 466',
        ctaHref: '/c/medicamentos',
        products: byCategory('medicamentos'),
      },
    ];
  }

  async getProductsForCollection(params: CollectionFilterParams): Promise<CollectionPageResult> {
    const category = params.categoryPath ? await this.getCategoryByPath(params.categoryPath) : null;
    let list = [...SEED_PRODUCTS];

    if (params.categoryPath) {
      const target = params.categoryPath;
      list = list.filter((p) =>
        p.categoryPaths.some((cp) => cp === target || cp.startsWith(`${target}/`)),
      );
    }

    if (params.query) {
      const q = normalizeText(params.query);
      list = list.filter((p) => {
        const hay = normalizeText(
          `${p.name} ${p.brand?.name ?? ''} ${p.activeIngredient ?? ''} ${p.primaryCategoryName}`,
        );
        return hay.includes(q);
      });
    }

    const availableBrandIds = new Set(list.map((p) => p.brand?.id).filter(Boolean));
    const availableBrands = SEED_BRANDS.filter((b) => availableBrandIds.has(b.id));

    if (params.brandSlug) {
      list = list.filter((p) => p.brand?.slug === params.brandSlug);
    }
    if (typeof params.minPrice === 'number') {
      const min = params.minPrice;
      list = list.filter((p) => p.defaultVariant.priceClp >= min);
    }
    if (typeof params.maxPrice === 'number') {
      const max = params.maxPrice;
      list = list.filter((p) => p.defaultVariant.priceClp <= max);
    }
    if (params.inStockOnly) {
      list = list.filter((p) => p.defaultVariant.stock > 0);
    }

    switch (params.sort) {
      case 'price-asc':
        list.sort((a, b) => a.defaultVariant.priceClp - b.defaultVariant.priceClp);
        break;
      case 'price-desc':
        list.sort((a, b) => b.defaultVariant.priceClp - a.defaultVariant.priceClp);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name, 'es-CL'));
        break;
      default:
        list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        break;
    }

    const pageSize = Math.max(1, params.pageSize ?? 12);
    const page = Math.max(1, params.page ?? 1);
    const start = (page - 1) * pageSize;

    return {
      category,
      products: list.slice(start, start + pageSize).map(toSummary),
      total: list.length,
      page,
      pageSize,
      availableBrands,
    };
  }

  async getProductBySlug(slug: string): Promise<ProductDetail | null> {
    const product = SEED_PRODUCTS.find((p) => p.slug === slug);
    if (!product) return null;

    const rootCat = product.categoryPaths[0] ?? '';
    const relatedProducts = SEED_PRODUCTS.filter(
      (p) => p.id !== product.id && p.categoryPaths.some((cp) => cp.startsWith(rootCat)),
    )
      .slice(0, 4)
      .map(toSummary);

    return { ...product, relatedProducts };
  }

  async searchSuggestions(query: string, limit = 6): Promise<SearchSuggestionResult> {
    const q = normalizeText(query);
    if (q.length < 2) {
      return { products: [], categories: [] };
    }

    const matchedProducts = SEED_PRODUCTS.filter((p) => {
      const hay = normalizeText(
        `${p.name} ${p.brand?.name ?? ''} ${p.activeIngredient ?? ''} ${p.primaryCategoryName}`,
      );
      return hay.includes(q);
    })
      .slice(0, limit)
      .map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        brandName: p.brand?.name ?? null,
        priceClp: p.defaultVariant.priceClp,
        imageUrl: p.imageUrl,
        saleCondition: p.saleCondition,
        primaryCategoryName: p.primaryCategoryName,
      }));

    const matchedCategories = SEED_CATEGORIES_FLAT.filter((c) => normalizeText(c.name).includes(q))
      .slice(0, 4)
      .map((c) => ({ id: c.id, name: c.name, path: c.path }));

    return { products: matchedProducts, categories: matchedCategories };
  }

  async getFeaturedBrands(): Promise<BrandSummary[]> {
    return SEED_BRANDS.filter((b) => b.featured);
  }

  async getRecentBlogPosts(limit = 3): Promise<BlogPostSummary[]> {
    return SEED_BLOG_POSTS.slice(0, limit);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPostSummary | null> {
    return SEED_BLOG_POSTS.find((b) => b.slug === slug) ?? null;
  }

  async getActivePrograms(): Promise<DiscountProgramSummary[]> {
    return SEED_PROGRAMS;
  }

  async getProgramBySlug(slug: string): Promise<DiscountProgramSummary | null> {
    return SEED_PROGRAMS.find((p) => p.slug === slug) ?? null;
  }

  async getAllSitemapEntries() {
    return {
      categoryPaths: SEED_CATEGORIES_FLAT.map((c) => c.path),
      productSlugs: SEED_PRODUCTS.map((p) => p.slug),
      programSlugs: SEED_PROGRAMS.map((p) => p.slug),
      blogSlugs: SEED_BLOG_POSTS.map((b) => b.slug),
    };
  }
}
