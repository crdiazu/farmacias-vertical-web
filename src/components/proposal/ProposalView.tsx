'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Circle,
  ExternalLink,
  FileCheck2,
  Globe,
  Mail,
  MessageCircle,
  Printer,
  ShieldCheck,
  Store,
  TrendingUp,
} from 'lucide-react';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MEETING_AGENDA = [
  {
    block: '1. Revisión de Maqueta',
    duration: '8 min',
    focus: 'Recorrido por farmacias-vertical-web.vercel.app',
    outcome: 'Validar estructura, categorías y aprobar línea visual (logo y colores).',
  },
  {
    block: '2. Dominio y Correos',
    duration: '8 min',
    focus: 'Accesos a NIC.cl y hosting actual',
    outcome: 'Coordinar conexión de farmaciasvertical.cl y creación de las 3 casillas.',
  },
  {
    block: '3. Operación y Despacho',
    duration: '10 min',
    focus: 'WhatsApp comercial, retiro en local y reparto',
    outcome: 'Definir número oficial, horarios de mesón y tarifas de envío o retiro gratis.',
  },
  {
    block: '4. Catálogo y Roadmap',
    duration: '9 min',
    focus: 'Planilla de 50 productos + fechas ISP / GOLAN',
    outcome: 'Acordar envío de fotos/precios propios y fecha de arranque (Semana 1–2).',
  },
];

const MEETING_CHECKLIST = [
  { id: 'brand', label: 'Logo oficial y colores corporativos de Farmacias Vertical' },
  { id: 'nic', label: 'Acceso / delegación técnica de NIC.cl y panel de correos actual' },
  { id: 'wsp', label: 'Número de WhatsApp comercial para pedidos y consultas de mesón' },
  { id: 'shipping', label: 'Modalidad de entrega (retiro en local, despacho comunal o por pagar)' },
  {
    id: 'catalog',
    label: 'Validación de los primeros 50 productos libres de receta (precios y fotos)',
  },
];

const PAYMENT_SCHEDULE = [
  {
    phase: 'Mes 1 · Arranque',
    timing: 'Semana 1–2',
    uf: '4 UF',
    clp: '~$165.400 CLP',
    deliverable:
      'Plataforma inicial operativa + creación de correos corporativos + carga de 50 productos curados + conexión farmaciasvertical.cl + seguridad SSL + Google Maps (GEO SEO).',
  },
  {
    phase: 'Mes 2 · Diciembre',
    timing: 'Paralelo',
    uf: '3 UF',
    clp: '~$124.100 CLP',
    deliverable:
      'Mantención + tienda transaccional + filtros y cuentas de clientes + conexión Transbank Webpay Plus (débito/crédito) + inicio enlace técnico con ERP GOLAN.',
  },
  {
    phase: 'Mes 3 · Enero–Febrero',
    timing: 'Fase 2 ISP',
    uf: '2 UF',
    clp: '~$82.700 CLP',
    deliverable:
      'Mantención + flujo de medicamentos ISP, carga y revisión QF de recetas, clasificación DS 466/58, Club RUT y pruebas GOLAN.',
  },
  {
    phase: 'Mes 4 · Cierre',
    timing: 'Operación Plena',
    uf: '1 UF',
    clp: '~$41.400 CLP',
    deliverable:
      'Auditoría final de flujos de compra y receta, estabilización en producción y transición a mantención continua.',
  },
];

export function ProposalView() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="bg-bg text-ink min-h-screen print:bg-white">
      {/* Barra superior fija (oculta al imprimir PDF) */}
      <div className="border-border bg-surface/95 sticky top-0 z-40 border-b backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Propuesta Comercial
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              <Globe className="text-primary h-4 w-4" />
              Ver Maqueta Tienda
            </Link>
            <Button type="button" variant="secondary" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Imprimir / Guardar PDF
            </Button>
            <a
              href="https://wa.me/56949438288?text=Hola%20Cristi%C3%A1n%2C%20revis%C3%A9%20la%20propuesta%20de%20Farmacias%20Vertical."
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'primary', size: 'sm' })}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 print:max-w-none print:space-y-6 print:py-4">
        {/* Encabezado Ejecutivo */}
        <section className="border-border bg-surface overflow-hidden rounded-[var(--radius-card)] border shadow-[var(--shadow-card)] print:shadow-none">
          <div className="bg-ink px-6 py-7 text-white sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider text-emerald-200 uppercase">
                Propuesta de Inversión &amp; Plan de Implementación
              </span>
              <span className="font-mono text-xs text-slate-300">
                23 de Noviembre de 2026 · UF Ref. $41.357 CLP
              </span>
            </div>
            <h1 className="font-display mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl">
              E-Commerce por Etapas &amp; Habilitación ISP — Farmacias Vertical
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-200 sm:text-base">
              Solución pensada para salir vendiendo rápido sin duplicar costos de hosting ni pagar
              comisiones en dólares, cuidando el control administrativo, contable y sanitario ante
              el ISP.
            </p>
          </div>

          <div className="border-border bg-surface-muted/40 grid gap-4 border-b px-6 py-4 text-xs sm:grid-cols-4 sm:px-8">
            <div>
              <p className="text-ink-muted font-bold tracking-wider uppercase">Cliente</p>
              <p className="text-ink mt-0.5 font-semibold">
                Farmacias Vertical (farmaciasvertical.cl)
              </p>
            </div>
            <div>
              <p className="text-ink-muted font-bold tracking-wider uppercase">Atención</p>
              <p className="text-ink mt-0.5 font-semibold">Giordan Miranda (Contador Auditor)</p>
            </div>
            <div>
              <p className="text-ink-muted font-bold tracking-wider uppercase">Consultoría</p>
              <p className="text-ink mt-0.5 font-semibold">MarketingCloud Chile · Cristián Díaz</p>
            </div>
            <div>
              <p className="text-ink-muted font-bold tracking-wider uppercase">
                Valor UF Referencial
              </p>
              <p className="text-ink mt-0.5 font-mono font-bold">$41.357 CLP (Banco Central)</p>
            </div>
          </div>

          {/* Banner Demo en vivo + KPIs */}
          <div className="p-6 sm:p-8">
            <div className="border-primary/25 bg-primary/5 flex flex-col justify-between gap-4 rounded-[var(--radius-control)] border p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-primary text-xs font-extrabold tracking-wider uppercase">
                  Maqueta en vivo ya disponible
                </p>
                <p className="text-ink mt-1 text-sm">
                  Ya puedes recorrer la primera maqueta funcional de la tienda (con productos de
                  muestra y módulo preventivo ISP). Sobre esta misma base vestiremos tu logo,
                  colores oficiales y catálogo real.
                </p>
                <a
                  href="https://farmacias-vertical-web.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary mt-2 inline-flex items-center gap-1.5 font-mono text-xs font-bold hover:underline"
                >
                  https://farmacias-vertical-web.vercel.app/
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <Link
                href="/"
                className={buttonVariants({
                  variant: 'primary',
                  size: 'md',
                  className: 'shrink-0 print:hidden',
                })}
              >
                Abrir Maqueta
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="border-border bg-surface rounded-[var(--radius-control)] border p-4">
                <p className="text-ink-muted text-xs font-semibold">Inversión Total Proyecto</p>
                <p className="text-ink mt-1 font-mono text-2xl font-extrabold">10 UF neto</p>
                <p className="text-ink-muted mt-0.5 text-xs">
                  En 4 cuotas decrecientes (4 → 3 → 2 → 1 UF)
                </p>
              </div>
              <div className="border-border bg-surface rounded-[var(--radius-control)] border p-4">
                <p className="text-ink-muted text-xs font-semibold">Primera Salida Comercial</p>
                <p className="font-display text-primary mt-1 text-2xl font-extrabold">Semana 1–2</p>
                <p className="text-ink-muted mt-0.5 text-xs">
                  Correos corporativos + 50 productos sin restricción ISP
                </p>
              </div>
              <div className="border-border bg-surface rounded-[var(--radius-control)] border p-4">
                <p className="text-ink-muted text-xs font-semibold">Comisiones por Venta</p>
                <p className="text-secondary mt-1 font-mono text-2xl font-extrabold">0% USD</p>
                <p className="text-ink-muted mt-0.5 text-xs">
                  Sin fees de Shopify en dólares; abono directo a tu cuenta
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Estrategia en Dos Etapas */}
        <section className="space-y-4">
          <div>
            <p className="text-primary text-xs font-bold tracking-wider uppercase">Sección 1</p>
            <h2 className="font-display text-ink text-2xl font-extrabold">
              Estrategia en Dos Etapas (Cero Gastos Duplicados)
            </h2>
            <p className="text-ink-muted mt-1 text-sm">
              Aprovechamos el dominio <strong>farmaciasvertical.cl</strong> (NIC.cl), su hosting de
              correos actual y su sistema <strong>ERP GOLAN</strong> en una transición ordenada.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Card className="p-6">
              <Badge variant="primary">Etapa 1 · Semana 1–2</Badge>
              <h3 className="font-display text-ink mt-3 text-xl font-bold">
                Salida Rápida, Correos y Venta Libre de Restricción ISP
              </h3>
              <p className="text-ink-muted mt-1.5 text-xs font-semibold">
                Objetivo: Empezar a vender online de inmediato y estrenar imagen profesional.
              </p>
              <ul className="text-ink mt-4 space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Correos Corporativos desde cero (Valor Agregado):</strong> contacto@,
                    ventas@ y recetas@farmaciasvertical.cl configurados sin caer en spam.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Store className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Tienda en farmaciasvertical.cl:</strong> Buscador instantáneo,
                    categorías claras y certificado SSL (candado verde).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>50 productos curados + Planilla Google Sheets:</strong> Actualizas
                    precios y stock desde el celular (Dermocosmética, Capilar, Higiene e Insumos).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Pedidos a WhatsApp + Aviso ISP:</strong> El cliente envía su carro al
                    mesón (sin comisiones) y el recuadro normativo deriva consultas de fármacos al
                    local.
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Badge variant="secondary">Etapa 2 · Mes 2 → Mes 3 / Febrero</Badge>
              <h3 className="font-display text-ink mt-3 text-xl font-bold">
                Webpay Plus, ERP GOLAN y Habilitación ISP
              </h3>
              <p className="text-ink-muted mt-1.5 text-xs font-semibold">
                Objetivo: Escalar sobre la misma tienda sin rehacer la web.
              </p>
              <ul className="text-ink mt-4 space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-secondary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Mes 2 · Pagos con Tarjeta:</strong> Conexión de Transbank Webpay Plus
                    (Redcompra, débito, crédito y prepago) con abono directo a tu cuenta bancaria.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-secondary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Mes 2 · Enlace ERP GOLAN:</strong> Coordinación con soporte GOLAN para
                    actualizar precios y stock automáticamente desde la sucursal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FileCheck2 className="text-isp mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Mes 3 · Módulo Seguro de Recetas ISP:</strong> Carga privada de receta y
                    aprobación del Químico Farmacéutico antes de despachar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="text-isp mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Mes 3 · Cumplimiento DS 466 / Decreto 58:</strong> Venta Directa, Receta
                    Simple, Receta Retenida, bloqueo de Receta Cheque, CITUC y Libro de Reclamos
                    *(sujeto a visado de Director Técnico y Asesor Legal)*.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 2. Cómo se Conectan las Partes */}
        <section className="border-border bg-surface rounded-[var(--radius-card)] border p-6 shadow-[var(--shadow-card)] sm:p-8 print:shadow-none">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-secondary text-xs font-bold tracking-wider uppercase">Sección 2</p>
              <h2 className="font-display text-ink mt-1 text-2xl font-extrabold">
                Cómo se Conectan las Partes (Flujo Operativo y Contable)
              </h2>
              <p className="text-ink-muted mt-1 text-sm">
                Así circula cada pedido desde que el vecino entra a la web hasta que emites la
                boleta electrónica SII en mostrador:
              </p>
            </div>
            <a
              href="/diagrams/flujo-farmacias-vertical.html?theme=light"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-surface-muted text-secondary hover:bg-surface inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border px-3 py-1.5 text-xs font-semibold print:hidden"
            >
              Abrir diagrama en pantalla completa
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="border-border mt-5 overflow-hidden rounded-lg border bg-white print:hidden">
            <iframe
              src="/diagrams/flujo-farmacias-vertical.html?theme=light"
              title="Flujo Operativo y Contable — Farmacias Vertical"
              className="h-[580px] w-full border-0 bg-white sm:h-[640px]"
              loading="lazy"
            />
          </div>

          <div className="mt-6 hidden gap-3 print:grid print:grid-cols-4">
            <div className="border-border bg-surface-muted/50 rounded-lg border p-4">
              <span className="text-primary font-mono text-xs font-bold">PASO 1 · CLIENTE</span>
              <h3 className="font-display text-ink mt-1 text-sm font-bold">
                Entra a farmaciasvertical.cl
              </h3>
              <p className="text-ink-muted mt-1 text-xs">
                Busca por producto, marca o categoría desde su celular o computador.
              </p>
            </div>

            <div className="border-border bg-surface-muted/50 rounded-lg border p-4">
              <span className="text-primary font-mono text-xs font-bold">PASO 2 · CATÁLOGO</span>
              <h3 className="font-display text-ink mt-1 text-sm font-bold">
                Precios y Stock al Día
              </h3>
              <p className="text-ink-muted mt-1 text-xs">
                Alimentado desde planilla Google Sheets en Etapa 1 y desde ERP GOLAN en Etapa 2.
              </p>
            </div>

            <div className="border-border bg-surface-muted/50 rounded-lg border p-4">
              <span className="text-secondary font-mono text-xs font-bold">PASO 3 · PAGO / RX</span>
              <h3 className="font-display text-ink mt-1 text-sm font-bold">Validación y Cobro</h3>
              <p className="text-ink-muted mt-1 text-xs">
                WhatsApp en Etapa 1 · Webpay Plus directo en Mes 2 · Revisión de receta por QF en
                Mes 3.
              </p>
            </div>

            <div className="border-primary/40 bg-primary/5 rounded-lg border p-4">
              <span className="text-primary font-mono text-xs font-bold">PASO 4 · CIERRE SII</span>
              <h3 className="font-display text-ink mt-1 text-sm font-bold">GOLAN POS + Entrega</h3>
              <p className="text-ink-muted mt-1 text-xs">
                Rebajas inventario oficial, emites boleta electrónica SII y entregas en mesón o
                despacho.
              </p>
            </div>
          </div>

          <div className="border-border text-ink-muted mt-5 grid gap-3 border-t pt-5 text-xs sm:grid-cols-2">
            <p>
              <strong className="text-ink">1. Control de inventario:</strong> Sin doble digitación
              al enlazar GOLAN en Mes 2.
            </p>
            <p>
              <strong className="text-ink">2. Flujo de caja directo:</strong> El dinero ingresa
              directamente a la cuenta de Farmacias Vertical.
            </p>
            <p>
              <strong className="text-ink">3. Resguardo de recetas:</strong> Almacenamiento privado
              cifrado, visible solo para el Químico Farmacéutico.
            </p>
            <p>
              <strong className="text-ink">4. Orden tributario:</strong> La boleta electrónica se
              emite normalmente desde GOLAN POS.
            </p>
          </div>
        </section>

        {/* 3. Plan de Reunión de Trabajo */}
        <section className="border-border bg-surface rounded-[var(--radius-card)] border p-6 shadow-[var(--shadow-card)] sm:p-8 print:shadow-none">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-primary text-xs font-bold tracking-wider uppercase">Sección 3</p>
              <h2 className="font-display text-ink mt-1 text-2xl font-extrabold">
                Plan de Reunión de Trabajo (35 minutos)
              </h2>
            </div>
            <span className="bg-surface-muted text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
              <CalendarClock className="text-secondary h-4 w-4" />
              Sesión operativa para destrabar arranque
            </span>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-border text-ink-muted border-b text-xs tracking-wider uppercase">
                  <th className="py-2.5 pr-4">Bloque</th>
                  <th className="py-2.5 pr-4">Tiempo</th>
                  <th className="py-2.5 pr-4">Qué revisamos</th>
                  <th className="py-2.5">Qué dejamos resuelto</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {MEETING_AGENDA.map((row) => (
                  <tr key={row.block}>
                    <td className="text-ink py-3 pr-4 font-bold">{row.block}</td>
                    <td className="text-secondary py-3 pr-4 font-mono text-xs font-semibold">
                      {row.duration}
                    </td>
                    <td className="text-ink-muted py-3 pr-4">{row.focus}</td>
                    <td className="text-ink py-3">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-border bg-surface-muted/40 mt-6 rounded-lg border p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-ink text-sm font-bold">
                Checklist rápido para cerrar en la reunión
              </h3>
              <span className="text-primary font-mono text-xs font-bold">
                {completedCount}/{MEETING_CHECKLIST.length} listos
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {MEETING_CHECKLIST.map((item) => {
                const isDone = Boolean(checked[item.id]);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="hover:bg-surface flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm transition-colors"
                    >
                      {isDone ? (
                        <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
                      ) : (
                        <Circle className="text-ink-muted h-4 w-4 shrink-0" />
                      )}
                      <span className={isDone ? 'text-ink-muted line-through' : 'text-ink'}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 4. Sistema de Pagos y Continuidad */}
        <section className="border-border bg-surface rounded-[var(--radius-card)] border p-6 shadow-[var(--shadow-card)] sm:p-8 print:shadow-none">
          <p className="text-secondary text-xs font-bold tracking-wider uppercase">Sección 4</p>
          <h2 className="font-display text-ink mt-1 text-2xl font-extrabold">
            Sistema de Pagos (Cuotas Decrecientes en UF)
          </h2>
          <p className="text-ink-muted mt-1 text-sm">
            4 cuotas mensuales que acompañan la carga real de implementación (valores netos en UF;
            referencia CLP calculada con UF $41.357).
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-border text-ink-muted border-b text-xs tracking-wider uppercase">
                  <th className="py-2.5 pr-4">Mes / Hito</th>
                  <th className="py-2.5 pr-4">Monto (UF Neto)</th>
                  <th className="py-2.5 pr-4">Ref. CLP (+ IVA)</th>
                  <th className="py-2.5">Entregable y Trabajo Asociado</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {PAYMENT_SCHEDULE.map((row) => (
                  <tr key={row.phase}>
                    <td className="py-3.5 pr-4 align-top">
                      <p className="text-ink font-bold">{row.phase}</p>
                      <p className="text-ink-muted text-xs">{row.timing}</p>
                    </td>
                    <td className="text-primary py-3.5 pr-4 align-top font-mono text-base font-extrabold">
                      {row.uf}
                    </td>
                    <td className="text-ink-muted py-3.5 pr-4 align-top font-mono text-xs font-semibold">
                      {row.clp}
                    </td>
                    <td className="text-ink py-3.5 align-top text-sm">{row.deliverable}</td>
                  </tr>
                ))}
                <tr className="bg-surface-muted/60 font-bold">
                  <td className="text-ink py-3.5 pr-4">TOTAL PROYECTO</td>
                  <td className="text-secondary py-3.5 pr-4 font-mono text-lg">10 UF</td>
                  <td className="text-ink py-3.5 pr-4 font-mono text-xs">~$413.600 CLP</td>
                  <td className="text-ink py-3.5">
                    Tienda completa + Correos Corporativos + 50 productos + Webpay Plus + Enlace
                    GOLAN + Flujo ISP.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-border bg-surface-muted/40 mt-6 rounded-lg border p-5">
            <h3 className="font-display text-ink text-base font-bold">
              5. Continuidad: Mantención y Asesoría Digital (Desde Marzo 2027)
            </h3>
            <p className="text-ink-muted mt-1.5 text-sm">
              Desde el Mes 5 en adelante, cuota fija mensual de{' '}
              <strong className="text-ink font-mono">1 UF / mes (~$41.400 CLP + IVA)</strong> que
              incluye mantención preventiva, respaldos, monitoreo de Webpay Plus y seguridad,
              soporte prioritario y asesoría digital mensual (GEO SEO y crecimiento en ventas).
            </p>
            <p className="text-ink-muted mt-2 text-xs">
              Nota: Los pagos de renovación anual de NIC.cl, hosting propio de correos y módulos
              adicionales que eventualmente cobre el proveedor GOLAN siguen siendo gestionados
              directamente por Farmacias Vertical. Cualquier licencia externa adicional que se
              requiera a futuro se evalúa y aprueba por separado.
            </p>
          </div>
        </section>

        {/* Pie de propuesta */}
        <footer className="border-border bg-surface flex flex-col items-start justify-between gap-4 rounded-[var(--radius-card)] border px-6 py-5 text-sm sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-ink font-bold">Cristián Díaz · MarketingCloud Chile</p>
            <p className="text-ink-muted text-xs">
              Consultoría Tecnológica, Marketing Digital e IA · WhatsApp: +56 9 4943 8288
            </p>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <a
              href="https://wa.me/56949438288?text=Hola%20Cristi%C3%A1n%2C%20agendemos%20la%20reuni%C3%B3n%20de%20trabajo%20para%20Farmacias%20Vertical."
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'primary', size: 'sm' })}
            >
              <MessageCircle className="h-4 w-4" />
              Coordinar Reunión por WhatsApp
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
