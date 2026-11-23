import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-tight',
  {
    variants: {
      variant: {
        default: 'bg-surface-muted text-ink',
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        promo: 'bg-promo text-white',
        isp: 'bg-isp text-white',
        outline: 'border border-border bg-surface text-ink-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
