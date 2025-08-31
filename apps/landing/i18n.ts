import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['ru', 'en', 'es', 'fr', 'de'];

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(requestLocale as any)) notFound();

  return {
    messages: (await import(`./public/locales/${requestLocale}.json`)).default
  };
});
