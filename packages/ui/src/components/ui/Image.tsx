'use client'

import React, { useState } from 'react'
import { cn } from '@lnd/ui/lib/utils'

export interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

export function Image({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = '/images/placeholder.jpg',
  priority = false,
  loading = 'lazy',
  onLoad,
  onError
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
    onError?.()
  }

  const handleLoad = () => {
    onLoad?.()
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        'object-cover transition-opacity duration-200',
        className
      )}
      loading={priority ? 'eager' : loading}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}
