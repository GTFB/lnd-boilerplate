import { SidebarProvider } from '@lnd/ui/contexts';
import { DesignSystemProvider } from '@lnd/ui/design-systems/DesignSystemProvider';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
              <ThemeProvider 
          attribute="class" 
          defaultTheme="system"
          enableSystem
          storageKey="theme"
        >
        <DesignSystemProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </DesignSystemProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
