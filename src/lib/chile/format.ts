const clpFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export function formatClp(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  return clpFormatter.format(safeAmount);
}

export function calculateDiscountPercent(priceClp: number, compareAtClp?: number | null): number {
  if (!compareAtClp || compareAtClp <= priceClp || priceClp <= 0) {
    return 0;
  }
  return Math.round(((compareAtClp - priceClp) / compareAtClp) * 100);
}

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
