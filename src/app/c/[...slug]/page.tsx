import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { getAppConfig } from '@/lib/config/env';
import { getCatalogRepository } from '@/lib/repositories';

interface CollectionPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ marca?: string; orden?: string; pagina?: string }>;
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const categoryPath = slug.join('/');
  const config = getAppConfig();
  const repo = getCatalogRepository();

  const sortMap = {
    featured: 'featured',
    'price-asc': 'price-asc',
    'price-desc': 'price-desc',
    'name-asc': 'name-asc',
  } as const;
  const sort =
    sp.orden && sp.orden in sortMap ? sortMap[sp.orden as keyof typeof sortMap] : 'featured';
  const page = Math.max(1, Number(sp.pagina) || 1);

  const result = await repo.getProductsForCollection({
    categoryPath,
    brandSlug: sp.marca,
    sort,
    page,
    pageSize: 12,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-ink-muted flex items-center gap-1.5 text-xs">
        <Link href="/" className="hover:text-ink">
          Inicio
        </Link>
        {slug.map((segment, idx) => {
          const href = `/c/${slug.slice(0, idx + 1).join('/')}`;
          return (
            <span key={href} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={href} className="hover:text-ink capitalize">
                {segment.replace(/-/g, ' ')}
              </Link>
            </span>
          );
        })}
      </nav>

      <div className="border-border mt-4 flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-ink text-3xl font-extrabold">
            {result.category?.name ?? 'Catálogo Farmacias Vertical'}
          </h1>
          <p className="text-ink-muted mt-1 text-sm">
            {result.total} productos encontrados · Vista preliminar Fase 1 (los filtros laterales
            completos se habilitan en Fase 2).
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {[
            ['featured', 'Destacados'],
            ['price-asc', 'Menor precio'],
            ['price-desc', 'Mayor precio'],
            ['name-asc', 'A-Z'],
          ].map(([key, label]) => (
            <Link
              key={key}
              href={`/c/${categoryPath}?orden=${key}${sp.marca ? `&marca=${encodeURIComponent(sp.marca)}` : ''}`}
              className={`rounded-full border px-3 py-1.5 font-semibold ${
                sort === key
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-surface text-ink hover:bg-surface-muted'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {result.category?.children && result.category.children.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {result.category.children.map((sub) => (
            <Link
              key={sub.id}
              href={`/c/${sub.path}`}
              className="border-border bg-surface-muted text-ink hover:border-primary hover:text-primary rounded-full border px-3 py-1 text-xs font-semibold"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      ) : null}

      {result.products.length === 0 ? (
        <div className="border-border bg-surface mt-10 rounded-[var(--radius-card)] border p-10 text-center">
          <p className="font-display text-ink text-lg font-bold">
            Sin productos en esta subcategoría todavía
          </p>
          <p className="text-ink-muted mt-1 text-sm">
            En el catálogo de demostración puedes explorar Dermocosmética, Cuidado Capilar, Cuidado
            Personal, Vitaminas o Medicamentos.
          </p>
          <Link
            href="/"
            className="text-secondary mt-4 inline-block text-sm font-bold hover:underline"
          >
            Volver al inicio →
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {result.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              regulatoryMode={config.STORE_REGULATORY_MODE}
              whatsappNumber={config.NEXT_PUBLIC_WHATSAPP_NUMBER}
            />
          ))}
        </div>
      )}
    </div>
  );
}
