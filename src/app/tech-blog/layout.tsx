import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  const pageTree = source.getPageTree();
  const filteredPageNode = pageTree.children
    .filter((child) => {
      return child.$id !== 'char-yb-introduce.mdx' && child.$id !== 'index.mdx';
    })
    .sort((a, b) => {
      const dateA = a.$id?.match(/^(\d{8})/)?.[1] || '';
      const dateB = b.$id?.match(/^(\d{8})/)?.[1] || '';
      return dateB.localeCompare(dateA);
    });

  const filteredPageTree = {
    ...pageTree,
    children: filteredPageNode,
  };

  return (
    <DocsLayout tree={filteredPageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
