import Link from 'next/link';
import { UserCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export default function CuentaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="border-border bg-surface rounded-[var(--radius-card)] border p-6 sm:p-8">
        <span className="bg-secondary/10 text-secondary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
          <UserCheck className="h-3.5 w-3.5" />
          Auth.js (Implementación en Fase 2)
        </span>
        <h1 className="font-display text-ink mt-3 text-3xl font-extrabold">Mi Cuenta</h1>
        <p className="text-ink-muted mt-2 text-sm">
          En Fase 2 conectaremos Auth.js (correo + enlace mágico / credenciales) para gestionar tus
          direcciones por comuna, pedidos y estado de revisión de recetas médicas.
        </p>
        <div className="mt-6">
          <Link href="/" className={buttonVariants({ variant: 'primary' })}>
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
