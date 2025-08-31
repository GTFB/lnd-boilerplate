import { getTranslation, SupportedLocale } from '../../../lib/translations'
import Header from '../../components/Header'

export default function LocalizedDocsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = (path: string) => getTranslation(locale as SupportedLocale, path)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale as SupportedLocale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('navigation.docs')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('docs.subtitle')}
          </p>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              {t('docs.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t('docs.sections.gettingStarted.title')}</h3>
                <p className="text-gray-600">{t('docs.sections.gettingStarted.description')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t('docs.sections.components.title')}</h3>
                <p className="text-gray-600">{t('docs.sections.components.description')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t('docs.sections.apiReference.title')}</h3>
                <p className="text-gray-600">{t('docs.sections.apiReference.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
