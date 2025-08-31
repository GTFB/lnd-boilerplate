'use client'

import { usePathname } from 'next/navigation'

/**
 * Hook to get current locale from pathname
 */
export function useCurrentLocale(): string {
  const pathname = usePathname()
  
  // Extract locale from pathname (e.g., /de/blog -> 'de')
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)
  return localeMatch ? localeMatch[1] : 'ru' // Default to 'ru' if no locale found
}

/**
 * Generate localized href for navigation links
 * @param href - The base href (e.g., '/docs', '/blog')
 * @param currentPathname - Current pathname from usePathname()
 * @returns Localized href
 */
export function getLocalizedHref(href: string, currentPathname: string): string {
  // Extract current locale from pathname
  const localeMatch = currentPathname.match(/^\/([a-z]{2})(\/|$)/)
  const currentLocale = localeMatch ? localeMatch[1] : 'ru'
  
  // For Russian (default locale), don't add locale prefix
  if (currentLocale === 'ru') {
    return href
  }
  
  // For other locales, add the locale prefix
  return `/${currentLocale}${href}`
}

/**
 * Component hook to get localized href
 */
export function useLocalizedHref(href: string): string {
  const pathname = usePathname()
  return getLocalizedHref(href, pathname)
}
