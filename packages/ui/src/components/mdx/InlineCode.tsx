import React from 'react'

interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

/**
 * InlineCode - Enhanced inline code component
 * 
 * Features:
 * - Next.js style design
 * - Proper contrast and readability
 * - Dark mode support
 */
export function InlineCode({ children, className = '' }: InlineCodeProps) {
  return (
    <code className={`
      bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 
      px-1.5 py-0.5 rounded text-sm font-mono
      border border-gray-200 dark:border-gray-700
      ${className}
    `}>
      {children}
    </code>
  )
}
