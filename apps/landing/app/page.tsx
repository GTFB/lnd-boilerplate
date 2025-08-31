import { getDefaultLocale, SupportedLocale } from '../lib/translations'
import PageTemplate from './components/PageTemplate'

export default function RootPage() {
  // Determine user's preferred language
  const getPreferredLocale = (): string => {
    // Check localStorage (if available)
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem('locale')
      if (storedLocale && ['en', 'ru', 'es', 'fr', 'de'].includes(storedLocale)) {
        return storedLocale
      }
    }
    
    // Check browser language
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0]
      if (['en', 'ru', 'es', 'fr', 'de'].includes(browserLang)) {
        return browserLang
      }
    }
    
    // Return default language
    return getDefaultLocale()
  }

  const preferredLocale = getPreferredLocale()
  const defaultLocale = getDefaultLocale()
  
  // If user's language differs from default, redirect with prefix
  if (preferredLocale !== defaultLocale) {
    // Use window.location for client-side redirect
    if (typeof window !== 'undefined') {
      window.location.href = `/${preferredLocale}`
      return null
    }
  }
  
  // If language is default, show content in default language
  return (
    <PageTemplate locale={defaultLocale as SupportedLocale} pageKey="home">
      <div className="flex justify-center space-x-4">
        <a
          href="/en/docs"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Documentation
        </a>
        <a
          href="/en/about"
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          About
        </a>
      </div>
    </PageTemplate>
  )
} 