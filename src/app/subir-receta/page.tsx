import Link from 'next/link';
import { FileUp, ShieldCheck, Lock } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export default function SubirRecetaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="border-border bg-surface rounded-[var(--radius-card)] border p-6 sm:p-8">
        <span className="bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
          <FileUp className="h-3.5 w-3.5" />
          Módulo de Recetas (Preview Fase 1 · Activo en Fase 3)
        </span>
        <h1 className="font-display text-ink mt-3 text-3xl font-extrabold">
          Subir documento o receta médica
        </h1>
        <p className="text-ink-muted mt-2 text-sm leading-relaxed">
          En la Fase 3 habilitaremos la carga directa hacia almacenamiento S3 privado con URLs
          firmadas, cifrado en reposo, validación de tipo/tamaño en cliente y servidor y cola de
          revisión farmacéutica (pendiente, aprobada o rechazada).
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border-border bg-surface-muted/50 rounded-lg border p-4 text-xs">
            <p className="text-ink flex items-center gap-1.5 font-bold">
              <Lock className="text-primary h-4 w-4" />
              Resguardo de datos sensibles
            </p>
            <p className="text-ink-muted mt-1">
              Las recetas jamás se exponen públicamente y cuentan con política de retención
              auditable definida por el Director Técnico y Asesor Legal.
            </p>
          </div>
          <div className="border-border bg-surface-muted/50 rounded-lg border p-4 text-xs">
            <p className="text-ink flex items-center gap-1.5 font-bold">
              <ShieldCheck className="text-isp h-4 w-4" />
              Condiciones DS N° 466
            </p>
            <p className="text-ink-muted mt-1">
              Receta Simple, Receta Retenida (entrega física contra despacho) y bloqueo normativo de
              Receta Cheque.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/c/medicamentos" className={buttonVariants({ variant: 'secondary' })}>
            Ver catálogo de mesón
          </Link>
          <Link href="/" className={buttonVariants({ variant: 'outline' })}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
