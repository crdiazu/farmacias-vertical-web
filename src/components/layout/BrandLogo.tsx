import Link from 'next/link';

export function BrandLogo() {
  return (
    <Link
      href="/"
      className="focus-visible:outline-secondary inline-flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
      aria-label="Farmacias Vertical — Ir al inicio"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="36" height="36" rx="9" fill="#0F4C81" />
        <rect x="8" y="6" width="5" height="24" rx="2.5" fill="#10B981" />
        <path d="M17 18h11M22.5 12.5v11" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
      <div className="leading-tight">
        <span className="font-display text-ink block text-base font-extrabold tracking-tight sm:text-lg">
          Farmacias <span className="text-primary">Vertical</span>
        </span>
        <span className="text-ink-muted block text-[10px] font-semibold tracking-widest uppercase">
          Salud · Dermocuidado · Mesón
        </span>
      </div>
    </Link>
  );
}
