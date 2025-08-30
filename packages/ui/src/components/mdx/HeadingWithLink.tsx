import React from 'react'
import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

interface HeadingWithLinkProps {
  id: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

/**
 * HeadingWithLink - MDX heading component with anchor links
 * 
 * Features:
 * - Automatic anchor link generation
 * - Hover to reveal link icon
 * - Smooth scrolling to sections
 * - Next.js style design
 */
export function HeadingWithLink({ id, level, children, className = '' }: HeadingWithLinkProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  const baseClasses = `
    group relative scroll-mt-20 text-left
    ${level === 1 ? 'text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8 tracking-tight' : ''}
    ${level === 2 ? 'text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8 tracking-tight' : ''}
    ${level === 3 ? 'text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6' : ''}
    ${level === 4 ? 'text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-4' : ''}
    ${level === 5 ? 'text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-4' : ''}
    ${level === 6 ? 'text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-4' : ''}
    ${className}
  `

  return (
    <HeadingTag id={id} className={baseClasses}>
      <Link 
        href={`#${id}`}
        className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        aria-label={`Link to ${children}`}
      >
        <LinkIcon className="w-4 h-4" />
      </Link>
      {children}
    </HeadingTag>
  )
}
