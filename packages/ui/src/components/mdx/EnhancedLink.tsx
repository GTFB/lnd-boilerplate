import React from 'react'
import Link from 'next/link'

interface EnhancedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

/**
 * EnhancedLink - Enhanced link component for MDX
 * 
 * Features:
 * - Next.js style design
 * - External link detection
 * - Proper hover states
 * - Dark mode support
 */
export function EnhancedLink({ href, children, className = '' }: EnhancedLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
          underline decoration-2 underline-offset-2 transition-colors duration-150
          hover:decoration-blue-800 dark:hover:decoration-blue-300
          ${className}
        `}
      >
        {children}
        <svg 
          className="inline w-3 h-3 ml-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
          />
        </svg>
      </a>
    )
  }
  
  return (
    <Link
      href={href}
      className={`
        text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
        underline decoration-2 underline-offset-2 transition-colors duration-150
        hover:decoration-blue-800 dark:hover:decoration-blue-300
        ${className}
      `}
    >
      {children}
    </Link>
  )
}
