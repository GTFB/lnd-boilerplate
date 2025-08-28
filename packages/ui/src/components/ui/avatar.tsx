'use client'

import React from 'react'
import { cn } from '@lnd/ui/lib/utils'
import { Image } from './Image'

export interface AvatarProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  className?: string
  fallbackSrc?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

const fallbackSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-2xl'
}

export function Avatar({
  src,
  alt,
  size = 'md',
  fallback,
  className,
  fallbackSrc = '/images/avatar-placeholder.jpg'
}: AvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (!src) {
    return (
      <div
        className={cn(
          'bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium',
          sizeClasses[size],
          className
        )}
      >
        <span className={fallbackSizeClasses[size]}>
          {fallback || getInitials(alt)}
        </span>
      </div>
    )
  }

  return (
    <div className={cn('rounded-full overflow-hidden', sizeClasses[size], className)}>
      <Image
        src={src}
        alt={alt}
        fallbackSrc={fallbackSrc}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  )
}
