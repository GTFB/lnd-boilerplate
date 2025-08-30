import { Inter, Inter_Tight } from 'next/font/google';
import { SidebarProvider } from '@lnd/ui/contexts';
import { DesignSystemProvider } from '@lnd/ui/design-systems/DesignSystemProvider';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params: { locale }
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
