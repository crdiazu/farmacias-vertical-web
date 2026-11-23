'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
}

export function Sheet({ open, onClose, title, description, side = 'right', children }: SheetProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label="Cerrar panel"
        onClick={onClose}
        className="bg-ink/50 fixed inset-0 backdrop-blur-[2px]"
      />
      <div
        className={cn(
          'bg-surface relative z-10 flex h-full w-full max-w-md flex-col shadow-2xl',
          side === 'right' ? 'border-border ml-auto border-l' : 'border-border mr-auto border-r',
        )}
      >
        <div className="border-border flex items-start justify-between gap-4 border-b px-5 py-4">
          <div>
            <h2 className="font-display text-ink text-lg font-bold">{title}</h2>
            {description ? <p className="text-ink-muted mt-0.5 text-xs">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-ink-muted hover:bg-surface-muted hover:text-ink rounded-md p-1.5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
