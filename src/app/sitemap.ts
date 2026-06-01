import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { getAllBlogPosts } from '@/lib/mdx';
import { nichos } from '@/data/faq';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const blogEntries = getAllBlogPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const nichoEntries = nichos.map((n) => ({
    url: `${site.url}/para/${n.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogEntries,
    ...nichoEntries,
  ];
}
