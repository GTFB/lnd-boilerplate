import { Navigation } from '@lnd/ui/components/layout/Navigation'

export default function EnglishAboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentLanguage="en" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            About
          </h1>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              LND Boilerplate
            </h2>
            <p className="text-gray-600 mb-4">
              This is a modern framework for rapid web application development, 
              built on proven technologies and best practices.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Technologies</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• TypeScript</li>
                  <li>• Next.js 14</li>
                  <li>• Tailwind CSS</li>
                  <li>• Bun</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Features</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Hot-reload</li>
                  <li>• TypeScript</li>
                  <li>• Modern UI</li>
                  <li>• Ready structure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
