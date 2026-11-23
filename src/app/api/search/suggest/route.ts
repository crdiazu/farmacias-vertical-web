import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCatalogRepository } from '@/lib/repositories';

const querySchema = z.object({
  q: z.string().trim().max(100).default(''),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({ q: url.searchParams.get('q') ?? '' });
  if (!parsed.success) {
    return NextResponse.json({ products: [], categories: [] }, { status: 400 });
  }

  const repo = getCatalogRepository();
  const suggestions = await repo.searchSuggestions(parsed.data.q, 6);
  return NextResponse.json(suggestions);
}
