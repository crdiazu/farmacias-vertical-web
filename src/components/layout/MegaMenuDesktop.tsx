'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, ShieldAlert } from 'lucide-react';
import type { CategoryNode } from '@/lib/repositories/interfaces/catalog';
import { cn } from '@/lib/utils';

interface MegaMenuDesktopProps {
  categories: CategoryNode[];
}

export function MegaMenuDesktop({ categories }: MegaMenuDesktopProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  React.useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openId) {
        const current = openId;
        setOpenId(null);
        triggerRefs.current[current]?.focus();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openId]);

  const activeCategory = categories.find((c) => c.id === openId) ?? null;

  const handleTopKeyDown = (event: React.KeyboardEvent, idx: number, catId: string) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = categories[(idx + 1) % categories.length];
      if (next) {
        triggerRefs.current[next.id]?.focus();
        if (openId) setOpenId(next.id);
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = categories[(idx - 1 + categories.length) % categories.length];
      if (prev) {
        triggerRefs.current[prev.id]?.focus();
        if (openId) setOpenId(prev.id);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpenId(catId);
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Categorías principales"
      className="border-border bg-surface relative hidden border-t lg:block"
      onMouseLeave={() => setOpenId(null)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <ul className="flex items-center gap-1">
          {categories.map((cat, idx) => {
            const isOpen = openId === cat.id;
            return (
              <li key={cat.id} onMouseEnter={() => setOpenId(cat.id)}>
                <button
                  ref={(el) => {
                    triggerRefs.current[cat.id] = el;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`megamenu-panel-${cat.id}`}
                  onClick={() => setOpenId(isOpen ? null : cat.id)}
                  onKeyDown={(e) => handleTopKeyDown(e, idx, cat.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 border-b-2 px-3.5 py-3 text-sm font-semibold transition-colors',
                    isOpen
                      ? 'border-primary text-primary'
                      : 'text-ink hover:text-primary border-transparent',
                  )}
                >
                  <span>{cat.name}</span>
                  {cat.isPharma ? (
                    <span className="bg-isp/10 text-isp rounded px-1.5 py-0.5 text-[10px] font-bold">
                      ISP
                    </span>
                  ) : null}
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')}
                  />
                </button>
              </li>
            );
          })}
          <li>
            <Link
              href="/programas"
              className="text-secondary hover:text-secondary-hover inline-flex items-center border-b-2 border-transparent px-3.5 py-3 text-sm font-semibold"
            >
              Programas y Convenios
            </Link>
          </li>
          <li>
            <Link
              href="/club"
              className="text-primary hover:text-primary-hover inline-flex items-center border-b-2 border-transparent px-3.5 py-3 text-sm font-semibold"
            >
              Club Vertical
            </Link>
          </li>
        </ul>
        <Link href="/blog" className="text-ink-muted hover:text-ink text-xs font-semibold">
          Blog de Salud
        </Link>
      </div>

      {activeCategory ? (
        <div
          id={`megamenu-panel-${activeCategory.id}`}
          className="border-border bg-surface absolute right-0 left-0 z-40 border-b shadow-xl"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-6">
            <div className="col-span-9 grid grid-cols-3 gap-6">
              {activeCategory.children.map((level2) => (
                <div key={level2.id} className="space-y-2.5">
                  <Link
                    href={`/c/${level2.path}`}
                    onClick={() => setOpenId(null)}
                    className="border-border font-display text-secondary hover:text-primary block border-b pb-1.5 text-sm font-bold"
                  >
                    {level2.name}
                  </Link>
                  <ul className="space-y-1.5">
                    {level2.children.map((level3) => (
                      <li key={level3.id}>
                        <Link
                          href={`/c/${level3.path}`}
                          onClick={() => setOpenId(null)}
                          className="text-ink-muted hover:bg-surface-muted hover:text-ink block rounded px-1.5 py-1 text-sm"
                        >
                          {level3.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-surface-muted col-span-3 flex flex-col justify-between rounded-[var(--radius-card)] p-4">
              <div>
                <p className="text-primary text-xs font-bold tracking-wider uppercase">
                  {activeCategory.name}
                </p>
                {activeCategory.isPharma ? (
                  <div className="border-isp/25 bg-surface text-ink mt-2 flex items-start gap-2 rounded-md border p-2.5 text-xs">
                    <ShieldAlert className="text-isp mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      Venta electrónica de fármacos en acreditación ISP. Consulta disponibilidad en
                      mesón.
                    </span>
                  </div>
                ) : (
                  <p className="text-ink-muted mt-2 text-sm">
                    Productos seleccionados para compra online con retiro gratis en local o despacho
                    a domicilio.
                  </p>
                )}
              </div>
              <Link
                href={`/c/${activeCategory.path}`}
                onClick={() => setOpenId(null)}
                className="text-secondary hover:text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-bold"
              >
                Ver todo en {activeCategory.name}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
