import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/mdx';
import { buildMetadata, jsonLdBreadcrumbs, serializeJsonLd } from '@/lib/seo';
import { Container, Section } from '@/components/ui';

const blogLd = serializeJsonLd(
  jsonLdBreadcrumbs([
    { name: 'Início', url: '/' },
    { name: 'Blog', url: '/blog' },
  ])
);

export const metadata = buildMetadata({
  title: 'Blog — Dicas de presença digital para pequenos negócios',
  description:
    'Artigos sobre sites profissionais, marketing digital e como fazer seu negócio aparecer no Google.',
  path: '/blog',
});

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: blogLd }} />
      {/* Hero */}
      <Section className="bg-bg pt-28 pb-6">
        <Container size="md">
          <div
            className="animate-fade-up relative overflow-hidden rounded-[var(--radius-lg)] border border-line-hi px-8 py-12 sm:px-14"
            style={{ animationDelay: '60ms' }}
          >
            {/* Background glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,212,141,0.09) 0%, transparent 65%), var(--card)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grid-soft opacity-[0.12]"
            />
            {/* Top accent line */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(45,212,141,0.55) 40%, rgba(45,212,141,0.55) 60%, transparent)',
              }}
            />

            <div className="relative">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                Blog
              </p>
              <h1
                className="font-display font-extrabold text-ink text-balance"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 2.9rem)',
                  letterSpacing: '-0.035em',
                  lineHeight: '1.1',
                }}
              >
                Dicas para crescer online
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
                Sites, presença digital e como fazer clientes encontrarem seu negócio no Google.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Posts */}
      <Section className="bg-bg pt-4 pb-24">
        <Container size="md">
          {posts.length === 0 ? (
            <p className="py-20 text-center text-muted">Em breve, novos artigos.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="animate-fade-up group flex flex-col rounded-[var(--radius)] border border-line bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card-hi"
                  style={{ animationDelay: `${100 + i * 70}ms` }}
                >
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-bg-soft px-2.5 py-0.5 text-[11px] font-medium text-muted-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2
                    className="mb-2 font-display font-bold leading-snug text-ink transition-colors group-hover:text-accent"
                    style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
                  >
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-2">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.readingTime && <span>{post.readingTime}</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
