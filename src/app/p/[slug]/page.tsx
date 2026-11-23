import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldAlert, Star, ChevronRight, MessageCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/catalog/ProductCard';
import { calculateDiscountPercent, formatClp } from '@/lib/chile/format';
import { getAppConfig } from '@/lib/config/env';
import { canAddToCartOnline } from '@/lib/regulatory/isp';
import { getCatalogRepository } from '@/lib/repositories';
import { AddToCartSingle } from '@/components/catalog/AddToCartSingle';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const config = getAppConfig();
  const repo = getCatalogRepository();
  const product = await repo.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const variant = product.defaultVariant;
  const discountPct = calculateDiscountPercent(variant.priceClp, variant.compareAtClp);
  const regCheck = canAddToCartOnline(product.saleCondition, config.STORE_REGULATORY_MODE);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: variant.sku,
    brand: product.brand ? { '@type': 'Brand', name: product.brand.name } : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CLP',
      price: variant.priceClp,
      availability:
        variant.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={productLd} />

      <nav aria-label="Breadcrumb" className="text-ink-muted flex items-center gap-1.5 text-xs">
        <Link href="/" className="hover:text-ink">
          Inicio
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/c/${product.categoryPaths[0] ?? 'dermocosmetica'}`}
          className="hover:text-ink"
        >
          {product.primaryCategoryName}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink truncate font-medium">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="border-border bg-surface relative aspect-square overflow-hidden rounded-[var(--radius-card)] border p-6">
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain p-6"
            />
            {discountPct > 0 ? (
              <Badge variant="promo" className="absolute top-4 left-4">
                -{discountPct}%
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {product.brand ? (
                <span className="text-secondary text-xs font-extrabold tracking-wider uppercase">
                  {product.brand.name}
                </span>
              ) : null}
              {product.isPlaceholder ? <Badge variant="outline">Producto de muestra</Badge> : null}
              {product.isBioequivalent ? (
                <Badge variant="secondary">Bioequivalente (Ref.)</Badge>
              ) : null}
            </div>

            <h1 className="font-display text-ink mt-2 text-2xl font-extrabold sm:text-3xl">
              {product.name}
            </h1>

            <div className="text-ink-muted mt-2 flex flex-wrap items-center gap-4 text-xs">
              <span className="font-mono">SKU: {variant.sku}</span>
              {product.activeIngredient ? (
                <span>Principio activo: {product.activeIngredient}</span>
              ) : null}
              {product.ratingCount > 0 ? (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <strong className="text-ink">{product.ratingAvg.toFixed(1)}</strong> (
                  {product.ratingCount} reseñas)
                </span>
              ) : null}
            </div>
          </div>

          <div className="border-border bg-surface rounded-[var(--radius-card)] border p-5">
            <div className="flex items-baseline gap-3">
              <span className="text-ink font-mono text-3xl font-extrabold">
                {formatClp(variant.priceClp)}
              </span>
              {variant.compareAtClp && variant.compareAtClp > variant.priceClp ? (
                <span className="text-ink-muted font-mono text-base line-through">
                  {formatClp(variant.compareAtClp)}
                </span>
              ) : null}
            </div>
            <p className="text-ink-muted mt-1 text-xs">
              Presentación: <strong className="text-ink">{variant.label}</strong> · Stock
              referencial: {variant.stock} unidades
            </p>

            <div className="border-border bg-surface-muted/60 text-ink mt-4 rounded-lg border p-3 text-xs">
              <p className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="text-isp h-4 w-4" />
                {regCheck.badgeLabel}
              </p>
              <p className="text-ink-muted mt-1">{regCheck.helperText}</p>
            </div>

            <div className="mt-5">
              {regCheck.allowed ? (
                <AddToCartSingle
                  productId={product.id}
                  slug={product.slug}
                  name={product.name}
                  brandName={product.brand?.name ?? null}
                  imageUrl={product.imageUrl}
                  maxQty={product.maxQtyPerOrder}
                  saleCondition={product.saleCondition}
                  variant={variant}
                />
              ) : (
                <Link
                  href="/subir-receta"
                  className="bg-secondary hover:bg-secondary-hover inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] px-6 text-sm font-bold text-white sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar disponibilidad en mesón
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-ink text-lg font-bold">Descripción</h2>
            <p className="text-ink-muted text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {product.relatedProducts.length > 0 ? (
        <section className="border-border mt-14 border-t pt-8">
          <h2 className="font-display text-ink text-xl font-extrabold">Productos relacionados</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                regulatoryMode={config.STORE_REGULATORY_MODE}
                whatsappNumber={config.NEXT_PUBLIC_WHATSAPP_NUMBER}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
