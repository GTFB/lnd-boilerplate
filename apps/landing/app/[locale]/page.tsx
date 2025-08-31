import { SupportedLocale } from '../../lib/translations'
import PageTemplate from '../components/PageTemplate'

export default function LocalizedHomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <PageTemplate locale={locale as SupportedLocale} pageKey="home">
      <div className="flex justify-center space-x-4">
        <a
          href={`/${locale}/docs`}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Documentation
        </a>
        <a
          href={`/${locale}/about`}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          About
        </a>
      </div>
    </PageTemplate>
  )
}
