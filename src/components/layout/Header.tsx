'use client';

import * as React from 'react';
import Link from 'next/link';
import { FileUp, Menu, ShoppingCart, User } from 'lucide-react';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { PredictiveSearch } from '@/components/layout/PredictiveSearch';
import { MegaMenuDesktop } from '@/components/layout/MegaMenuDesktop';
import { MobileNavAccordion } from '@/components/layout/MobileNavAccordion';
import { useCart } from '@/components/cart/CartProvider';
import { buttonVariants } from '@/components/ui/button';
import type { CategoryNode } from '@/lib/repositories/interfaces/catalog';

interface HeaderProps {
  categories: CategoryNode[];
}

export function Header({ categories }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="border-border bg-surface/95 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú de categorías"
              className="text-ink hover:bg-surface-muted rounded-md p-2 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <BrandLogo />
          </div>

          <div className="hidden max-w-xl flex-1 px-4 md:block">
            <PredictiveSearch />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/subir-receta"
              className={buttonVariants({
                variant: 'accent',
                size: 'sm',
                className: 'hidden sm:inline-flex',
              })}
            >
              <FileUp className="h-4 w-4" />
              Subir documento / receta
            </Link>

            <Link
              href="/cuenta"
              aria-label="Mi cuenta"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className: 'hidden sm:inline-flex',
              })}
            >
              <User className="h-4 w-4" />
              <span className="hidden xl:inline">Cuenta</span>
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Abrir carro de compras (${totalItems} productos)`}
              className="border-border bg-surface text-ink hover:bg-surface-muted relative inline-flex h-10 items-center gap-2 rounded-[var(--radius-control)] border px-3 text-sm font-semibold"
            >
              <ShoppingCart className="text-primary h-4 w-4" />
              <span className="hidden sm:inline">Carro</span>
              <span className="bg-primary inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-xs font-bold text-white">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <PredictiveSearch />
        </div>
      </div>

      <MegaMenuDesktop categories={categories} />
      <MobileNavAccordion
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
      />
    </header>
  );
}
