import { Navigation } from '@lnd/ui/components/layout/Navigation'

export default function RussianHomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentLanguage="ru" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LND Boilerplate
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Современный фреймворк для веб-разработки
          </p>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Построен с использованием TypeScript, Next.js и современных инструментов.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/ru/docs" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Документация
              </a>
              <a 
                href="/ru/about" 
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                О проекте
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
