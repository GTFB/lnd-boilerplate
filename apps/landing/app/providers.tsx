'use client';

import { ThemeInitializer } from '@lnd/ui/components/common/ThemeInitializer';
import { getThemeConfig } from '../lib/config';

export function Providers({ children }: { children: React.ReactNode }) {
  // Dynamically read theme configuration from site.config.json
  const themeConfig = getThemeConfig();

  return (
    <>
      <ThemeInitializer themeConfig={themeConfig} />
      {children}
    </>
  );
}
