import type { Metadata } from 'next';
import { ProposalView } from '@/components/proposal/ProposalView';

export const metadata: Metadata = {
  title: 'Propuesta de Inversión y Plan de Implementación — Farmacias Vertical',
  description:
    'Propuesta comercial por etapas, flujo operativo, plan de reunión de trabajo y cronograma de inversión para Farmacias Vertical.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PropuestaPage() {
  return <ProposalView />;
}
