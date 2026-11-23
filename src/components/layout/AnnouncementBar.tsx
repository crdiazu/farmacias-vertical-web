import Link from 'next/link';
import { ShieldCheck, Truck, Store } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6">
        <div className="flex items-center gap-4 overflow-x-auto">
          <span className="inline-flex shrink-0 items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-emerald-300" />
            Despacho a todo Chile · Envío gratis referencial RM sobre $30.000
          </span>
          <span className="hidden shrink-0 items-center gap-1.5 md:inline-flex">
            <Store className="h-3.5 w-3.5 text-sky-300" />
            Retiro sin costo en mesón Farmacias Vertical
          </span>
        </div>
        <Link
          href="/legal/informacion-reglamentaria"
          className="inline-flex shrink-0 items-center gap-1 font-medium text-sky-200 underline-offset-2 hover:underline"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Acreditación ISP en curso · Normativa DS 466
        </Link>
      </div>
    </div>
  );
}
