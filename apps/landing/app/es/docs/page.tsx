import { Navigation } from '@lnd/ui/components/layout/Navigation'

export default function SpanishDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentLanguage="es" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Documentación
          </h1>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Comenzando
            </h2>
            <p className="text-gray-600 mb-4">
              LND Boilerplate es un framework moderno para crear aplicaciones web.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800">Instalación</h3>
                <p className="text-gray-600">Clona el repositorio e instala las dependencias</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-800">Desarrollo</h3>
                <p className="text-gray-600">Inicia el servidor de desarrollo con hot-reload</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-800">Construcción</h3>
                <p className="text-gray-600">Construye el proyecto para producción</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
