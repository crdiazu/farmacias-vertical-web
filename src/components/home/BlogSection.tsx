import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import type { BlogPostSummary } from '@/lib/repositories/interfaces/catalog';

interface BlogSectionProps {
  posts: BlogPostSummary[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-secondary text-xs font-bold tracking-wider uppercase">
            Educación en Salud
          </p>
          <h2 className="font-display text-ink mt-1 text-2xl font-extrabold">
            Blog de Farmacias Vertical (Placeholder)
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-secondary hover:text-primary inline-flex items-center gap-1 text-sm font-bold"
        >
          Ver artículos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border-border bg-surface flex flex-col overflow-hidden rounded-[var(--radius-card)] border shadow-[var(--shadow-card)]"
          >
            <Link href={`/blog/${post.slug}`} className="bg-surface-muted relative block h-44">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-4"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <div className="text-ink-muted flex items-center justify-between text-xs">
                <span className="text-primary font-bold">{post.category}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.publishedAt}
                </span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="font-display text-ink hover:text-secondary mt-2 text-base font-bold"
              >
                {post.title}
              </Link>
              <p className="text-ink-muted mt-2 line-clamp-3 flex-1 text-sm">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-secondary hover:text-primary mt-4 inline-flex items-center gap-1 text-xs font-bold"
              >
                Leer guía ({post.readingTime})
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
