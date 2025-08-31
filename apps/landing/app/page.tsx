import { Navigation } from '@lnd/ui/components/layout/Navigation'
import { getDefaultLocale } from '../config/locale-config'

export default function RootPage() {
  const defaultLocale = getDefaultLocale()
  
  // Define content based on default locale
  const getContent = () => {
    switch (defaultLocale) {
      case 'es':
        return {
          title: 'LND Boilerplate',
          subtitle: 'Framework Moderno de Desarrollo Web',
          description: 'Construido con TypeScript, Next.js y herramientas modernas.',
          docsLink: 'Documentación',
          aboutLink: 'Acerca de'
        }
      case 'ru':
        return {
          title: 'LND Boilerplate',
          subtitle: 'Современный фреймворк для веб-разработки',
          description: 'Построен на TypeScript, Next.js и современных инструментах.',
          docsLink: 'Документация',
          aboutLink: 'О нас'
        }
      case 'fr':
        return {
          title: 'LND Boilerplate',
          subtitle: 'Framework Moderne de Développement Web',
          description: 'Construit avec TypeScript, Next.js et des outils modernes.',
          docsLink: 'Documentation',
          aboutLink: 'À propos'
        }
      case 'de':
        return {
          title: 'LND Boilerplate',
          subtitle: 'Modernes Web-Entwicklungsframework',
          description: 'Gebaut mit TypeScript, Next.js und modernen Tools.',
          docsLink: 'Dokumentation',
          aboutLink: 'Über uns'
        }
      default: // en
        return {
          title: 'LND Boilerplate',
          subtitle: 'Modern Web Development Framework',
          description: 'Built with TypeScript, Next.js and modern tools.',
          docsLink: 'Documentation',
          aboutLink: 'About'
        }
    }
  }
  
  const content = getContent()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentLanguage={defaultLocale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {content.subtitle}
          </p>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              {content.description}
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/docs" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                {content.docsLink}
              </a>
              <a 
                href="/about" 
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                {content.aboutLink}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
