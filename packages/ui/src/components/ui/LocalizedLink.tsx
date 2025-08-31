'use client'

import React from 'react'
import Link from 'next/link'
import { useLocalizedHref } from '../../utils/locale'

interface LocalizedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}

/**
 * LocalizedLink component that automatically adds locale prefix to href
 * Usage: <LocalizedLink href="/docs">Documentation</LocalizedLink>
 */
export const LocalizedLink: React.FC<LocalizedLinkProps> = ({ 
  href, 
  children, 
  className,
  onClick,
  ...props 
}) => {
  const localizedHref = useLocalizedHref(href)
  
  return (
    <Link 
      href={localizedHref} 
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  )
}
