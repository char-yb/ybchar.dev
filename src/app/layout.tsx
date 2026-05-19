import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "../lib/GoogleAnalytics";

const inter = Inter({
  subsets: ['latin'],
});

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || '';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <GoogleAnalytics gaId={GA_ID} />
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
