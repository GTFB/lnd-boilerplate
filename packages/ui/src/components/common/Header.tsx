'use client'

import { getTranslationSync, SupportedLocale, getSupportedLocales, getDefaultLocale } from '@lnd/utils/i18n'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface HeaderProps {
  locale?: SupportedLocale
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Define supported locales and default locale
  const supportedLocales = getSupportedLocales()
  const defaultLocale = getDefaultLocale()
  
  // Determine current locale from pathname or use default
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  
  // Check if first segment is a valid locale (but not default)
  const currentLocale = locale || (supportedLocales.includes(firstSegment as SupportedLocale) && firstSegment !== defaultLocale
    ? firstSegment as SupportedLocale 
    : defaultLocale)
  
  const t = (path: string) => getTranslationSync(currentLocale, path)

  // Helper function to generate correct links
  const getLink = (path: string) => {
    // If current locale is default, don't add locale prefix
    if (currentLocale === defaultLocale) {
      return path
    }
    
    // If current locale is not default, add locale prefix
    return `/${currentLocale}${path}`
  }

  // Handle locale change
  const handleLocaleChange = (newLocale: SupportedLocale) => {
    // Get current path without any locale prefix
    let currentPath = pathname
    
    // Remove current locale prefix if it exists
    if (currentLocale !== defaultLocale) {
      currentPath = pathname.replace(`/${currentLocale}`, '') || '/'
    }
    
    // Navigate to new locale
    if (newLocale === defaultLocale) {
      // For default locale, don't add prefix
      router.push(currentPath)
    } else {
      // For non-default locale, add prefix
      router.push(`/${newLocale}${currentPath}`)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <Link href={getLink('/')}>
              LND Boilerplate
            </Link>
          </div>

          {/* Navigation */}
          <nav className="header-nav">
            <Link 
              href={getLink('/')}
              className={`nav-link ${pathname === getLink('/') ? 'active' : ''}`}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href={getLink('/docs')}
              className={`nav-link ${pathname === getLink('/docs') ? 'active' : ''}`}
            >
              {t('navigation.docs')}
            </Link>
            <Link 
              href={getLink('/about')}
              className={`nav-link ${pathname === getLink('/about') ? 'active' : ''}`}
            >
              {t('navigation.about')}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="header-language-switcher">
            <div className="relative">
              <select
                value={currentLocale}
                onChange={(e) => handleLocaleChange(e.target.value as SupportedLocale)}
                className="language-select"
              >
                {supportedLocales.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}
