'use client';

import * as React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatRut, validateRut } from '@/lib/chile/rut';

export default function ClubVerticalPage() {
  const [rut, setRut] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateRut(rut)) {
      setError('El RUT ingresado no tiene un dígito verificador válido.');
      return;
    }
    if (!email.includes('@')) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }
    if (phone.replace(/[^0-9]/g, '').length < 8) {
      setError('Ingresa un número de celular chileno válido (ej. +56 9 1234 5678).');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="border-border bg-surface rounded-[var(--radius-card)] border p-6 shadow-[var(--shadow-card)] sm:p-8">
        <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
          <Sparkles className="h-3.5 w-3.5" />
          Club Farmacias Vertical (Preview validación RUT)
        </span>
        <h1 className="font-display text-ink mt-3 text-3xl font-extrabold">
          Regístrate en el Club Vertical
        </h1>
        <p className="text-ink-muted mt-2 text-sm">
          Los datos personales (RUT y teléfono) se almacenarán cifrados en reposo en Fase 3 y no se
          registran en logs.
        </p>

        {submitted ? (
          <div className="border-primary/30 bg-primary/5 mt-6 rounded-lg border p-5">
            <p className="font-display text-primary flex items-center gap-2 text-base font-bold">
              <CheckCircle2 className="h-5 w-5" />
              Validación local exitosa (RUT {formatRut(rut)})
            </p>
            <p className="text-ink-muted mt-1 text-sm">
              La persistencia cifrada en base de datos se activa en Fase 3 junto al módulo de
              fidelización.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="club-rut" className="text-ink block text-xs font-bold">
                RUT chileno
              </label>
              <Input
                id="club-rut"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                onBlur={() => {
                  if (rut.trim()) setRut(formatRut(rut));
                }}
                placeholder="12.345.678-5"
                required
                className="mt-1 font-mono"
              />
            </div>

            <div>
              <label htmlFor="club-email" className="text-ink block text-xs font-bold">
                Correo electrónico
              </label>
              <Input
                id="club-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@correo.cl"
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="club-phone" className="text-ink block text-xs font-bold">
                Celular
              </label>
              <Input
                id="club-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+56 9 8765 4321"
                required
                className="mt-1 font-mono"
              />
            </div>

            {error ? <p className="text-promo text-xs font-semibold">{error}</p> : null}

            <Button type="submit" size="lg" className="w-full">
              Validar e inscribirme
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
