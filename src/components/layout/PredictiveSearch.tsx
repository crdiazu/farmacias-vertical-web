'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { formatClp } from '@/lib/chile/format';
import type { SearchSuggestionResult } from '@/lib/repositories/interfaces/catalog';

export function PredictiveSearch() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchSuggestionResult>({
    products: [],
    categories: [],
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  React.useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults({ products: [], categories: [] });
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search/suggest?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = (await res.json()) as SearchSuggestionResult;
          setResults(data);
          setOpen(true);
          setActiveIndex(-1);
        }
      } catch {
        // Ignore aborted requests
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const flatLinks = React.useMemo(() => {
    const prodLinks = results.products.map((p) => `/p/${p.slug}`);
    const catLinks = results.categories.map((c) => `/c/${c.path}`);
    return [...prodLinks, ...catLinks];
  }, [results]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && flatLinks[activeIndex]) {
      setOpen(false);
      router.push(flatLinks[activeIndex]);
      return;
    }
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    router.push(`/buscar?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || flatLinks.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % flatLinks.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? flatLinks.length - 1 : prev - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const hasSuggestions = results.products.length > 0 || results.categories.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} role="search" aria-label="Buscar en Farmacias Vertical">
        <div className="relative flex items-center">
          <Search className="text-ink-muted pointer-events-none absolute left-3.5 h-4 w-4" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.trim().length >= 2 && hasSuggestions) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={open}
            aria-controls="predictive-search-listbox"
            aria-autocomplete="list"
            placeholder="Buscar dermocosmética, vitaminas, marca o principio activo..."
            className="border-border bg-surface-muted/60 text-ink placeholder:text-ink-muted focus:bg-surface focus:outline-secondary h-11 w-full rounded-[var(--radius-control)] border pr-20 pl-10 text-sm focus:outline-2"
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            {loading ? <Loader2 className="text-ink-muted h-4 w-4 animate-spin" /> : null}
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary-hover rounded-md px-3 py-1.5 text-xs font-semibold text-white"
            >
              Buscar
            </button>
          </div>
        </div>
      </form>

      {open ? (
        <div
          id="predictive-search-listbox"
          role="listbox"
          className="border-border bg-surface absolute right-0 left-0 z-50 mt-1.5 max-h-[70vh] overflow-y-auto rounded-[var(--radius-card)] border p-3 shadow-xl"
        >
          {!hasSuggestions ? (
            <p className="text-ink-muted px-2 py-4 text-center text-sm">
              No encontramos coincidencias para &ldquo;{query}&rdquo;. Presiona Enter para búsqueda
              amplia.
            </p>
          ) : (
            <div className="space-y-3">
              {results.products.length > 0 ? (
                <div>
                  <p className="text-ink-muted px-2 pb-1 text-[11px] font-bold tracking-wider uppercase">
                    Productos sugeridos
                  </p>
                  <ul className="space-y-1">
                    {results.products.map((item, idx) => (
                      <li key={item.id}>
                        <Link
                          href={`/p/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
                            activeIndex === idx ? 'bg-surface-muted' : 'hover:bg-surface-muted/70'
                          }`}
                        >
                          <div className="bg-surface-muted relative h-10 w-10 shrink-0 overflow-hidden rounded">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              sizes="40px"
                              className="object-contain p-0.5"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-ink truncate font-semibold">{item.name}</p>
                            <p className="text-ink-muted text-xs">
                              {item.brandName ? `${item.brandName} · ` : ''}
                              {item.primaryCategoryName}
                            </p>
                          </div>
                          <span className="text-primary shrink-0 font-mono text-sm font-bold">
                            {formatClp(item.priceClp)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {results.categories.length > 0 ? (
                <div className="border-border border-t pt-2">
                  <p className="text-ink-muted px-2 pb-1 text-[11px] font-bold tracking-wider uppercase">
                    Categorías
                  </p>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {results.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/c/${cat.path}`}
                        onClick={() => setOpen(false)}
                        className="border-border bg-surface-muted text-ink hover:border-primary hover:text-primary inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium"
                      >
                        {cat.name}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
