import React from 'react'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  active?: boolean
  nested?: boolean
  className?: string
}

/**
 * NavLink - Next.js style navigation link component
 * 
 * Features:
 * - Next.js inspired design with proper active states
 * - Clean typography and spacing
 * - Nested item support with proper indentation
 * - Smooth transitions and hover effects
 */
export function NavLink({ 
  href, 
  children, 
  active = false, 
  nested = false, 
  className = '' 
}: NavLinkProps) {
  return (
    <Link
      href={href}
      data-active={active}
      className={`
        relative flex items-center px-3 py-2 text-sm transition-colors duration-150
        text-gray-600 hover:text-gray-900
        data-[active=true]:text-blue-600 data-[active=true]:font-medium
        dark:text-gray-400 dark:hover:text-gray-100
        dark:data-[active=true]:text-blue-400
        ${nested ? 'ml-4' : ''}
        ${className}
      `}
    >
      {children}
    </Link>
  )
}
