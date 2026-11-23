import { ShieldCheck, Truck, Store, Stethoscope } from 'lucide-react';

const BENEFITS = [
  {
    icon: Store,
    title: 'Farmacia física establecida',
    desc: 'Retiro gratis en mesón y respaldo de establecimiento real.',
  },
  {
    icon: Truck,
    title: 'Despacho RM y regiones',
    desc: 'Cobertura comunal y envíos por pagar o tarifa plana a todo Chile.',
  },
  {
    icon: Stethoscope,
    title: 'Orientación farmacéutica',
    desc: 'Revisión profesional de recetas y consultas con Químico Farmacéutico.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparencia normativa ISP',
    desc: 'Resguardo de datos sensibles y cumplimiento DS 466 / Decreto 58.',
  },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6" aria-label="Beneficios principales">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="border-border bg-surface flex items-start gap-3 rounded-[var(--radius-card)] border p-4"
            >
              <div className="bg-surface-muted text-primary rounded-lg p-2.5">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-ink text-sm font-bold">{item.title}</h2>
                <p className="text-ink-muted mt-0.5 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
