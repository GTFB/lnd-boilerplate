'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function ClientOnlyLanguageRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Check if we need to redirect based on stored language
    const getStoredLocale = () => {
      try {
        return localStorage.getItem('selectedLanguage') || 'en'
      } catch {
        return 'en'
      }
    }

    const shouldRedirect = () => {
      const pathnameLocale = pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1]
      const storedLocale = getStoredLocale()
      
      // If no locale in path and we have a stored non-English locale
      if (!pathnameLocale && storedLocale !== 'en') {
        return storedLocale
      }
      
      return null
    }

    const redirectLocale = shouldRedirect()
    
    if (redirectLocale) {
      // Create the localized path
      const localizedPath = `/${redirectLocale}${pathname}`
      
      // Redirect to the localized version
      router.replace(localizedPath)
    }
  }, [pathname, router, mounted])

  // Don't render anything during SSR
  if (!mounted) {
    return null
  }

  return null
}
