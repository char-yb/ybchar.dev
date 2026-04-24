import Link from 'next/link';
import { getTagHref } from '@/lib/blog';

type BlogPostMetaProps = {
  date?: string;
  tags?: string[];
  showTagIndexLink?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDateLabel(date?: string) {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return {
      label: date,
      dateTime: date,
    };
  }

  return {
    label: dateFormatter.format(parsed),
    dateTime: parsed.toISOString(),
  };
}

export function BlogPostMeta({
  date,
  tags = [],
  showTagIndexLink = true,
}: BlogPostMetaProps) {
  const formattedDate = formatDateLabel(date);
  const visibleTags = tags.filter((tag) => tag.trim().length > 0);

  if (!formattedDate && visibleTags.length === 0) return null;

  return (
    <div className="not-prose mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
      {formattedDate ? (
        <time
          dateTime={formattedDate.dateTime}
          className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        >
          게시일 {formattedDate.label}
        </time>
      ) : null}

      {visibleTags.length > 0 ? (
        <ul className="m-0 flex flex-wrap gap-2 p-0">
          {visibleTags.map((tag) => (
            <li key={tag} className="list-none">
              <Link
                href={getTagHref(tag)}
                className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              >
                #{tag}
              </Link>
            </li>
          ))}
          {showTagIndexLink ? (
            <li className="list-none">
              <Link
                href="/tech-blog/tags"
                className="inline-flex items-center rounded-full border border-transparent px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                태그 모아보기
              </Link>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
