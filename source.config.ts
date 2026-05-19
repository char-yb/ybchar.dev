import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';

const blogFrontmatterSchema = frontmatterSchema.extend({
  date: z.union([z.string(), z.date()]).optional(),
  tags: z.array(z.string()).nullish(),
  cover: z.string().optional(),
});

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/tech-blog',
  docs: {
    schema: blogFrontmatterSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMdxMermaid],
  },
});
