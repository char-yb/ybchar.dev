import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { BlogPostMeta } from '@/components/ui/BlogPostMeta';
import { decodeTagSegment, getAllTags, getPostsByTag, getTagHref } from '@/lib/blog';

export default async function TagDetailPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const tag = decodeTagSegment(params.tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <DocsPage toc={[]} full>
      <DocsTitle>#{tag}</DocsTitle>
      <DocsDescription>
        #{tag} 태그가 붙은 글 {posts.length}개를 모아봤습니다.
      </DocsDescription>
      <DocsBody>
        <div className="not-prose mt-6 space-y-4">
          <Link
            href="/tech-blog/tags"
            className="inline-flex items-center text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← 모든 태그 보기
          </Link>

          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.url}
                className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <Link href={post.url} className="block">
                  <h2 className="text-lg font-semibold text-zinc-900 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-200">
                    {post.title}
                  </h2>
                </Link>
                {post.description ? (
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                ) : null}
                <BlogPostMeta date={post.date} tags={post.tags} showTagIndexLink={false} />
              </article>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {getAllTags().map((item) => (
              <Link
                key={item.tag}
                href={getTagHref(item.tag)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  item.tag === tag
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900'
                }`}
              >
                #{item.tag}
              </Link>
            ))}
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: tag.tag,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const tag = decodeTagSegment(params.tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    return {
      title: '태그',
    };
  }

  return {
    title: `#${tag}`,
    description: `ybchar.dev 기술 블로그에서 #${tag} 태그가 붙은 글 목록입니다.`,
  };
}
