import { describe, expect, it } from 'vitest';
import { parseInventoryCsv, sanitizeProductImageUrl } from '@/lib/sync/google-sheets';

describe('Adaptador Google Sheets CSV', () => {
  it('agrupa variantes y sanitiza URLs del dominio de referencia bloqueado', () => {
    const csv = [
      'Producto,Variantes,Categoría,Foto del artículo,Precio,Stock,Descripción',
      '"Citrato de Magnesio","Frasco 60 cápsulas","Vitaminas","https://cdn.shopify.com/s/files/1/0024/6058/1940/files/demo.jpg?v=1","$12.900","15","Descripción propia 1"',
      '"Citrato de Magnesio","Frasco 120 cápsulas","Vitaminas","https://cdn.shopify.com/s/files/1/0024/6058/1940/files/demo.jpg?v=1","$21.900","8","Descripción propia 1"',
      '"Crema Propia","Tubo 50 mL","Dermocosmética","https://farmaciasvertical.cl/media/crema.webp","8990","10","Crema propia"',
    ].join('\n');

    const products = parseInventoryCsv(csv);
    expect(products).toHaveLength(2);

    const magnesio = products[0]!;
    expect(magnesio.variants).toHaveLength(2);
    expect(magnesio.variants[0]?.priceClp).toBe(12900);
    expect(magnesio.variants[1]?.priceClp).toBe(21900);
    expect(magnesio.imageUrl).toBe('/placeholders/vitaminas-bienestar.svg');

    const crema = products[1]!;
    expect(crema.imageUrl).toBe('https://farmaciasvertical.cl/media/crema.webp');
  });

  it('reemplaza URLs inseguras (http o inválidas) por placeholder local de categoría', () => {
    expect(sanitizeProductImageUrl('http://inseguro.cl/a.jpg', 'Cuidado Capilar')).toBe(
      '/placeholders/cuidado-capilar.svg',
    );
    expect(sanitizeProductImageUrl('', 'Insumos & Higiene')).toBe(
      '/placeholders/insumos-higiene.svg',
    );
  });
});
