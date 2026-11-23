import type { RegulatoryMode } from '@/lib/config/env';

export type SaleConditionCode =
  'NON_PHARMA' | 'OTC_DIRECT' | 'RX_SIMPLE' | 'RX_RETAINED' | 'RX_CHECK_BLOCKED';

export interface RegulatoryCheckResult {
  allowed: boolean;
  requiresRx: boolean;
  requiresPhysicalRxOnDelivery: boolean;
  blockedByLaw: boolean;
  badgeLabel: string;
  helperText: string;
}

export function canAddToCartOnline(
  saleCondition: SaleConditionCode,
  mode: RegulatoryMode,
): RegulatoryCheckResult {
  if (saleCondition === 'RX_CHECK_BLOCKED') {
    return {
      allowed: false,
      requiresRx: true,
      requiresPhysicalRxOnDelivery: true,
      blockedByLaw: true,
      badgeLabel: 'Receta Cheque · Solo mesón',
      helperText:
        'Normativa sanitaria vigente prohíbe el expendio electrónico de productos sujetos a receta cheque.',
    };
  }

  if (saleCondition === 'NON_PHARMA') {
    return {
      allowed: true,
      requiresRx: false,
      requiresPhysicalRxOnDelivery: false,
      blockedByLaw: false,
      badgeLabel: 'Venta libre online',
      helperText: 'Disponible para compra online con despacho o retiro en mesón.',
    };
  }

  if (mode === 'PRE_ISP') {
    return {
      allowed: false,
      requiresRx: saleCondition === 'RX_SIMPLE' || saleCondition === 'RX_RETAINED',
      requiresPhysicalRxOnDelivery: saleCondition === 'RX_RETAINED',
      blockedByLaw: false,
      badgeLabel: 'Disponible en mesón · Acreditación ISP',
      helperText:
        'Farmacia en proceso de acreditación de expendio electrónico ISP (DS 466). Consulta disponibilidad presencial en mesón.',
    };
  }

  switch (saleCondition) {
    case 'OTC_DIRECT':
      return {
        allowed: true,
        requiresRx: false,
        requiresPhysicalRxOnDelivery: false,
        blockedByLaw: false,
        badgeLabel: 'Medicamento Venta Directa',
        helperText: 'Expendio farmacéutico autorizado sin receta médica.',
      };
    case 'RX_SIMPLE':
      return {
        allowed: true,
        requiresRx: true,
        requiresPhysicalRxOnDelivery: false,
        blockedByLaw: false,
        badgeLabel: 'Requiere Receta Simple',
        helperText: 'Debes adjuntar tu receta médica para validación del Químico Farmacéutico.',
      };
    case 'RX_RETAINED':
      return {
        allowed: true,
        requiresRx: true,
        requiresPhysicalRxOnDelivery: true,
        blockedByLaw: false,
        badgeLabel: 'Receta Retenida',
        helperText:
          'Requiere carga digital previa y entrega de la receta física original contra despacho o retiro.',
      };
  }
}
