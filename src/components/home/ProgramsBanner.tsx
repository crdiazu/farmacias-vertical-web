import Link from 'next/link';
import { Sparkles, Tag, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export function ProgramsBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="bg-secondary flex flex-col justify-between rounded-[var(--radius-card)] p-6 text-white sm:p-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              Fidelización con RUT
            </span>
            <h2 className="font-display mt-3 text-2xl font-extrabold">Club Farmacias Vertical</h2>
            <p className="mt-2 text-sm text-sky-100">
              Inscríbete con tu RUT (validación módulo 11), correo y celular para acceder a
              descuentos y campañas de dermocuidado y bienestar.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/club"
              className={buttonVariants({
                variant: 'primary',
                className: 'text-secondary bg-white hover:bg-slate-100',
              })}
            >
              Inscribirme al Club
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="border-border bg-surface-muted flex flex-col justify-between rounded-[var(--radius-card)] border p-6 sm:p-8">
          <div>
            <span className="bg-primary/15 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
              <Tag className="h-3.5 w-3.5" />
              Convenios y Alianzas
            </span>
            <h2 className="font-display text-ink mt-3 text-2xl font-extrabold">
              Programas y Beneficios (Plantilla)
            </h2>
            <p className="text-ink-muted mt-2 text-sm">
              Estructura lista para publicar convenios municipales, empresas locales o programas de
              adherencia terapéutica cuando se habiliten.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/programas" className={buttonVariants({ variant: 'primary' })}>
              Ver programas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
