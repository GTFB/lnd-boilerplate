import { NextRequest, NextResponse } from 'next/server'
import { getDefaultLocaleEdge, getSupportedLocalesEdge } from '@lnd/utils/config'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get default locale from config utility
  const defaultLocale = getDefaultLocaleEdge()
  const supportedLocales = getSupportedLocalesEdge()
  
  // Check if the pathname already has a locale prefix
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  
  // If first segment is a supported locale (but not default)
  if (supportedLocales.includes(firstSegment) && firstSegment !== defaultLocale) {
    // Continue normally - this is a non-default locale
    return NextResponse.next()
  }
  
  // If first segment is the default locale, redirect to remove it
  if (firstSegment === defaultLocale) {
    // Extract the path after the default locale
    const pathAfterLocale = pathname.replace(`/${defaultLocale}`, '') || '/'
    
    // Redirect to the path without the default locale prefix
    return NextResponse.redirect(new URL(pathAfterLocale, request.url))
  }
  
  // If it's the root path or any path without locale prefix, rewrite to default locale internally
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url)
  return NextResponse.rewrite(newUrl)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
