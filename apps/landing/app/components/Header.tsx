'use client'

import { getTranslation, SupportedLocale, getSupportedLocales } from '../../lib/translations'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface HeaderProps {
  locale?: SupportedLocale
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname()
  
  // Determine current locale from pathname or use default
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  const supportedLocales = getSupportedLocales()
  
  // Check if first segment is a valid locale
  const currentLocale = locale || (supportedLocales.includes(firstSegment as SupportedLocale) 
    ? firstSegment as SupportedLocale 
    : 'en')
  
  const t = (path: string) => getTranslation(currentLocale, path)

  // Helper function to generate correct links
  const getLink = (path: string) => {
    // If we're on a page without locale prefix (like /about), don't add locale
    // If we're on a page with locale prefix (like /ru/about), add locale
    const hasLocalePrefix = supportedLocales.includes(pathSegments[0] as SupportedLocale)
    
    if (hasLocalePrefix) {
      return `/${currentLocale}${path}`
    } else {
      return path
    }
  }

  // Check if current path has locale prefix
  const hasLocalePrefix = supportedLocales.includes(pathSegments[0] as SupportedLocale)

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={getLink('/')} className="text-xl font-bold text-gray-900">
              LND Boilerplate
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href={getLink('/')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href={getLink('/docs')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {t('navigation.docs')}
            </Link>
            <Link 
              href={getLink('/about')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {t('navigation.about')}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={currentLocale}
                onChange={(e) => {
                  const newLocale = e.target.value as SupportedLocale
                  // Get current path without locale prefix
                  const currentPath = hasLocalePrefix 
                    ? pathname.replace(`/${currentLocale}`, '') || '/'
                    : pathname
                  window.location.href = `/${newLocale}${currentPath}`
                }}
                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
