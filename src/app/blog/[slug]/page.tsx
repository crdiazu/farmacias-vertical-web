import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getCatalogRepository } from '@/lib/repositories';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const repo = getCatalogRepository();
  const post = await repo.getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/blog"
        className="text-secondary inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Volver al blog
      </Link>
      <div className="border-border bg-surface mt-4 rounded-[var(--radius-card)] border p-6 sm:p-8">
        <span className="text-primary text-xs font-bold tracking-wider uppercase">
          {post.category} · {post.readingTime}
        </span>
        <h1 className="font-display text-ink mt-2 text-3xl font-extrabold">{post.title}</h1>
        <p className="text-ink-muted mt-4 text-base leading-relaxed">{post.excerpt}</p>
        <p className="bg-surface-muted text-ink mt-6 rounded-lg p-4 text-sm">
          [Contenido placeholder] Este artículo de muestra valida el enrutamiento y diseño editorial
          para Farmacias Vertical. El contenido final deberá ser revisado por un profesional de la
          salud antes de publicarse.
        </p>
      </div>
    </article>
  );
}
