import Link from 'next/link';
import type { BrandSummary } from '@/lib/repositories/interfaces/catalog';

interface BrandStripProps {
  brands: BrandSummary[];
}

export function BrandStrip({ brands }: BrandStripProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="border-border bg-surface rounded-[var(--radius-card)] border p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-primary text-xs font-bold tracking-wider uppercase">
              Marcas &amp; Laboratorios (Ejemplo)
            </p>
            <h2 className="font-display text-ink mt-1 text-2xl font-extrabold">
              Explora por laboratorio o línea
            </h2>
          </div>
          <Link href="/buscar" className="text-secondary hover:text-primary text-sm font-bold">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/buscar?marca=${encodeURIComponent(brand.slug)}`}
              className="border-border bg-surface-muted/50 font-display text-ink hover:border-primary hover:bg-surface hover:text-primary flex min-h-16 items-center justify-center rounded-[var(--radius-control)] border px-3 py-3 text-center text-xs font-bold transition-colors"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
