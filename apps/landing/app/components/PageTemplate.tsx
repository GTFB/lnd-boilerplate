import Header from './Header'
import { getTranslation, SupportedLocale } from '../../lib/translations'

interface PageTemplateProps {
  locale: SupportedLocale
  pageKey: 'home' | 'docs' | 'about'
  children?: React.ReactNode
}

export default function PageTemplate({ locale, pageKey, children }: PageTemplateProps) {
  const t = (path: string) => getTranslation(locale, path)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t(`${pageKey}.title`)}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t(`${pageKey}.subtitle`)}
          </p>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              {t(`${pageKey}.description`)}
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
