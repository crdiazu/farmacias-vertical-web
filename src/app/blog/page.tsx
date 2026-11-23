import Image from 'next/image';
import Link from 'next/link';
import { getCatalogRepository } from '@/lib/repositories';

export default async function BlogIndexPage() {
  const repo = getCatalogRepository();
  const posts = await repo.getRecentBlogPosts(10);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-ink text-3xl font-extrabold">
        Blog de Salud (Artículos Placeholder)
      </h1>
      <p className="text-ink-muted mt-1 text-sm">
        Artículos educativos de demostración. En Fase 3 se cargarán desde archivos MDX.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border-border bg-surface flex flex-col overflow-hidden rounded-[var(--radius-card)] border shadow-[var(--shadow-card)]"
          >
            <div className="bg-surface-muted relative h-44">
              <Image src={post.imageUrl} alt={post.title} fill className="object-contain p-4" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-primary text-xs font-bold">{post.category}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="font-display text-ink hover:text-secondary mt-2 text-lg font-bold"
              >
                {post.title}
              </Link>
              <p className="text-ink-muted mt-2 flex-1 text-sm">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
