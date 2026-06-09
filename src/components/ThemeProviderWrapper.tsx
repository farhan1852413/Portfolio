'use client';

import { ThemeProvider } from '@/hooks/useTheme';

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

