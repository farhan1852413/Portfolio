import type { Metadata } from 'next';
import { VT323, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';
import './globals.css';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Farhan Mohammad - Portfolio',
  description: 'Portfolio of Farhan Mohammad - Software Engineer based in Bangalore, India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <link rel="icon" href="/images/farru.webp" type="image/webp" />
        <link rel="alternate icon" href="/images/farru.webp" />
        <link rel="icon" href="/images/farru2.png" type="image/png" />
        <link rel="shortcut icon" href="/images/farru2.png" />

        {/* Inline script to set theme before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = sessionStorage.getItem('theme');
                  if (savedTheme === 'dark' || savedTheme === 'wood' || savedTheme === 'orange' || savedTheme === 'christmas') {
                    document.documentElement.classList.add('theme-' + savedTheme);
                  } else {
                    document.documentElement.classList.add('theme-orange');
                  }
                } catch (e) {
                  document.documentElement.classList.add('theme-orange');
                }
              })();
            `,
          }}
        />

      </head>
      <body className={`${vt323.variable} ${inter.variable}`} suppressHydrationWarning>
        <ThemeProviderWrapper>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProviderWrapper>

      </body>
    </html>
  );
}