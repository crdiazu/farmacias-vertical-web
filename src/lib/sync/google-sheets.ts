import Papa from 'papaparse';
import { z } from 'zod';
import { normalizeText } from '@/lib/chile/format';
import type { SaleConditionCode } from '@/lib/regulatory/isp';

const BLOCKED_REFERENCE_DOMAINS = ['cdn.shopify.com/s/files/1/0024/6058/1940'];

const CATEGORY_PLACEHOLDER_MAP: Record<string, string> = {
  dermocosmetica: '/placeholders/dermocosmetica.svg',
  'cuidado capilar': '/placeholders/cuidado-capilar.svg',
  'cuidado personal': '/placeholders/cuidado-personal.svg',
  'insumos & higiene': '/placeholders/insumos-higiene.svg',
  vitaminas: '/placeholders/vitaminas-bienestar.svg',
  suplementos: '/placeholders/vitaminas-bienestar.svg',
  medicamentos: '/placeholders/medicamentos-isp.svg',
};

const sheetRowSchema = z.object({
  Producto: z.string().optional(),
  Variantes: z.string().optional(),
  Categoría: z.string().optional(),
  Categoria: z.string().optional(),
  'Foto del artículo': z.string().optional(),
  Imagen: z.string().optional(),
  Precio: z.union([z.string(), z.number()]).optional(),
  PrecioAnterior: z.union([z.string(), z.number()]).optional(),
  Stock: z.union([z.string(), z.number()]).optional(),
  Descripción: z.string().optional(),
  Descripcion: z.string().optional(),
  Marca: z.string().optional(),
  SKU: z.string().optional(),
  CondicionVenta: z.string().optional(),
  PrincipioActivo: z.string().optional(),
});

export interface ParsedSheetVariant {
  sku: string;
  label: string;
  priceClp: number;
  compareAtClp: number | null;
  stock: number;
}

export interface ParsedSheetProduct {
  slug: string;
  name: string;
  categoryName: string;
  categoryPath: string;
  brandName: string | null;
  activeIngredient: string | null;
  saleCondition: SaleConditionCode;
  imageUrl: string;
  description: string;
  variants: ParsedSheetVariant[];
}

function slugify(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseClpValue(raw: string | number | undefined): number {
  if (typeof raw === 'number') return Math.max(0, Math.round(raw));
  if (!raw) return 0;
  const firstSegment = raw.split('-')[0] ?? raw;
  const digits = firstSegment.replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

function resolveCategoryPath(categoryName: string): string {
  const norm = normalizeText(categoryName);
  if (norm.includes('dermo')) return 'dermocosmetica';
  if (norm.includes('capilar')) return 'cuidado-capilar';
  if (norm.includes('insumo') || norm.includes('higiene')) {
    return 'cuidado-personal/insumos-botiquin';
  }
  if (norm.includes('personal') || norm.includes('afeit')) return 'cuidado-personal';
  if (norm.includes('vitamin') || norm.includes('suplement') || norm.includes('fitoterap')) {
    return 'vitaminas-bienestar';
  }
  if (norm.includes('medicamento') || norm.includes('isp')) return 'medicamentos';
  return 'dermocosmetica';
}

export function sanitizeProductImageUrl(rawUrl: string | undefined, categoryName: string): string {
  const normCategory = normalizeText(categoryName);
  const fallback =
    Object.entries(CATEGORY_PLACEHOLDER_MAP).find(([key]) => normCategory.includes(key))?.[1] ??
    '/placeholders/dermocosmetica.svg';

  const trimmed = (rawUrl ?? '').trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith('/placeholders/')) {
    return trimmed;
  }

  const isBlockedReference = BLOCKED_REFERENCE_DOMAINS.some((domain) =>
    trimmed.toLowerCase().includes(domain),
  );
  if (isBlockedReference) {
    return fallback;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    return fallback;
  }

  return fallback;
}

function parseSaleCondition(raw: string | undefined, categoryName: string): SaleConditionCode {
  const norm = normalizeText(raw ?? '');
  if (norm === 'otc_direct') return 'OTC_DIRECT';
  if (norm === 'rx_simple') return 'RX_SIMPLE';
  if (norm === 'rx_retained') return 'RX_RETAINED';
  if (norm === 'rx_check_blocked') return 'RX_CHECK_BLOCKED';
  if (normalizeText(categoryName).includes('medicamento')) return 'OTC_DIRECT';
  return 'NON_PHARMA';
}

/**
 * Parsea un CSV con el formato de Google Sheets usado por la farmacia
 * (`Producto`, `Variantes`, `Categoría`, `Foto del artículo`, `Precio`, `Stock`, `Descripción`).
 * Sanitiza automáticamente URLs externas bloqueadas del sitio de referencia.
 */
export function parseInventoryCsv(csvText: string): ParsedSheetProduct[] {
  const parsed = Papa.parse<Record<string, unknown>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const grouped = new Map<string, ParsedSheetProduct>();
  let lastProductName = '';
  let rowIndex = 0;

  for (const rawRow of parsed.data) {
    rowIndex += 1;
    const result = sheetRowSchema.safeParse(rawRow);
    if (!result.success) continue;

    const row = result.data;
    const rawName = (row.Producto ?? '').trim();
    if (rawName) lastProductName = rawName;
    if (!lastProductName) continue;

    const categoryName = (row['Categoría'] ?? row.Categoria ?? 'Dermocosmética').trim();
    const variantLabel = (row.Variantes ?? 'Unidad').trim() || 'Unidad';
    const priceClp = parseClpValue(row.Precio);
    const compareAtRaw = parseClpValue(row.PrecioAnterior);
    const compareAtClp = compareAtRaw > priceClp ? compareAtRaw : null;
    const stock = Math.max(0, parseInt(String(row.Stock ?? '0').trim(), 10) || 0);
    const description = (row['Descripción'] ?? row.Descripcion ?? '').trim();
    const imageUrl = sanitizeProductImageUrl(row['Foto del artículo'] ?? row.Imagen, categoryName);

    const slug = slugify(lastProductName) || `producto-${rowIndex}`;
    const sku = (row.SKU ?? `GS-${slug.slice(0, 18).toUpperCase()}-${rowIndex}`).trim();

    const existing = grouped.get(slug);
    if (existing) {
      existing.variants.push({ sku, label: variantLabel, priceClp, compareAtClp, stock });
      continue;
    }

    grouped.set(slug, {
      slug,
      name: lastProductName,
      categoryName,
      categoryPath: resolveCategoryPath(categoryName),
      brandName: row.Marca?.trim() || null,
      activeIngredient: row.PrincipioActivo?.trim() || null,
      saleCondition: parseSaleCondition(row.CondicionVenta, categoryName),
      imageUrl,
      description:
        description || 'Producto administrado desde planilla de inventario Farmacias Vertical.',
      variants: [{ sku, label: variantLabel, priceClp, compareAtClp, stock }],
    });
  }

  return [...grouped.values()];
}

export async function fetchGoogleSheetsInventory(csvUrl: string): Promise<ParsedSheetProduct[]> {
  const parsedUrl = new URL(csvUrl);
  if (parsedUrl.protocol !== 'https:') {
    throw new Error('GOOGLE_SHEETS_CSV_URL debe usar protocolo HTTPS.');
  }

  const response = await fetch(parsedUrl.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Error al obtener planilla CSV: HTTP ${response.status}`);
  }
  const csvText = await response.text();
  return parseInventoryCsv(csvText);
}
