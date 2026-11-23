import Link from 'next/link';
import { ProductCard } from '@/components/catalog/ProductCard';
import { getAppConfig } from '@/lib/config/env';
import { getCatalogRepository } from '@/lib/repositories';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; marca?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const query = sp.q?.trim() ?? '';
  const config = getAppConfig();
  const repo = getCatalogRepository();

  const result = await repo.getProductsForCollection({
    query: query || undefined,
    brandSlug: sp.marca || undefined,
    pageSize: 24,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-ink text-3xl font-extrabold">
        {query
          ? `Resultados para "${query}"`
          : sp.marca
            ? `Productos de marca: ${sp.marca}`
            : 'Catálogo completo'}
      </h1>
      <p className="text-ink-muted mt-1 text-sm">{result.total} productos encontrados</p>

      {result.products.length === 0 ? (
        <div className="border-border bg-surface mt-8 rounded-[var(--radius-card)] border p-8 text-center">
          <p className="text-ink font-semibold">No encontramos coincidencias exactas.</p>
          <Link
            href="/"
            className="text-primary mt-3 inline-block text-sm font-bold hover:underline"
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
