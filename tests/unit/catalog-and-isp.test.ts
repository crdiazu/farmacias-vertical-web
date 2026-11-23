import { describe, expect, it } from 'vitest';
import { canAddToCartOnline } from '@/lib/regulatory/isp';
import { SeedCatalogRepository } from '@/lib/repositories/seed/catalog-repository';

describe('Catálogo Seed y Matriz Regulatoria ISP', () => {
  const repo = new SeedCatalogRepository();

  it('construye árbol de categorías de 3 niveles', async () => {
    const tree = await repo.getCategoryTree();
    expect(tree.length).toBeGreaterThanOrEqual(5);
    const hasLevel3 = tree.some((l1) => l1.children.some((l2) => l2.children.length > 0));
    expect(hasLevel3).toBe(true);
  });

  it('busca productos ignorando acentos (unaccent)', async () => {
    const res = await repo.searchSuggestions('acido hialuronico');
    expect(res.products.length).toBeGreaterThan(0);
  });

  it('bloquea medicamentos en modo PRE_ISP y exige receta en FULL_ISP', () => {
    expect(canAddToCartOnline('NON_PHARMA', 'PRE_ISP').allowed).toBe(true);
    expect(canAddToCartOnline('OTC_DIRECT', 'PRE_ISP').allowed).toBe(false);
    expect(canAddToCartOnline('RX_SIMPLE', 'PRE_ISP').allowed).toBe(false);

    expect(canAddToCartOnline('OTC_DIRECT', 'FULL_ISP').allowed).toBe(true);
    const rxSimple = canAddToCartOnline('RX_SIMPLE', 'FULL_ISP');
    expect(rxSimple.allowed).toBe(true);
    expect(rxSimple.requiresRx).toBe(true);

    const rxRetained = canAddToCartOnline('RX_RETAINED', 'FULL_ISP');
    expect(rxRetained.requiresPhysicalRxOnDelivery).toBe(true);

    expect(canAddToCartOnline('RX_CHECK_BLOCKED', 'FULL_ISP').allowed).toBe(false);
  });
});
