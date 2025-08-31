import NextImage from 'next/image'
import { ReactNode } from 'react'

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  children?: ReactNode
  fallbackSrc?: string
}

export function Image({ src, alt, width = 400, height = 300, className, children, fallbackSrc }: ImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className || ''}`}>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
      />
      {children}
    </div>
  )
}
