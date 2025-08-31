import { Navigation } from '@lnd/ui/components/layout/Navigation'

export default function FrenchDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentLanguage="fr" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Documentation
          </h1>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Commencer
            </h2>
            <p className="text-gray-600 mb-4">
              LND Boilerplate est un framework moderne pour créer des applications web.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800">Installation</h3>
                <p className="text-gray-600">Clonez le repository et installez les dépendances</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-800">Développement</h3>
                <p className="text-gray-600">Démarrez le serveur de développement avec hot-reload</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-800">Construction</h3>
                <p className="text-gray-600">Construisez le projet pour la production</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
