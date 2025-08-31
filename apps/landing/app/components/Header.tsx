'use client'

import { getTranslation, SupportedLocale, getSupportedLocales } from '../../lib/translations'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface HeaderProps {
  locale?: SupportedLocale
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname()
  
  // Determine current locale from pathname
  const currentLocale = locale || (pathname.startsWith('/') && pathname.length > 1
    ? pathname.split('/')[1] as SupportedLocale
    : 'en')
  
  const t = (path: string) => getTranslation(currentLocale, path)
  const supportedLocales = getSupportedLocales()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${currentLocale}`} className="text-xl font-bold text-gray-900">
              LND Boilerplate
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href={`/${currentLocale}`}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href={`/${currentLocale}/docs`}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {t('navigation.docs')}
            </Link>
            <Link 
              href={`/${currentLocale}/about`}
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
                  const currentPath = pathname.replace(`/${currentLocale}`, '') || '/'
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
