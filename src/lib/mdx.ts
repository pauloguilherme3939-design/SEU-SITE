import fs from 'node:fs';
import path from 'node:path';
import type { BlogPostMeta } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export interface BlogPost extends BlogPostMeta {
  /** Conteúdo bruto MDX (sem frontmatter). Render é feito por quem consome. */
  content: string;
}

/**
 * Parser de frontmatter YAML-simples (suficiente para o blog).
 * Suporta strings, números, arrays inline (`tags: [a, b]`) e datas.
 * Não depende de gray-matter — mantém deps no mínimo nesta fase.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, frontmatterBlock, body] = match;
  const data: Record<string, unknown> = {};

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const sep = trimmed.indexOf(':');
    if (sep === -1) continue;

    const key = trimmed.slice(0, sep).trim();
    let value = trimmed.slice(sep + 1).trim();

    // Array inline: [a, b, "c"]
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      continue;
    }

    // Remove aspas duplas/simples
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content: body };
}

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min de leitura`;
}

function buildPostFromFile(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);

  if (!data.title || !data.description || !data.date) {
    console.warn(`[mdx] post "${slug}" sem frontmatter mínimo (title/description/date)`);
    return null;
  }

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: data.readingTime ? String(data.readingTime) : estimateReadingTime(content),
    content,
  };
}

/**
 * Lista todos os slugs disponíveis (sem extensão).
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

/**
 * Carrega um post pelo slug. Retorna null se não existir ou faltar frontmatter.
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return buildPostFromFile(slug);
}

/**
 * Lista todos os posts ordenados por data desc, sem o conteúdo (mais leve).
 */
export function getAllBlogPosts(): BlogPostMeta[] {
  return getAllBlogSlugs()
    .map(buildPostFromFile)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}
