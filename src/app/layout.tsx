import type { Metadata } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans, Source_Sans_3 } from 'next/font/google';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/components/cart/CartProvider';
import { WhatsAppButton } from '@/components/engagement/WhatsAppButton';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { StoreShell } from '@/components/layout/StoreShell';
import { getAppConfig } from '@/lib/config/env';
import { getCatalogRepository } from '@/lib/repositories';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const config = getAppConfig();

export const metadata: Metadata = {
  metadataBase: new URL(config.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'Farmacias Vertical | Dermocosmética, Bienestar y Atención Farmacéutica en Chile',
    template: '%s | Farmacias Vertical',
  },
  description:
    'Tienda online de Farmacias Vertical: dermocosmética, cuidado capilar, higiene, suplementos y orientación farmacéutica en Chile.',
  alternates: {
    canonical: '/',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const repo = getCatalogRepository();
  const categories = await repo.getCategoryTree();

  return (
    <html
      lang="es-CL"
      className={`${plusJakartaSans.variable} ${sourceSans3.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-ink min-h-screen">
        <CartProvider>
          <StoreShell
            announcement={<AnnouncementBar />}
            header={<Header categories={categories} />}
            footer={<Footer />}
            overlays={
              <>
                <CartDrawer />
                <WhatsAppButton phoneNumber={config.NEXT_PUBLIC_WHATSAPP_NUMBER} />
              </>
            }
          >
            {children}
          </StoreShell>
        </CartProvider>
      </body>
    </html>
  );
}
