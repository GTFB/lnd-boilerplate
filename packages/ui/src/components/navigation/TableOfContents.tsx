import React from 'react'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  toc: TOCItem[]
  currentSection?: string
}

/**
 * TableOfContents - Next.js style table of contents component
 * 
 * Features:
 * - Next.js inspired design with clean typography
 * - Hierarchical structure with proper indentation
 * - Active section highlighting
 * - Smooth scrolling to sections
 */
export function TableOfContents({ toc, currentSection }: TableOfContentsProps) {
  if (toc.length === 0) {
    return null
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="space-y-1">
      {toc.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          data-active={currentSection === item.id}
          className={`
            block w-full text-start text-sm transition-colors duration-150 py-1
            text-gray-600 hover:text-gray-900
            data-[active=true]:text-blue-600 data-[active=true]:font-medium
            dark:text-gray-400 dark:hover:text-gray-100
            dark:data-[active=true]:text-blue-400
            ${item.level === 1 ? 'font-medium' : item.level === 2 ? 'ml-3' : item.level === 3 ? 'ml-6' : 'ml-9'}
          `}
        >
          {item.title}
        </button>
      ))}
    </nav>
  )
}