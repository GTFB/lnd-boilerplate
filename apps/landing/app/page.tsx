import { getTranslation, getDefaultLocale } from '../lib/translations'
import Header from './components/Header'

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
  const t = (path: string) => getTranslation(defaultLocale, path)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={defaultLocale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('home.subtitle')}
          </p>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              {t('home.description')}
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/en/docs"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                {t('navigation.docs')}
              </a>
              <a
                href="/en/about"
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                {t('navigation.about')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 