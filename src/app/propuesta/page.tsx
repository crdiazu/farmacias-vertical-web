import type { Metadata } from 'next';
import { ProposalView } from '@/components/proposal/ProposalView';

export const metadata: Metadata = {
  title: {
    absolute: 'Propuesta E-Commerce & ISP — Farmacias Vertical',
  },
  description:
    'Para Giordan Miranda: plan en 2 etapas, maqueta en vivo, flujo GOLAN/Webpay y agenda (35 min).',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: '/propuesta',
    siteName: 'MarketingCloud Chile · Farmacias Vertical',
    title: 'Propuesta E-Commerce & ISP — Farmacias Vertical',
    description:
      'Para Giordan Miranda: plan en 2 etapas, maqueta en vivo, flujo GOLAN/Webpay y agenda (35 min).',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Propuesta E-Commerce & ISP — Farmacias Vertical',
    description:
      'Para Giordan Miranda: plan en 2 etapas, maqueta en vivo, flujo GOLAN/Webpay y agenda (35 min).',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PropuestaPage() {
  return <ProposalView />;
}
