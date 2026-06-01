import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/mdx';
import {
  buildMetadata,
  jsonLdBlogPosting,
  jsonLdBreadcrumbs,
  serializeJsonLd,
} from '@/lib/seo';
import { site } from '@/data/site';
import { Container } from '@/components/ui';

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  const ogImage = post.cover
    ? `${site.url}${post.cover}`
    : `${site.url}/api/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.description)}`;

  const base = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: ogImage,
  });

  return {
    ...base,
    openGraph: {
      type: 'article' as const,
      locale: 'pt_BR',
      url: `${site.url}/blog/${post.slug}`,
      siteName: site.name,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.date,
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const ld = serializeJsonLd([
    jsonLdBlogPosting(post),
    jsonLdBreadcrumbs([
      { name: 'Início', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title },
    ]),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <div className="min-h-screen bg-bg">

        {/* ── Post header ───────────────────────────────────────── */}
        <div
          className="relative overflow-hidden pt-28 pb-14"
          style={{
            background: [
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(45,212,141,0.08) 0%, transparent 65%)',
              'var(--bg)',
            ].join(','),
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-soft opacity-[0.08]"
          />

          <Container size="sm">
            {/* Breadcrumb */}
            <nav
              className="animate-fade-in mb-8 flex items-center gap-2 text-xs text-muted-2"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition-colors hover:text-muted">
                Início
              </Link>
              <span aria-hidden>/</span>
              <Link href="/blog" className="transition-colors hover:text-muted">
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span className="max-w-[180px] truncate text-muted">{post.title}</span>
            </nav>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div
                className="animate-fade-up mb-5 flex flex-wrap gap-2"
                style={{ animationDelay: '60ms' }}
              >
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="animate-fade-up font-display font-extrabold text-ink text-balance"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.85rem)',
                letterSpacing: '-0.03em',
                lineHeight: '1.12',
                animationDelay: '80ms',
              }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div
              className="animate-fade-up mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-2"
              style={{ animationDelay: '140ms' }}
            >
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.readingTime && (
                <>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-muted-2/50" />
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p
              className="animate-fade-up mt-5 max-w-2xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: '180ms' }}
            >
              {post.description}
            </p>
          </Container>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className="h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--line-hi) 20%, var(--line-hi) 80%, transparent)',
          }}
        />

        {/* ── Article body ──────────────────────────────────────── */}
        <div
          className="animate-fade-up pb-28 pt-14"
          style={{ animationDelay: '220ms' }}
        >
          <Container size="sm">
            <article className="prose">
              <MDXRemote source={post.content} />
            </article>

            {/* Back */}
            <div className="mt-16 border-t border-line pt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M11 8H5M5 8l3-3M5 8l3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Voltar para o Blog
              </Link>
            </div>
          </Container>
        </div>

      </div>
    </>
  );
}
