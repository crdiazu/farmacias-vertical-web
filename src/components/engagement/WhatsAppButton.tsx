'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const sanitized = phoneNumber.replace(/[^0-9]/g, '');
  if (!sanitized || sanitized === '56900000000') {
    return (
      <a
        href="#atencion-meson"
        aria-label="Consultar disponibilidad en mesón (WhatsApp configurable)"
        title="Configura NEXT_PUBLIC_WHATSAPP_NUMBER en .env.local / Vercel"
        className="bg-primary hover:bg-primary-hover fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Consulta Mesón</span>
      </a>
    );
  }

  const href = `https://wa.me/${sanitized}?text=${encodeURIComponent(
    'Hola Farmacias Vertical, quisiera consultar disponibilidad de un producto en mesón.',
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp a Farmacias Vertical"
      className="bg-primary hover:bg-primary-hover fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp Mesón</span>
    </a>
  );
}
