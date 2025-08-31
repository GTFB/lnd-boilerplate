import { Navigation } from '@lnd/ui/components/layout/Navigation'

export default function EnglishDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentLanguage="en" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Documentation
          </h1>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Getting Started
            </h2>
            <p className="text-gray-600 mb-4">
              LND Boilerplate is a modern framework for creating web applications.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800">Installation</h3>
                <p className="text-gray-600">Clone the repository and install dependencies</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-800">Development</h3>
                <p className="text-gray-600">Start the development server with hot-reload</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-800">Build</h3>
                <p className="text-gray-600">Build the project for production</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
