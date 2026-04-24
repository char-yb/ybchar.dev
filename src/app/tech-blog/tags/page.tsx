import Link from 'next/link';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { getAllTags } from '@/lib/blog';

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <DocsPage toc={[]} full>
      <DocsTitle>태그 모아보기</DocsTitle>
      <DocsDescription>
        frontmatter의 tags 기준으로 글을 분류했습니다. 관심 있는 태그부터 바로
        찾아볼 수 있습니다.
      </DocsDescription>
      <DocsBody>
        <div className="not-prose mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {tags.map((tag) => (
            <Link
              key={tag.tag}
              href={tag.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200">
                  #{tag.tag}
                </span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                  {tag.count}개 글
                </span>
              </div>
            </Link>
          ))}
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export function generateMetadata() {
  return {
    title: '태그 모아보기',
    description: 'ybchar.dev 기술 블로그의 태그별 글 목록입니다.',
  };
}
