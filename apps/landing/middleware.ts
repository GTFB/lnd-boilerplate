import { NextRequest, NextResponse } from 'next/server'
import { getDefaultLocaleEdge as getDefaultLocale, getSupportedLocalesEdge as getSupportedLocales } from '@lnd/utils/config'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const defaultLocale = getDefaultLocale()
  const supportedLocales = getSupportedLocales()

  // Debug logging
  console.log('Middleware debug:', {
    pathname,
    defaultLocale,
    supportedLocales
  })

  // Redirect from default locale prefix to root (e.g., /en -> /)
  if (pathname === `/${defaultLocale}`) {
    console.log(`Redirecting /${defaultLocale} to /`)
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect from default locale prefix with path to root path (e.g., /en/docs -> /docs)
  if (pathname.startsWith(`/${defaultLocale}/`) && pathname !== `/${defaultLocale}`) {
    const pathWithoutLocale = pathname.replace(`/${defaultLocale}`, '')
    console.log(`Redirecting ${pathname} to ${pathWithoutLocale}`)
    return NextResponse.redirect(new URL(pathWithoutLocale, request.url))
  }

  // Check if the path starts with a supported locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If path doesn't have a locale and is not the root path, rewrite to default locale
  if (!pathnameHasLocale && pathname !== '/') {
    console.log(`Rewriting ${pathname} to /${defaultLocale}${pathname}`)
    return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, request.url))
  }

  // For all other paths, continue normally
  return NextResponse.next()
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - _next internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
