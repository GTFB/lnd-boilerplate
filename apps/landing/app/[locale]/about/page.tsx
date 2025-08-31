import { getTranslationSync, SupportedLocale } from '@lnd/utils/i18n'
import { SingleColumnLayout } from '@lnd/ui'

export default function LocalizedAboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = (path: string) => getTranslationSync(locale as SupportedLocale, path)
  
  // Mock data for features and technologies
  const features = [
    'Modern React with TypeScript',
    'Next.js 14 with App Router',
    'Tailwind CSS for styling',
    'Internationalization support',
    'Component library architecture'
  ]
  
  const technologies = [
    'React 18',
    'Next.js 14',
    'TypeScript 5',
    'Tailwind CSS',
    'Bun runtime'
  ]
  
  return (
    <SingleColumnLayout
      locale={locale as SupportedLocale}
      title={t('navigation.about')}
      subtitle={t('about.subtitle')}
      description={t('about.description')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <ul className="text-gray-600 space-y-2">
            {features.map((item: string, index: number) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Technologies</h3>
          <ul className="text-gray-600 space-y-2">
            {technologies.map((item: string, index: number) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </SingleColumnLayout>
  )
}
