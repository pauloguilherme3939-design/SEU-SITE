import type { Metadata } from 'next';
import { site } from '@/data/site';
import type { BlogPostMeta, FaqItem, Plan } from '@/types';

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Helper que monta o objeto Metadata padrão para qualquer página.
 * Use em todas as rotas: `export const metadata = buildMetadata({...})`.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
  const ogImage = image ?? `${site.url}/api/og`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// JSON-LD builders
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Schema Organization — usar no layout raiz ou na home.
 */
export function jsonLdOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.business.legalName,
    url: site.url,
    description: site.description,
    areaServed: site.business.area,
    priceRange: site.business.priceRange,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/og/logo.png`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Portuguese'],
      ...(site.whatsapp ? { telephone: `+${site.whatsapp.replace(/\D/g, '')}` } : {}),
    },
    ...(site.social.instagram
      ? { sameAs: [site.social.instagram].filter(Boolean) }
      : {}),
  };
}

/**
 * Schema Service — um por plano. Use em /precos ou em páginas de nicho.
 */
export function jsonLdService(plan: Plan) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}/#service-${plan.id}`,
    name: `${plan.name} — ${site.name}`,
    description: plan.forWho,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: site.business.area,
    serviceType: 'Criação de sites profissionais',
    ...(plan.price !== null
      ? {
          offers: {
            '@type': 'Offer',
            price: plan.price,
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
            url: site.url,
          },
        }
      : {}),
  };
}

/**
 * Schema FAQPage — recebe array de FaqItem.
 */
export function jsonLdFaqPage(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/**
 * Schema BlogPosting — usar em /blog/[slug].
 */
export function jsonLdBlogPosting(post: BlogPostMeta) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    inLanguage: 'pt-BR',
    publisher: { '@id': `${site.url}/#organization` },
    author: { '@id': `${site.url}/#organization` },
    ...(post.cover
      ? {
          image: {
            '@type': 'ImageObject',
            url: post.cover.startsWith('http') ? post.cover : `${site.url}${post.cover}`,
          },
        }
      : {}),
  };
}

/**
 * Schema BreadcrumbList — recebe lista de { name, url? } na ordem.
 */
export function jsonLdBreadcrumbs(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url
        ? { item: item.url.startsWith('http') ? item.url : `${site.url}${item.url}` }
        : {}),
    })),
  };
}

/**
 * Helper para injetar um ou vários JSON-LDs como `<script type="application/ld+json">`.
 * Use no JSX: `<JsonLd data={jsonLdOrganization()} />` ou um array.
 */
export function serializeJsonLd(data: object | object[]): string {
  return JSON.stringify(data);
}
