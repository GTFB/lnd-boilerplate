'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocalizedLink } from '../hooks/useLocalizedLink'

export function LanguageRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const { shouldRedirect } = useLocalizedLink()
  const [isClient, setIsClient] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Wait for next tick to ensure hydration is complete
    const timer = setTimeout(() => {
      setHasHydrated(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Only run on client side after hydration is complete
    if (!isClient || !hasHydrated) return

    const redirectLocale = shouldRedirect()
    
    if (redirectLocale) {
      // Create the localized path
      const localizedPath = `/${redirectLocale}${pathname}`
      
      // Use setTimeout to ensure this runs after hydration
      setTimeout(() => {
        router.replace(localizedPath)
      }, 100)
    }
  }, [pathname, router, shouldRedirect, isClient, hasHydrated])

  // Don't render anything during SSR or before hydration
  if (!isClient) {
    return null
  }

  return null
}
