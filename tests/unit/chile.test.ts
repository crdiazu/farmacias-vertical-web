import { describe, expect, it } from 'vitest';
import { calculateDiscountPercent, formatClp, normalizeText } from '@/lib/chile/format';
import { formatRut, validateRut } from '@/lib/chile/rut';

describe('Utilidades Chile (CLP, RUT, texto)', () => {
  it('formatea precios CLP sin decimales', () => {
    expect(formatClp(8990)).toContain('8.990');
    expect(formatClp(-100)).toContain('0');
  });

  it('calcula porcentaje de descuento correctamente', () => {
    expect(calculateDiscountPercent(8990, 10990)).toBe(18);
    expect(calculateDiscountPercent(10000, null)).toBe(0);
    expect(calculateDiscountPercent(10000, 9000)).toBe(0);
  });

  it('valida dígitos verificadores de RUT chileno (0-9 y K)', () => {
    expect(validateRut('11.111.111-1')).toBe(false); // dígitos repetidos bloqueados
    expect(validateRut('12.345.678-5')).toBe(true);
    expect(validateRut('12.345.670-K')).toBe(true);
    expect(validateRut('76.123.456-0')).toBe(true);
    expect(validateRut('76123456-K')).toBe(false);
    expect(formatRut('123456785')).toBe('12.345.678-5');
  });

  it('normaliza acentos para búsqueda', () => {
    expect(normalizeText('Ácido Hialurónico B3')).toBe('acido hialuronico b3');
  });
});
