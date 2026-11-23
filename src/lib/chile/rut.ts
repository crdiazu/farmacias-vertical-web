export function cleanRut(raw: string): string {
  return raw.replace(/[^0-9kK]/g, '').toUpperCase();
}

export function computeRutCheckDigit(body: string): string {
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    const digit = Number(body[i]);
    if (Number.isNaN(digit)) return '';
    sum += digit * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  if (remainder === 11) return '0';
  if (remainder === 10) return 'K';
  return String(remainder);
}

export function validateRut(raw: string): boolean {
  const cleaned = cleanRut(raw);
  if (!/^\d{7,8}[0-9K]$/.test(cleaned)) {
    return false;
  }
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);
  if (/^(\d)\1+$/.test(body)) {
    return false;
  }
  return computeRutCheckDigit(body) === dv;
}

export function formatRut(raw: string): string {
  const cleaned = cleanRut(raw);
  if (cleaned.length < 2) return cleaned;
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedBody}-${dv}`;
}
