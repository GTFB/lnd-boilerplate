import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ru', 'es', 'fr', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use the default locale for the root path
  localePrefix: 'as-needed',
  
  // Don't redirect for the root path
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
