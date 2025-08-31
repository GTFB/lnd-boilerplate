import { getTranslationSync, SupportedLocale } from '@lnd/utils/i18n'
import { SingleColumnLayout } from '@lnd/ui'

export default function LocalizedDocsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = (path: string) => getTranslationSync(locale as SupportedLocale, path)
  
  return (
    <SingleColumnLayout
      locale={locale as SupportedLocale}
      title={t('navigation.docs')}
      subtitle={t('docs.subtitle')}
      description={t('docs.description')}
    >
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t('docs.subtitle')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('docs.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">{t('docs.sections.gettingStarted.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('docs.sections.gettingStarted.description')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">{t('docs.sections.components.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('docs.sections.components.description')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">{t('docs.sections.apiReference.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('docs.sections.apiReference.description')}
            </p>
          </div>
        </div>
      </div>
    </SingleColumnLayout>
  )
}
