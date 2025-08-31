import { Navigation } from '@lnd/ui/components/layout/Navigation'

export default function GermanHomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentLanguage="de" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LND Boilerplate
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Modernes Web-Entwicklungsframework
          </p>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Erstellt mit TypeScript, Next.js und modernen Tools.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/de/docs" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Dokumentation
              </a>
              <a 
                href="/de/about" 
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                Über
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
