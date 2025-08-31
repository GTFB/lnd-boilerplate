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

  // For all paths, continue normally
  return NextResponse.next()
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - _next internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
