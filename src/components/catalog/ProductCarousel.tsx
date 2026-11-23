'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import type { RegulatoryMode } from '@/lib/config/env';
import type { ProductSummary } from '@/lib/repositories/interfaces/catalog';

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  ctaHref: string;
  products: ProductSummary[];
  regulatoryMode: RegulatoryMode;
  whatsappNumber: string;
}

export function ProductCarousel({
  title,
  subtitle,
  ctaHref,
  products,
  regulatoryMode,
  whatsappNumber,
}: ProductCarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const distance = Math.max(280, Math.round(el.clientWidth * 0.75));
    el.scrollBy({ left: direction === 'next' ? distance : -distance, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-ink text-2xl font-extrabold tracking-tight">{title}</h2>
          <p className="text-ink-muted mt-1 text-sm">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            <button
              type="button"
              onClick={() => scrollTrack('prev')}
              aria-label={`Anterior en ${title}`}
              className="border-border bg-surface text-ink hover:bg-surface-muted rounded-full border p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('next')}
              aria-label={`Siguiente en ${title}`}
              className="border-border bg-surface text-ink hover:bg-surface-muted rounded-full border p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <Link
            href={ctaHref}
            className="text-secondary hover:text-primary inline-flex items-center gap-1 text-sm font-bold"
          >
            Ver categoría
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-5 grid snap-x snap-mandatory auto-cols-[72%] grid-flow-col gap-4 overflow-x-auto pb-2 sm:auto-cols-[44%] md:auto-cols-[31%] lg:auto-cols-[23.5%]"
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard
              product={product}
              regulatoryMode={regulatoryMode}
              whatsappNumber={whatsappNumber}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
