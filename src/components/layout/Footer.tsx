'use client';

import * as React from 'react';
import Link from 'next/link';
import { PhoneCall, ExternalLink, ShieldAlert, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const [email, setEmail] = React.useState('');
  const [statusMsg, setStatusMsg] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string };
      setStatusMsg(
        data.message ?? 'Revisa tu correo para confirmar tu suscripción (doble opt-in).',
      );
      if (res.ok) setEmail('');
    } catch {
      setStatusMsg('No pudimos procesar la solicitud en este momento.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="border-border bg-ink mt-16 border-t text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-white">Farmacias Vertical</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Farmacia comunitaria enfocada en dermocosmética, bienestar y atención farmacéutica
              cercana en mesón y canales digitales.
            </p>
            <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3 text-xs text-slate-300">
              <p className="font-semibold text-white">Sucursal Física (Placeholder)</p>
              <p>Dirección por confirmar con cliente · Chile</p>
              <p>Horario mesón: Lun–Vie 09:00–20:00 · Sáb 10:00–14:00</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Categorías y Servicios
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/c/dermocosmetica" className="hover:text-white">
                  Dermocosmética
                </Link>
              </li>
              <li>
                <Link href="/c/cuidado-capilar" className="hover:text-white">
                  Cuidado Capilar
                </Link>
              </li>
              <li>
                <Link href="/c/cuidado-personal" className="hover:text-white">
                  Cuidado Personal e Insumos
                </Link>
              </li>
              <li>
                <Link href="/c/vitaminas-bienestar" className="hover:text-white">
                  Vitaminas y Bienestar
                </Link>
              </li>
              <li>
                <Link href="/programas" className="hover:text-white">
                  Programas y Convenios
                </Link>
              </li>
              <li>
                <Link href="/club" className="hover:text-white">
                  Club Vertical (RUT)
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Marco Normativo ISP &amp; Ayuda
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/legal/informacion-reglamentaria" className="hover:text-white">
                  Información Reglamentaria (DS 466 / DS 3)
                </Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="hover:text-white">
                  Política de Privacidad y Retención de Datos
                </Link>
              </li>
              <li>
                <Link href="/legal/terminos" className="hover:text-white">
                  Términos y Condiciones (Borrador)
                </Link>
              </li>
              <li>
                <Link href="/legal/libro-reclamos" className="hover:text-white">
                  Libro de Reclamos y Consultas QF
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href="https://www.bcn.cl/leychile/navegar?idNorma=13613"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-300 hover:underline"
                >
                  Decreto Supremo N° 466 (BCN)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bcn.cl/leychile/navegar?idNorma=1026879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-300 hover:underline"
                >
                  Decreto Supremo N° 3 (BCN)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>

            <div className="rounded-lg border border-sky-800 bg-sky-950/60 p-3 text-xs">
              <p className="flex items-center gap-1.5 font-bold text-sky-200">
                <PhoneCall className="h-3.5 w-3.5" />
                Fono Emergencias Toxicológicas
              </p>
              <p className="mt-1 text-slate-200">
                CITUC: <strong className="font-mono">+56 2 2635 3800</strong>
              </p>
              <p className="text-slate-300">
                Salud Responde: <strong className="font-mono">600 360 7777</strong>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Newsletter (Doble Opt-In)
            </h4>
            <p className="text-xs text-slate-300">
              Recibe novedades de dermocuidado y convenios. Confirmación por correo electrónico
              antes de activar el envío.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.cl"
                aria-label="Correo electrónico para newsletter"
                className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-400"
              />
              <Button type="submit" disabled={submitting} className="w-full" size="sm">
                <MailCheck className="h-4 w-4" />
                {submitting ? 'Enviando...' : 'Suscribirme'}
              </Button>
            </form>
            {statusMsg ? <p className="text-xs text-emerald-300">{statusMsg}</p> : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-2">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <p>
              <strong>Aviso de Fase 1 (Placeholder):</strong> Catálogo demostrativo y textos
              legales/regulatorios referenciales. Sujetos a revisión y aprobación formal del
              Director Técnico Químico Farmacéutico y Asesor Legal antes de operar venta de
              medicamentos online.
            </p>
          </div>
          <p className="shrink-0">© {new Date().getFullYear()} Farmacias Vertical · Chile</p>
        </div>
      </div>
    </footer>
  );
}
