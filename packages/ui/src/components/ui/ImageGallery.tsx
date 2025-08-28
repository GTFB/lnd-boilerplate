'use client'

import React, { useState } from 'react'
import { cn } from '@lnd/ui/lib/utils'
import { Image } from './Image'
import { Button } from './button'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  link?: string
}

export interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 1 | 2 | 3 | 4
  showCaptions?: boolean
  showLightbox?: boolean
  className?: string
}

export function ImageGallery({
  images,
  columns = 3,
  showCaptions = true,
  showLightbox = true,
  className
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  const openLightbox = (index: number) => {
    if (showLightbox) {
      setSelectedImage(index)
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  return (
    <>
      <div className={cn('grid gap-4', gridClasses[columns], className)}>
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {showCaptions && (image.caption || image.link) && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  {image.caption && (
                    <p className="text-lg font-medium mb-2">
                      {image.caption}
                    </p>
                  )}
                  {image.link && (
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href={image.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {showLightbox && selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>
            
            <div className="relative">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
              
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
            
            {showCaptions && images[selectedImage].caption && (
              <p className="text-white text-center mt-4 text-lg">
                {images[selectedImage].caption}
              </p>
            )}
            
            {images.length > 1 && (
              <div className="text-white text-center mt-4">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
