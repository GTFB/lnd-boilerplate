import { NextRequest, NextResponse } from 'next/server'
import { getDefaultLocaleEdge as getDefaultLocale, getSupportedLocalesEdge as getSupportedLocales } from '@lnd/utils/config'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const defaultLocale = getDefaultLocale()
  const supportedLocales = getSupportedLocales()

  // Check if the pathname starts with the default locale
  // e.g., if defaultLocale is 'en', check for '/en', '/en/docs', '/en/about', etc.
  const defaultLocalePattern = new RegExp(`^/${defaultLocale}(/.*)?$`)
  
  if (defaultLocalePattern.test(pathname)) {
    // Extract the path after the locale
    const pathAfterLocale = pathname.replace(`/${defaultLocale}`, '') || '/'
    
    // Create new URL without the default locale prefix
    const newUrl = new URL(pathAfterLocale, request.url)
    
    // Redirect to the path without the default locale prefix
    return NextResponse.redirect(newUrl)
  }

  // Check if the pathname is a direct route without locale prefix
  // e.g., '/docs', '/about' - rewrite to default locale internally
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  
  // If first segment is not a locale and not empty, rewrite to default locale
  if (firstSegment && !supportedLocales.includes(firstSegment as any)) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url)
    return NextResponse.rewrite(newUrl)
  }
  
  // Special handling for root path '/' - rewrite to default locale
  if (pathname === '/') {
    const newUrl = new URL(`/${defaultLocale}`, request.url)
    return NextResponse.rewrite(newUrl)
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
