import React from 'react'

export function LanguageSwitcher() {
  return (
    <div className="relative">
      <select className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm">
        <option value="en">EN</option>
        <option value="ru">RU</option>
        <option value="es">ES</option>
        <option value="fr">FR</option>
        <option value="de">DE</option>
      </select>
    </div>
  )
}
