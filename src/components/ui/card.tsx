import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-border bg-surface rounded-[var(--radius-card)] border shadow-[var(--shadow-card)]',
        className,
      )}
      {...props}
    />
  );
}
