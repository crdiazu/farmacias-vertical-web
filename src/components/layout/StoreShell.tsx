'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface StoreShellProps {
  announcement: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  overlays: ReactNode;
  children: ReactNode;
}

export function StoreShell({ announcement, header, footer, overlays, children }: StoreShellProps) {
  const pathname = usePathname();

  if (pathname?.startsWith('/propuesta')) {
    return <>{children}</>;
  }

  return (
    <>
      {announcement}
      {header}
      <main className="min-h-[60vh]">{children}</main>
      {footer}
      {overlays}
    </>
  );
}
