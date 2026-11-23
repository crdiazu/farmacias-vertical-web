'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star, MessageCircle, ShieldAlert } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { calculateDiscountPercent, formatClp } from '@/lib/chile/format';
import type { RegulatoryMode } from '@/lib/config/env';
import { canAddToCartOnline } from '@/lib/regulatory/isp';
import type { ProductSummary } from '@/lib/repositories/interfaces/catalog';

interface ProductCardProps {
  product: ProductSummary;
  regulatoryMode: RegulatoryMode;
  whatsappNumber: string;
}

export function ProductCard({ product, regulatoryMode, whatsappNumber }: ProductCardProps) {
  const { addItem } = useCart();
  const variant = product.defaultVariant;
  const discountPct = calculateDiscountPercent(variant.priceClp, variant.compareAtClp);
  const regCheck = canAddToCartOnline(product.saleCondition, regulatoryMode);
  const outOfStock = variant.stock <= 0;

  const sanitizedWsp = whatsappNumber.replace(/[^0-9]/g, '');
  const wspHref =
    sanitizedWsp && sanitizedWsp !== '56900000000'
      ? `https://wa.me/${sanitizedWsp}?text=${encodeURIComponent(
          `Hola Farmacias Vertical, consulto por disponibilidad en mesón de: ${product.name}`,
        )}`
      : `/p/${product.slug}`;

  const handleAdd = () => {
    if (!regCheck.allowed || outOfStock) return;
    addItem({
      variantId: variant.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantLabel: variant.label,
      brandName: product.brand?.name ?? null,
      priceClp: variant.priceClp,
      imageUrl: product.imageUrl,
      maxQty: Math.min(product.maxQtyPerOrder, variant.stock),
      saleCondition: product.saleCondition,
    });
  };

  return (
    <article className="group border-border bg-surface flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border shadow-[var(--shadow-card)] transition-shadow hover:shadow-md">
      <Link
        href={`/p/${product.slug}`}
        className="bg-surface-muted/40 relative block aspect-square w-full overflow-hidden"
      >
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {discountPct > 0 ? <Badge variant="promo">-{discountPct}%</Badge> : null}
          {product.isPlaceholder ? <Badge variant="outline">Muestra</Badge> : null}
        </div>
        {product.saleCondition !== 'NON_PHARMA' ? (
          <div className="absolute right-2.5 bottom-2.5 left-2.5">
            <Badge variant="isp" className="w-full justify-center text-[11px]">
              <ShieldAlert className="h-3 w-3" />
              {regCheck.badgeLabel}
            </Badge>
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-secondary truncate font-bold tracking-wider uppercase">
            {product.brand?.name ?? product.primaryCategoryName}
          </span>
          {product.ratingCount > 0 ? (
            <span className="text-ink-muted inline-flex shrink-0 items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-ink font-mono font-semibold">
                {product.ratingAvg.toFixed(1)}
              </span>
              <span>({product.ratingCount})</span>
            </span>
          ) : null}
        </div>

        <Link
          href={`/p/${product.slug}`}
          className="font-display text-ink hover:text-secondary mt-1.5 line-clamp-2 text-sm leading-snug font-bold"
        >
          {product.name}
        </Link>

        <p className="text-ink-muted mt-1 text-xs">{variant.label}</p>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-ink font-mono text-lg font-extrabold">
              {formatClp(variant.priceClp)}
            </span>
            {variant.compareAtClp && variant.compareAtClp > variant.priceClp ? (
              <span className="text-ink-muted font-mono text-xs line-through">
                {formatClp(variant.compareAtClp)}
              </span>
            ) : null}
          </div>

          <div className="mt-3">
            {!regCheck.allowed ? (
              <Link
                href={wspHref}
                target={wspHref.startsWith('http') ? '_blank' : undefined}
                rel={wspHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="border-isp/30 bg-isp/10 text-isp hover:bg-isp/15 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[var(--radius-control)] border px-3 text-xs font-bold"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Consultar en mesón
              </Link>
            ) : outOfStock ? (
              <Button variant="outline" size="sm" className="w-full" disabled>
                Agotado temporalmente
              </Button>
            ) : (
              <Button onClick={handleAdd} variant="primary" size="sm" className="w-full">
                <ShoppingBag className="h-3.5 w-3.5" />
                Agregar al carro
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
