'use client'

import { SupportedLocale, getTranslation, getSupportedLocales } from '../../lib/translations'
import PageTemplate from '../components/PageTemplate'
import { usePathname } from 'next/navigation'

export default function LocalizedHomePage({ params: { locale } }: { params: { locale: string } }) {
  const pathname = usePathname()
  const t = (path: string) => getTranslation(locale as SupportedLocale, path)
  
  // Helper function to generate correct links (same as in Header)
  const getLink = (path: string) => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const supportedLocales = getSupportedLocales()
    const hasLocalePrefix = supportedLocales.includes(pathSegments[0] as SupportedLocale)
    
    if (hasLocalePrefix) {
      return `/${locale}${path}`
    } else {
      return path
    }
  }
  
  return (
    <PageTemplate locale={locale as SupportedLocale} pageKey="home">
      <div className="flex justify-center space-x-4">
        <a
          href={getLink('/docs')}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('navigation.docs')}
        </a>
        <a
          href={getLink('/about')}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          {t('navigation.about')}
        </a>
      </div>
    </PageTemplate>
  )
}
