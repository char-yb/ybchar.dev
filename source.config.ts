import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import { z } from 'zod';

function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid' || index === undefined || !parent) return;

      parent.children.splice(index, 1, {
        type: 'mdxJsxFlowElement',
        name: 'Mermaid',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'chart',
            value: node.value,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'width',
            value: '100%',
          },
        ],
        children: [],
      } as any);
    });
  };
}

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
    remarkPlugins: [remarkMermaid],
  },
});
