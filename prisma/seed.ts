import { PrismaClient, SaleCondition } from '@prisma/client';
import {
  SEED_BRANDS,
  SEED_CATEGORIES_FLAT,
  SEED_PRODUCTS,
  SEED_PROGRAMS,
} from '../src/lib/data/seed-catalog';

const prisma = new PrismaClient();

async function main() {
  for (const cat of SEED_CATEGORIES_FLAT) {
    await prisma.category.upsert({
      where: { path: cat.path },
      update: {
        name: cat.name,
        slug: cat.slug,
        level: cat.level,
        sortOrder: cat.sortOrder,
        isPharma: cat.isPharma,
        parentId: cat.parentId,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        path: cat.path,
        level: cat.level,
        sortOrder: cat.sortOrder,
        isPharma: cat.isPharma,
        parentId: cat.parentId,
      },
    });
  }

  for (const brand of SEED_BRANDS) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {
        name: brand.name,
        featured: brand.featured,
      },
      create: {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        featured: brand.featured,
      },
    });
  }

  for (const prod of SEED_PRODUCTS) {
    const productRecord = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        shortDescription: prod.shortDescription,
        description: prod.description,
        activeIngredient: prod.activeIngredient,
        ispRegistryCode: prod.ispRegistryCode,
        isBioequivalent: prod.isBioequivalent,
        saleCondition: prod.saleCondition as SaleCondition,
        maxQtyPerOrder: prod.maxQtyPerOrder,
        isFeatured: prod.isFeatured,
        isPlaceholder: prod.isPlaceholder,
        ratingAvg: prod.ratingAvg,
        ratingCount: prod.ratingCount,
        brandId: prod.brand?.id ?? null,
      },
      create: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        shortDescription: prod.shortDescription,
        description: prod.description,
        activeIngredient: prod.activeIngredient,
        ispRegistryCode: prod.ispRegistryCode,
        isBioequivalent: prod.isBioequivalent,
        saleCondition: prod.saleCondition as SaleCondition,
        maxQtyPerOrder: prod.maxQtyPerOrder,
        isFeatured: prod.isFeatured,
        isPlaceholder: prod.isPlaceholder,
        ratingAvg: prod.ratingAvg,
        ratingCount: prod.ratingCount,
        brandId: prod.brand?.id ?? null,
      },
    });

    for (const variant of prod.variants) {
      await prisma.productVariant.upsert({
        where: { sku: variant.sku },
        update: {
          label: variant.label,
          priceClp: variant.priceClp,
          compareAtClp: variant.compareAtClp,
          stock: variant.stock,
          isDefault: variant.isDefault,
        },
        create: {
          id: variant.id,
          productId: productRecord.id,
          sku: variant.sku,
          label: variant.label,
          priceClp: variant.priceClp,
          compareAtClp: variant.compareAtClp,
          stock: variant.stock,
          isDefault: variant.isDefault,
        },
      });
    }

    const existingImages = await prisma.productImage.count({
      where: { productId: productRecord.id },
    });
    if (existingImages === 0) {
      for (let i = 0; i < prod.images.length; i++) {
        const img = prod.images[i];
        if (!img) continue;
        await prisma.productImage.create({
          data: {
            productId: productRecord.id,
            url: img.url,
            alt: img.alt,
            sortOrder: i,
          },
        });
      }
    }

    for (const path of prod.categoryPaths) {
      const cat = await prisma.category.findUnique({ where: { path } });
      if (!cat) continue;
      await prisma.productCategory.upsert({
        where: {
          productId_categoryId: {
            productId: productRecord.id,
            categoryId: cat.id,
          },
        },
        update: {},
        create: {
          productId: productRecord.id,
          categoryId: cat.id,
        },
      });
    }
  }

  for (let i = 0; i < SEED_PROGRAMS.length; i++) {
    const prog = SEED_PROGRAMS[i];
    if (!prog) continue;
    await prisma.discountProgram.upsert({
      where: { slug: prog.slug },
      update: {
        title: prog.title,
        summary: prog.summary,
        bodyMdx: prog.bodyMdx,
        badgeText: prog.badgeText,
        discountPct: prog.discountPct,
        requiresRut: prog.requiresRut,
        sortOrder: i,
      },
      create: {
        id: prog.id,
        slug: prog.slug,
        title: prog.title,
        summary: prog.summary,
        bodyMdx: prog.bodyMdx,
        badgeText: prog.badgeText,
        discountPct: prog.discountPct,
        requiresRut: prog.requiresRut,
        sortOrder: i,
      },
    });
  }

  console.info('Seed completado con éxito:', {
    categories: SEED_CATEGORIES_FLAT.length,
    brands: SEED_BRANDS.length,
    products: SEED_PRODUCTS.length,
    programs: SEED_PROGRAMS.length,
  });
}

main()
  .catch((err) => {
    console.error('Error ejecutando seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
