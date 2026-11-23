'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className={cn('border-border border-b', className)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="text-ink hover:text-primary flex w-full items-center justify-between py-3 text-left text-sm font-semibold"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            'text-ink-muted h-4 w-4 shrink-0 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open ? <div className="pb-3">{children}</div> : null}
    </div>
  );
}
