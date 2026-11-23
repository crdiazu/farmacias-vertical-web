'use client';

import * as React from 'react';
import Link from 'next/link';
import { FileUp, User, Sparkles, Tag, BookOpen } from 'lucide-react';
import { Sheet } from '@/components/ui/sheet';
import { AccordionItem } from '@/components/ui/accordion';
import type { CategoryNode } from '@/lib/repositories/interfaces/catalog';

interface MobileNavAccordionProps {
  open: boolean;
  onClose: () => void;
  categories: CategoryNode[];
}

export function MobileNavAccordion({ open, onClose, categories }: MobileNavAccordionProps) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      side="left"
      title="Menú Farmacias Vertical"
      description="Explora categorías y servicios"
    >
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/subir-receta"
            onClick={onClose}
            className="bg-accent flex items-center justify-center gap-1.5 rounded-[var(--radius-control)] px-3 py-2.5 text-xs font-bold text-white"
          >
            <FileUp className="h-4 w-4" />
            Subir Receta
          </Link>
          <Link
            href="/cuenta"
            onClick={onClose}
            className="border-border bg-surface-muted text-ink flex items-center justify-center gap-1.5 rounded-[var(--radius-control)] border px-3 py-2.5 text-xs font-bold"
          >
            <User className="h-4 w-4" />
            Mi Cuenta
          </Link>
        </div>

        <div>
          <p className="text-ink-muted mb-1 text-xs font-bold tracking-wider uppercase">
            Categorías (3 niveles)
          </p>
          {categories.map((lvl1) => (
            <AccordionItem key={lvl1.id} title={lvl1.name}>
              <div className="space-y-3 pl-2">
                <Link
                  href={`/c/${lvl1.path}`}
                  onClick={onClose}
                  className="text-secondary block text-xs font-bold hover:underline"
                >
                  Ver todo en {lvl1.name} →
                </Link>
                {lvl1.children.map((lvl2) => (
                  <AccordionItem key={lvl2.id} title={lvl2.name} className="border-border/60 pl-2">
                    <ul className="space-y-1.5 pl-2">
                      <li>
                        <Link
                          href={`/c/${lvl2.path}`}
                          onClick={onClose}
                          className="text-primary block py-1 text-xs font-semibold"
                        >
                          Todo en {lvl2.name}
                        </Link>
                      </li>
                      {lvl2.children.map((lvl3) => (
                        <li key={lvl3.id}>
                          <Link
                            href={`/c/${lvl3.path}`}
                            onClick={onClose}
                            className="text-ink-muted hover:text-ink block py-1 text-xs"
                          >
                            {lvl3.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                ))}
              </div>
            </AccordionItem>
          ))}
        </div>

        <div className="border-border space-y-2 border-t pt-4">
          <Link
            href="/programas"
            onClick={onClose}
            className="text-ink hover:bg-surface-muted flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold"
          >
            <Tag className="text-secondary h-4 w-4" />
            Programas y Convenios
          </Link>
          <Link
            href="/club"
            onClick={onClose}
            className="text-ink hover:bg-surface-muted flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold"
          >
            <Sparkles className="text-primary h-4 w-4" />
            Club Vertical (RUT)
          </Link>
          <Link
            href="/blog"
            onClick={onClose}
            className="text-ink hover:bg-surface-muted flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold"
          >
            <BookOpen className="text-ink-muted h-4 w-4" />
            Blog de Salud
          </Link>
        </div>
      </div>
    </Sheet>
  );
}
