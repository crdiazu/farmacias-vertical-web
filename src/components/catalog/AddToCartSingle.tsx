'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/button';
import type { SaleConditionCode } from '@/lib/regulatory/isp';
import type { ProductVariantSummary } from '@/lib/repositories/interfaces/catalog';

interface AddToCartSingleProps {
  productId: string;
  slug: string;
  name: string;
  brandName: string | null;
  imageUrl: string;
  maxQty: number;
  saleCondition: SaleConditionCode;
  variant: ProductVariantSummary;
}

export function AddToCartSingle({
  productId,
  slug,
  name,
  brandName,
  imageUrl,
  maxQty,
  saleCondition,
  variant,
}: AddToCartSingleProps) {
  const { addItem } = useCart();

  return (
    <Button
      size="lg"
      disabled={variant.stock <= 0}
      onClick={() =>
        addItem({
          variantId: variant.id,
          productId,
          slug,
          name,
          variantLabel: variant.label,
          brandName,
          priceClp: variant.priceClp,
          imageUrl,
          maxQty: Math.min(maxQty, variant.stock),
          saleCondition,
        })
      }
      className="w-full sm:w-auto"
    >
      <ShoppingBag className="h-4 w-4" />
      {variant.stock > 0 ? 'Agregar al carro' : 'Agotado temporalmente'}
    </Button>
  );
}
