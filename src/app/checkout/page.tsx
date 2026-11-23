import Link from 'next/link';
import { CreditCard, MapPin, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export default function CheckoutPreviewPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="border-border bg-surface rounded-[var(--radius-card)] border p-6 sm:p-8">
        <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
          <CreditCard className="h-3.5 w-3.5" />
          Checkout Chile + Webpay Plus (Implementación en Fase 3)
        </span>
        <h1 className="font-display text-ink mt-3 text-3xl font-extrabold">
          Finalizar Compra (Preview)
        </h1>
        <p className="text-ink-muted mt-2 text-sm">
          El flujo transaccional completo con dirección por Región y Comuna, selección de despacho o
          retiro en mesón, carga opcional de receta y pago con Transbank Webpay Plus (modo
          integración) se construirá en la Fase 3.
        </p>

        <div className="border-border bg-surface-muted/40 text-ink-muted mt-6 space-y-3 rounded-lg border p-4 text-xs">
          <p className="text-ink flex items-center gap-2 font-semibold">
            <MapPin className="text-secondary h-4 w-4" />
            Regiones y Comunas de Chile + Retiro en Mesón
          </p>
          <p className="text-ink flex items-center gap-2 font-semibold">
            <ShieldCheck className="text-primary h-4 w-4" />
            Sin almacenamiento de datos de tarjetas (redirección tokenizada Webpay Plus)
          </p>
        </div>

        <div className="mt-6">
          <Link href="/" className={buttonVariants({ variant: 'primary' })}>
            Seguir explorando el catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
