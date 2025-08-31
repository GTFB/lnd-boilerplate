import { Navigation } from '@lnd/ui/components/layout/Navigation'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentLanguage="ru" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Документация
          </h1>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Начало работы
            </h2>
            <p className="text-gray-600 mb-4">
              LND Boilerplate - это современный фреймворк для создания веб-приложений.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800">Установка</h3>
                <p className="text-gray-600">Клонируйте репозиторий и установите зависимости</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-800">Разработка</h3>
                <p className="text-gray-600">Запустите сервер разработки с hot-reload</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-800">Сборка</h3>
                <p className="text-gray-600">Соберите проект для продакшена</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
