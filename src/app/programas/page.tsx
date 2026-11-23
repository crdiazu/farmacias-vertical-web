import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCatalogRepository } from '@/lib/repositories';

export default async function ProgramsIndexPage() {
  const repo = getCatalogRepository();
  const programs = await repo.getActivePrograms();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="max-w-2xl">
        <span className="bg-secondary/10 text-secondary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
          <Tag className="h-3.5 w-3.5" />
          Plantillas Reutilizables
        </span>
        <h1 className="font-display text-ink mt-3 text-3xl font-extrabold">
          Programas y Convenios (Ejemplo)
        </h1>
        <p className="text-ink-muted mt-2 text-sm">
          Contenido de ejemplo para demostrar la estructura de convenios y descuentos propios de
          Farmacias Vertical.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {programs.map((prog) => (
          <article
            key={prog.id}
            className="border-border bg-surface flex flex-col justify-between rounded-[var(--radius-card)] border p-6 shadow-[var(--shadow-card)]"
          >
            <div>
              {prog.badgeText ? <Badge variant="secondary">{prog.badgeText}</Badge> : null}
              <h2 className="font-display text-ink mt-3 text-xl font-bold">{prog.title}</h2>
              <p className="text-ink-muted mt-2 text-sm">{prog.summary}</p>
            </div>
            <Link
              href={`/programas/${prog.slug}`}
              className="text-primary mt-6 inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
            >
              Ver detalle del programa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
