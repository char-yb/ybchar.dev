import { source } from '@/lib/source';

type SourcePage = ReturnType<typeof source.getPages>[number];

type FrontmatterLike = {
  title?: string;
  description?: string;
  date?: unknown;
  tags?: unknown;
};

export type BlogPostSummary = {
  title: string;
  description?: string;
  url: string;
  slug: string;
  date?: string;
  tags: string[];
};

const HIDDEN_PAGE_NAMES = new Set(['index', 'char-yb-introduce']);

function getPageName(page: SourcePage) {
  const fileName = page.path.split('/').at(-1) ?? page.path;
  return fileName.replace(/\.[^/.]+$/, '');
}

export function normalizeDate(value: unknown, slug?: string) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const matched = slug?.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!matched) return undefined;

  return `${matched[1]}-${matched[2]}-${matched[3]}`;
}

export function normalizeTags(value: unknown) {
  if (!Array.isArray(value)) return [];

  return [...new Set(value)].filter((tag): tag is string => {
    return typeof tag === 'string' && tag.trim().length > 0;
  });
}

function isVisibleBlogPage(page: SourcePage) {
  return !HIDDEN_PAGE_NAMES.has(getPageName(page));
}

function toSortKey(post: Pick<BlogPostSummary, 'date' | 'slug'>) {
  return (post.date ?? normalizeDate(undefined, post.slug) ?? '').replaceAll('-', '');
}

export function getTagHref(tag: string) {
  return `/tech-blog/tags/${encodeURIComponent(tag)}`;
}

export function decodeTagSegment(tag: string) {
  try {
    return decodeURIComponent(tag);
  } catch {
    return tag;
  }
}

export function getBlogPosts(): BlogPostSummary[] {
  return source
    .getPages()
    .filter(isVisibleBlogPage)
    .map((page) => {
      const data = page.data as FrontmatterLike;
      const pageName = getPageName(page);
      const slug = page.slugs.at(-1) ?? pageName;

      return {
        title: data.title ?? pageName,
        description: data.description,
        url: page.url,
        slug,
        date: normalizeDate(data.date, slug),
        tags: normalizeTags(data.tags),
      };
    })
    .sort((a, b) => {
      const dateCompare = toSortKey(b).localeCompare(toSortKey(a));
      if (dateCompare !== 0) return dateCompare;

      return b.slug.localeCompare(a.slug);
    });
}

export function getAllTags() {
  const counts = new Map<string, number>();

  for (const post of getBlogPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({
      tag,
      count,
      href: getTagHref(tag),
    }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.tag.localeCompare(b.tag, 'ko');
    });
}

export function getPostsByTag(tag: string) {
  return getBlogPosts().filter((post) => post.tags.includes(tag));
}
