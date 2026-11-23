import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { SEED_BLOG_POSTS } from '@/lib/data/seed-catalog';
import { SeedCatalogRepository } from '@/lib/repositories/seed/catalog-repository';
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
import type { SaleConditionCode } from '@/lib/regulatory/isp';

const productSummaryInclude = {
  brand: true,
  variants: { orderBy: { isDefault: 'desc' as const } },
  images: { orderBy: { sortOrder: 'asc' as const } },
  categories: { include: { category: true } },
};

type PrismaProductWithRels = Prisma.ProductGetPayload<{
  include: typeof productSummaryInclude;
}>;

function mapPrismaProductToSummary(p: PrismaProductWithRels): ProductSummary {
  const defaultVariant = p.variants.find((v) => v.isDefault) ??
    p.variants[0] ?? {
      id: `${p.id}-default`,
      sku: p.slug,
      label: 'Unidad',
      priceClp: 0,
      compareAtClp: null,
      stock: 0,
      isDefault: true,
    };

  const firstImg = p.images[0];
  const categoryPaths = p.categories.map((c) => c.category.path);
  const rootCat =
    p.categories.find((c) => c.category.level === 1)?.category.name ??
    p.categories[0]?.category.name ??
    'Catálogo';

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortDescription: p.shortDescription,
    activeIngredient: p.activeIngredient,
    saleCondition: p.saleCondition as SaleConditionCode,
    maxQtyPerOrder: p.maxQtyPerOrder,
    isBioequivalent: p.isBioequivalent,
    isFeatured: p.isFeatured,
    isPlaceholder: p.isPlaceholder,
    ratingAvg: Number(p.ratingAvg),
    ratingCount: p.ratingCount,
    brand: p.brand
      ? {
          id: p.brand.id,
          name: p.brand.name,
          slug: p.brand.slug,
          featured: p.brand.featured,
        }
      : null,
    imageUrl: firstImg?.url ?? '/placeholders/dermocosmetica.svg',
    imageAlt: firstImg?.alt ?? p.name,
    defaultVariant: {
      id: defaultVariant.id,
      sku: defaultVariant.sku,
      label: defaultVariant.label,
      priceClp: defaultVariant.priceClp,
      compareAtClp: defaultVariant.compareAtClp,
      stock: defaultVariant.stock,
      isDefault: defaultVariant.isDefault,
    },
    categoryPaths,
    primaryCategoryName: rootCat,
  };
}

export class PrismaCatalogRepository implements CatalogRepository {
  private readonly fallback = new SeedCatalogRepository();

  async getCategoryTree(): Promise<CategoryNode[]> {
    try {
      const rows = await prisma.category.findMany({
        where: { isActive: true },
        orderBy: [{ level: 'asc' }, { sortOrder: 'asc' }],
      });
      if (rows.length === 0) return this.fallback.getCategoryTree();

      const map = new Map<string, CategoryNode>();
      for (const r of rows) {
        map.set(r.id, {
          id: r.id,
          name: r.name,
          slug: r.slug,
          path: r.path,
          level: (r.level === 1 || r.level === 2 || r.level === 3 ? r.level : 1) as 1 | 2 | 3,
          sortOrder: r.sortOrder,
          isPharma: r.isPharma,
          parentId: r.parentId,
          children: [],
        });
      }
      const roots: CategoryNode[] = [];
      for (const node of map.values()) {
        if (node.parentId && map.has(node.parentId)) {
          map.get(node.parentId)?.children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    } catch {
      return this.fallback.getCategoryTree();
    }
  }

  async getCategoryByPath(path: string): Promise<CategoryNode | null> {
    try {
      const row = await prisma.category.findUnique({ where: { path } });
      if (!row) return this.fallback.getCategoryByPath(path);
      return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        path: row.path,
        level: (row.level === 1 || row.level === 2 || row.level === 3 ? row.level : 1) as 1 | 2 | 3,
        sortOrder: row.sortOrder,
        isPharma: row.isPharma,
        parentId: row.parentId,
        children: [],
      };
    } catch {
      return this.fallback.getCategoryByPath(path);
    }
  }

  async getFeaturedSections(): Promise<FeaturedCategorySection[]> {
    try {
      const count = await prisma.product.count({ where: { isActive: true } });
      if (count === 0) return this.fallback.getFeaturedSections();

      const roots = [
        {
          slug: 'dermocosmetica',
          title: 'Dermocosmética destacada',
          subtitle: 'Cuidado facial, hidratación y fotoprotección diaria',
        },
        {
          slug: 'cuidado-capilar',
          title: 'Cuidado capilar',
          subtitle: 'Shampoos dermatológicos, óleos y fortalecimiento capilar',
        },
        {
          slug: 'cuidado-personal',
          title: 'Cuidado personal e insumos',
          subtitle: 'Afeitado, antisépticos y botiquín esencial para el hogar',
        },
        {
          slug: 'vitaminas-bienestar',
          title: 'Vitaminas y bienestar',
          subtitle: 'Suplementos, minerales y probióticos de uso cotidiano',
        },
        {
          slug: 'medicamentos',
          title: 'Medicamentos en mesón (acreditación ISP en curso)',
          subtitle: 'Catálogo referencial para consulta presencial y condiciones DS 466',
        },
      ];

      const sections = await Promise.all(
        roots.map(async (root) => {
          const rows = await prisma.product.findMany({
            where: {
              isActive: true,
              categories: {
                some: {
                  category: {
                    path: { startsWith: root.slug },
                  },
                },
              },
            },
            include: productSummaryInclude,
            take: 10,
            orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
          });
          return {
            categorySlug: root.slug,
            title: root.title,
            subtitle: root.subtitle,
            ctaHref: `/c/${root.slug}`,
            products: rows.map(mapPrismaProductToSummary),
          };
        }),
      );

      return sections.filter((s) => s.products.length > 0);
    } catch {
      return this.fallback.getFeaturedSections();
    }
  }

  async getProductsForCollection(params: CollectionFilterParams): Promise<CollectionPageResult> {
    try {
      const count = await prisma.product.count({ where: { isActive: true } });
      if (count === 0) return this.fallback.getProductsForCollection(params);

      const where: Prisma.ProductWhereInput = { isActive: true };
      if (params.categoryPath) {
        where.categories = {
          some: {
            category: {
              OR: [
                { path: params.categoryPath },
                { path: { startsWith: `${params.categoryPath}/` } },
              ],
            },
          },
        };
      }
      if (params.brandSlug) {
        where.brand = { slug: params.brandSlug };
      }
      if (params.query) {
        where.OR = [
          { name: { contains: params.query, mode: 'insensitive' } },
          { activeIngredient: { contains: params.query, mode: 'insensitive' } },
          { brand: { name: { contains: params.query, mode: 'insensitive' } } },
        ];
      }

      const pageSize = Math.max(1, params.pageSize ?? 12);
      const page = Math.max(1, params.page ?? 1);

      const [rows, total, category, brands] = await Promise.all([
        prisma.product.findMany({
          where,
          include: productSummaryInclude,
          take: pageSize,
          skip: (page - 1) * pageSize,
          orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
        }),
        prisma.product.count({ where }),
        params.categoryPath ? this.getCategoryByPath(params.categoryPath) : Promise.resolve(null),
        prisma.brand.findMany({ orderBy: { name: 'asc' } }),
      ]);

      return {
        category,
        products: rows.map(mapPrismaProductToSummary),
        total,
        page,
        pageSize,
        availableBrands: brands.map((b) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          featured: b.featured,
        })),
      };
    } catch {
      return this.fallback.getProductsForCollection(params);
    }
  }

  async getProductBySlug(slug: string): Promise<ProductDetail | null> {
    try {
      const p = await prisma.product.findUnique({
        where: { slug },
        include: {
          ...productSummaryInclude,
          reviews: { where: { isApproved: true }, orderBy: { createdAt: 'desc' }, take: 10 },
        },
      });
      if (!p) return this.fallback.getProductBySlug(slug);

      const summary = mapPrismaProductToSummary(p);
      return {
        ...summary,
        description: p.description,
        ispRegistryCode: p.ispRegistryCode,
        variants: p.variants.map((v) => ({
          id: v.id,
          sku: v.sku,
          label: v.label,
          priceClp: v.priceClp,
          compareAtClp: v.compareAtClp,
          stock: v.stock,
          isDefault: v.isDefault,
        })),
        images: p.images.map((i) => ({ id: i.id, url: i.url, alt: i.alt })),
        reviews: p.reviews.map((r) => ({
          id: r.id,
          authorName: r.authorName,
          rating: r.rating,
          comment: r.comment,
          createdAt: r.createdAt.toISOString().slice(0, 10),
        })),
        relatedProducts: [],
      };
    } catch {
      return this.fallback.getProductBySlug(slug);
    }
  }

  async searchSuggestions(query: string, limit = 6): Promise<SearchSuggestionResult> {
    try {
      const count = await prisma.product.count({ where: { isActive: true } });
      if (count === 0) return this.fallback.searchSuggestions(query, limit);

      const trimmed = query.trim();
      if (trimmed.length < 2) return { products: [], categories: [] };

      const [prods, cats] = await Promise.all([
        prisma.product.findMany({
          where: {
            isActive: true,
            OR: [
              { name: { contains: trimmed, mode: 'insensitive' } },
              { activeIngredient: { contains: trimmed, mode: 'insensitive' } },
              { brand: { name: { contains: trimmed, mode: 'insensitive' } } },
            ],
          },
          include: productSummaryInclude,
          take: limit,
        }),
        prisma.category.findMany({
          where: { isActive: true, name: { contains: trimmed, mode: 'insensitive' } },
          take: 4,
        }),
      ]);

      return {
        products: prods.map((p) => {
          const s = mapPrismaProductToSummary(p);
          return {
            id: s.id,
            slug: s.slug,
            name: s.name,
            brandName: s.brand?.name ?? null,
            priceClp: s.defaultVariant.priceClp,
            imageUrl: s.imageUrl,
            saleCondition: s.saleCondition,
            primaryCategoryName: s.primaryCategoryName,
          };
        }),
        categories: cats.map((c) => ({ id: c.id, name: c.name, path: c.path })),
      };
    } catch {
      return this.fallback.searchSuggestions(query, limit);
    }
  }

  async getFeaturedBrands(): Promise<BrandSummary[]> {
    try {
      const rows = await prisma.brand.findMany({
        where: { featured: true },
        orderBy: { name: 'asc' },
      });
      if (rows.length === 0) return this.fallback.getFeaturedBrands();
      return rows.map((b) => ({ id: b.id, name: b.name, slug: b.slug, featured: b.featured }));
    } catch {
      return this.fallback.getFeaturedBrands();
    }
  }

  async getRecentBlogPosts(limit = 3): Promise<BlogPostSummary[]> {
    return SEED_BLOG_POSTS.slice(0, limit);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPostSummary | null> {
    return SEED_BLOG_POSTS.find((b) => b.slug === slug) ?? null;
  }

  async getActivePrograms(): Promise<DiscountProgramSummary[]> {
    try {
      const rows = await prisma.discountProgram.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: { products: { include: { product: { include: productSummaryInclude } } } },
      });
      if (rows.length === 0) return this.fallback.getActivePrograms();
      return rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        summary: r.summary,
        badgeText: r.badgeText,
        discountPct: r.discountPct,
        requiresRut: r.requiresRut,
        bodyMdx: r.bodyMdx,
        products: r.products.map((pp) => mapPrismaProductToSummary(pp.product)),
      }));
    } catch {
      return this.fallback.getActivePrograms();
    }
  }

  async getProgramBySlug(slug: string): Promise<DiscountProgramSummary | null> {
    const programs = await this.getActivePrograms();
    return programs.find((p) => p.slug === slug) ?? null;
  }

  async getAllSitemapEntries() {
    try {
      const [cats, prods, progs] = await Promise.all([
        prisma.category.findMany({ where: { isActive: true }, select: { path: true } }),
        prisma.product.findMany({ where: { isActive: true }, select: { slug: true } }),
        prisma.discountProgram.findMany({ where: { isActive: true }, select: { slug: true } }),
      ]);
      if (cats.length === 0 && prods.length === 0) {
        return this.fallback.getAllSitemapEntries();
      }
      return {
        categoryPaths: cats.map((c) => c.path),
        productSlugs: prods.map((p) => p.slug),
        programSlugs: progs.map((p) => p.slug),
        blogSlugs: SEED_BLOG_POSTS.map((b) => b.slug),
      };
    } catch {
      return this.fallback.getAllSitemapEntries();
    }
  }
}
