import { getTranslation, SupportedLocale } from '../../lib/translations'
import Header from '../components/Header'

export default function LocalizedHomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = (path: string) => getTranslation(locale as SupportedLocale, path)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale as SupportedLocale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('home.title')} - {locale}
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
                href={`/${locale}/docs`}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                {t('navigation.docs')}
              </a>
              <a
                href={`/${locale}/about`}
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
