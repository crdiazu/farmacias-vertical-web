import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Badge } from '@/components/ui/badge';
import { getAppConfig } from '@/lib/config/env';
import { getCatalogRepository } from '@/lib/repositories';

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const config = getAppConfig();
  const repo = getCatalogRepository();
  const program = await repo.getProgramBySlug(slug);

  if (!program) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-ink-muted flex items-center gap-1.5 text-xs">
        <Link href="/" className="hover:text-ink">
          Inicio
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/programas" className="hover:text-ink">
          Programas
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink">{program.title}</span>
      </nav>

      <div className="border-border bg-surface mt-5 rounded-[var(--radius-card)] border p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {program.badgeText ? <Badge variant="secondary">{program.badgeText}</Badge> : null}
          {program.discountPct ? (
            <Badge variant="promo">Hasta {program.discountPct}% dcto.</Badge>
          ) : null}
          {program.requiresRut ? <Badge variant="outline">Requiere RUT</Badge> : null}
        </div>
        <h1 className="font-display text-ink mt-3 text-3xl font-extrabold">{program.title}</h1>
        <p className="text-ink-muted mt-2 max-w-3xl text-sm leading-relaxed">{program.summary}</p>
        <div className="bg-surface-muted/60 text-ink mt-5 rounded-lg p-4 text-sm whitespace-pre-line">
          {program.bodyMdx}
        </div>
      </div>

      {program.products.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-ink text-2xl font-extrabold">
            Productos referenciales asociados
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {program.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
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
