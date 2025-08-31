import React from 'react'

export function CookieConsent() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm">
          Мы используем файлы cookie для улучшения работы сайта.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          Принять
        </button>
      </div>
    </div>
  )
}
