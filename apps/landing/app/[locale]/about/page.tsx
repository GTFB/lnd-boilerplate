import { getTranslation, SupportedLocale } from '../../../lib/translations'
import Header from '../../components/Header'

export default function LocalizedAboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = (path: string) => getTranslation(locale as SupportedLocale, path)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale as SupportedLocale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('navigation.about')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('about.subtitle')}
          </p>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              {t('about.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">{t('about.sections.features.title')}</h3>
                <ul className="text-gray-600 space-y-2">
                  {t('about.sections.features.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">{t('about.sections.technologies.title')}</h3>
                <ul className="text-gray-600 space-y-2">
                  {t('about.sections.technologies.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
