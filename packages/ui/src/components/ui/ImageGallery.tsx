import React from 'react'
import { Image } from './Image'

interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    title?: string
    caption?: string
    link?: string
  }>
  className?: string
  columns?: number
  showCaptions?: boolean
  showLightbox?: boolean
}

export function ImageGallery({ 
  images, 
  className, 
  columns = 3, 
  showCaptions = false, 
  showLightbox = false 
}: ImageGalleryProps) {
  const gridCols = columns === 1 ? 'grid-cols-1' : 
                   columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                   columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
                   'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

  return (
    <div className={`grid ${gridCols} gap-4 ${className || ''}`}>
      {images.map((image, index) => (
        <div key={index} className="group relative">
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {(image.title || image.caption) && (showCaptions || image.title) && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h3 className="text-sm font-medium">{image.title || image.caption}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
