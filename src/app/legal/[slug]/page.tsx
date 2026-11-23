import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

const LEGAL_TOPICS: Record<string, { title: string; summary: string }> = {
  'informacion-reglamentaria': {
    title: 'Información Reglamentaria ISP (Borrador)',
    summary:
      'Referencia estructural para cumplimiento del Decreto Supremo N° 466 (modificado por Decreto N° 58) y Decreto Supremo N° 3, además de visualización permanente del fono toxicológico CITUC (+56 2 2635 3800).',
  },
  privacidad: {
    title: 'Política de Privacidad y Retención de Datos (Borrador)',
    summary:
      'Documento base conforme a Ley N° 19.628 / Ley N° 21.719 y Ley N° 20.584 sobre resguardo de RUT, direcciones, teléfonos y recetas médicas cifradas en reposo con plazo de retención parametrizable.',
  },
  terminos: {
    title: 'Términos y Condiciones de Uso (Borrador)',
    summary:
      'Plantilla sujeta a revisión legal definitiva para despacho comunal, retiro en mesón, devoluciones y condiciones de expendio farmacéutico.',
  },
  'libro-reclamos': {
    title: 'Libro de Reclamos y Consultas Farmacéuticas (Preview)',
    summary:
      'En Fase 3/4 este módulo permitirá ingresar reclamos, sugerencias y consultas derivadas directamente al Director Técnico Químico Farmacéutico.',
  },
};

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = LEGAL_TOPICS[slug] ?? {
    title: 'Documento Legal (Borrador)',
    summary: 'Sección informativa de referencia en preparación.',
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="border-border bg-surface rounded-[var(--radius-card)] border p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
          <ShieldAlert className="h-3.5 w-3.5" />
          Requiere revisión de Director Técnico QF y Asesor Legal
        </div>
        <h1 className="font-display text-ink mt-3 text-3xl font-extrabold">{topic.title}</h1>
        <p className="text-ink-muted mt-3 text-sm leading-relaxed">{topic.summary}</p>
        <p className="text-ink-muted mt-4 text-xs">
          Nota: Ningún texto de esta pantalla constituye asesoría legal ni documento definitivo de
          cumplimiento sanitario.
        </p>
        <Link
          href="/"
          className="text-secondary mt-6 inline-block text-sm font-bold hover:underline"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
