'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-500 mb-4">💥</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Global Error
              </h2>
              <p className="text-gray-600 mb-8">
                A critical error occurred. Please refresh the page or contact
                support.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Refresh page
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
