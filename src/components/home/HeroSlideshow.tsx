'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: 'slide-dermo',
    eyebrow: 'Dermocosmética & Cuidado Diario',
    title: 'Tu farmacia cercana, ahora con tienda online rápida y clara.',
    description:
      'Explora dermocosmética, higiene, cuidado capilar y vitaminas disponibles hoy para compra directa con retiro en mesón o despacho.',
    ctaLabel: 'Ver Dermocosmética',
    ctaHref: '/c/dermocosmetica',
    imageUrl: '/placeholders/hero-dermo.svg',
  },
  {
    id: 'slide-bienestar',
    eyebrow: 'Vitaminas, Minerales & Botiquín',
    title: 'Bienestar cotidiano con respaldo farmacéutico profesional.',
    description:
      'Catálogo demostrativo preparado para sincronización ágil de inventario, precios en CLP y atención personalizada.',
    ctaLabel: 'Explorar Bienestar',
    ctaHref: '/c/vitaminas-bienestar',
    imageUrl: '/placeholders/hero-bienestar.svg',
  },
  {
    id: 'slide-programas',
    eyebrow: 'Club Vertical & Convenios',
    title: 'Beneficios para vecinos y convenios locales con tu RUT.',
    description:
      'Regístrate en el Club Vertical o revisa nuestras plantillas de programas y descuentos preferenciales.',
    ctaLabel: 'Conocer Club Vertical',
    ctaHref: '/club',
    imageUrl: '/placeholders/hero-isp.svg',
  },
];

interface HeroSlideshowProps {
  whatsappNumber: string;
}

export function HeroSlideshow({ whatsappNumber }: HeroSlideshowProps) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const currentSlide = SLIDES[active] ?? SLIDES[0]!;
  const sanitized = whatsappNumber.replace(/[^0-9]/g, '');
  const wspHref =
    sanitized && sanitized !== '56900000000'
      ? `https://wa.me/${sanitized}?text=${encodeURIComponent(
          'Hola Farmacias Vertical, quisiera consultar disponibilidad de un medicamento en mesón.',
        )}`
      : '/c/medicamentos';

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6">
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="bg-ink relative overflow-hidden rounded-[var(--radius-card)] text-white shadow-lg lg:col-span-8">
          <div className="relative min-h-[320px] sm:min-h-[360px]">
            <Image
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="relative z-10 flex h-full min-h-[320px] max-w-xl flex-col justify-between p-6 sm:min-h-[360px] sm:p-9">
              <div>
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider text-emerald-200 uppercase backdrop-blur-xs">
                  {currentSlide.eyebrow}
                </span>
                <h1 className="font-display mt-4 text-2xl leading-tight font-extrabold sm:text-4xl">
                  {currentSlide.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {currentSlide.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={currentSlide.ctaHref}
                  className={buttonVariants({
                    variant: 'primary',
                    size: 'lg',
                    className: 'bg-emerald-600 hover:bg-emerald-500',
                  })}
                >
                  {currentSlide.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Banner anterior"
                    onClick={() => setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
                    className="rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div
                    className="flex items-center gap-1.5"
                    role="tablist"
                    aria-label="Diapositivas"
                  >
                    {SLIDES.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        role="tab"
                        aria-selected={idx === active}
                        aria-label={`Ir a banner ${idx + 1}`}
                        onClick={() => setActive(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === active ? 'w-6 bg-white' : 'w-2 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-label="Banner siguiente"
                    onClick={() => setActive((prev) => (prev + 1) % SLIDES.length)}
                    className="rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside
          id="atencion-meson"
          className="border-isp/25 bg-surface flex flex-col justify-between rounded-[var(--radius-card)] border p-6 shadow-[var(--shadow-card)] lg:col-span-4"
        >
          <div>
            <div className="bg-isp/10 text-isp inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
              <ShieldCheck className="h-4 w-4" />
              Acreditación ISP en curso
            </div>
            <h2 className="font-display text-ink mt-3 text-xl font-extrabold">
              Medicamentos disponibles en mesón presencial
            </h2>
            <p className="text-ink-muted mt-2 text-sm leading-relaxed">
              Hoy puedes comprar online toda nuestra línea de{' '}
              <strong className="text-ink">dermocosmética, cuidado personal y vitaminas</strong>. La
              venta web de medicamentos se encuentra en proceso de habilitación ante el ISP (DS N°
              466 / Decreto N° 58).
            </p>
          </div>

          <div className="border-border mt-5 space-y-2.5 border-t pt-4">
            <Link
              href={wspHref}
              target={wspHref.startsWith('http') ? '_blank' : undefined}
              rel={wspHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={buttonVariants({ variant: 'secondary', size: 'md', className: 'w-full' })}
            >
              <MessageCircle className="h-4 w-4" />
              Consultar fármaco en mesón
            </Link>
            <Link
              href="/subir-receta"
              className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-full' })}
            >
              Flujo de carga de receta (Preview)
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
