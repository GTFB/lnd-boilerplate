import { getTranslationSync, SupportedLocale } from '@lnd/utils/i18n'
import { SingleColumnLayout } from '@lnd/ui'
import { getValidatedSiteConfig } from '@lnd/utils/config/config-validator'
import configJson from '../../site.config.json'

interface PageProps {
  params: {
    locale: SupportedLocale
  }
}

export default function HomePage({ params }: PageProps) {
  const { locale } = params
  
  const t = (path: string) => getTranslationSync(locale, path)

  return (
    <SingleColumnLayout
      locale={locale}
      title={t('home.title')}
      subtitle={t('home.subtitle')}
      description={t('home.description')}
    >
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t('home.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">{t('home.features.typescript.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('home.features.typescript.description')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">{t('home.features.nextjs.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('home.features.nextjs.description')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">{t('home.features.monorepo.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('home.features.monorepo.description')}
            </p>
          </div>
        </div>
      </div>
    </SingleColumnLayout>
  )
}

export async function generateStaticParams() {
  const config = getValidatedSiteConfig(configJson)
  const locales = config.features.i18n.locales
  
  return locales.map((locale) => ({
    locale: locale as SupportedLocale,
  }))
}
