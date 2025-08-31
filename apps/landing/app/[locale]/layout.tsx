import { NextIntlClientProvider } from 'next-intl';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log('LocaleLayout called with params:', params);
  
  try {
    // Load messages for the current locale
    const messages = await import(`../../public/locales/${params.locale}.json`);

    return (
      <NextIntlClientProvider messages={messages.default}>
        {children}
      </NextIntlClientProvider>
    );
  } catch (error) {
    console.error('Error loading messages for locale:', params.locale, error);
    // Fallback to just rendering children if messages fail to load
    return <>{children}</>;
  }
}
