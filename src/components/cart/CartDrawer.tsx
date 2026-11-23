'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2, Truck, FileCheck2 } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { formatClp } from '@/lib/chile/format';

const FREE_SHIPPING_THRESHOLD_CLP = 30000;

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotalClp, requiresRx, updateQuantity, removeItem } =
    useCart();

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_CLP - subtotalClp);
  const progressPct = Math.min(100, Math.round((subtotalClp / FREE_SHIPPING_THRESHOLD_CLP) * 100));

  return (
    <Sheet
      open={isOpen}
      onClose={closeCart}
      title="Tu Carro de Compras"
      description="Precios en pesos chilenos (CLP) · Retiro en mesón o despacho"
    >
      <div className="flex h-full flex-col">
        <div className="border-border bg-surface-muted/60 border-b px-5 py-3">
          <div className="text-ink flex items-center gap-2 text-xs font-medium">
            <Truck className="text-primary h-4 w-4 shrink-0" />
            {remainingForFreeShipping === 0 ? (
              <span>¡Tienes envío gratis en comunas habilitadas de la RM!</span>
            ) : (
              <span>
                Te faltan{' '}
                <strong className="font-mono">{formatClp(remainingForFreeShipping)}</strong> para
                envío gratis RM (referencial)
              </span>
            )}
          </div>
          <div className="bg-border mt-2 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {requiresRx ? (
          <div className="border-isp/30 bg-isp/5 text-ink mx-5 mt-4 flex items-start gap-2.5 rounded-[var(--radius-control)] border p-3 text-xs">
            <FileCheck2 className="text-isp mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Tu carro incluye productos con requerimiento de receta médica. Deberás adjuntar el
              documento para revisión farmacéutica en el checkout.
            </p>
          </div>
        ) : null}

        <div className="flex-1 space-y-3 px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="text-ink-muted/40 h-12 w-12" />
              <p className="font-display text-ink mt-3 text-base font-semibold">
                Tu carro está vacío
              </p>
              <p className="text-ink-muted mt-1 max-w-xs text-sm">
                Explora dermocosmética, cuidado capilar, higiene y vitaminas disponibles para
                despacho o retiro en local.
              </p>
              <Button className="mt-5" onClick={closeCart}>
                Explorar catálogo
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="border-border flex gap-3 rounded-[var(--radius-control)] border p-3"
              >
                <div className="bg-surface-muted relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  {item.brandName ? (
                    <p className="text-ink-muted text-[11px] font-semibold tracking-wide uppercase">
                      {item.brandName}
                    </p>
                  ) : null}
                  <Link
                    href={`/p/${item.slug}`}
                    onClick={closeCart}
                    className="text-ink hover:text-secondary line-clamp-2 text-sm font-semibold"
                  >
                    {item.name}
                  </Link>
                  <p className="text-ink-muted text-xs">{item.variantLabel}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="border-border inline-flex items-center rounded-md border">
                      <button
                        type="button"
                        aria-label={`Disminuir cantidad de ${item.name}`}
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="text-ink-muted hover:text-ink p-1"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-2.5 font-mono text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="text-ink-muted hover:text-ink p-1"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-ink font-mono text-sm font-bold">
                        {formatClp(item.priceClp * item.quantity)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Eliminar ${item.name}`}
                        onClick={() => removeItem(item.variantId)}
                        className="text-ink-muted hover:bg-surface-muted hover:text-promo rounded p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-border bg-surface border-t p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">Subtotal estimado</span>
              <span className="text-ink font-mono text-lg font-bold">{formatClp(subtotalClp)}</span>
            </div>
            <p className="text-ink-muted mt-1 text-xs">
              El costo de despacho por comuna se calcula en el checkout.
            </p>
            <div className="mt-4 grid gap-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className={buttonVariants({ variant: 'primary', size: 'lg', className: 'w-full' })}
              >
                Ir al checkout (Fase 3)
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-full' })}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Sheet>
  );
}
