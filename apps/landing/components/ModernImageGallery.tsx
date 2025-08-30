'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { Image as ImageIcon } from 'lucide-react'
import LightGallery from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgFullscreen from 'lightgallery/plugins/fullscreen'
import lgShare from 'lightgallery/plugins/share'

// Импортируем стили lightGallery
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-fullscreen.css'
import 'lightgallery/css/lg-share.css'

interface ImageItem {
  src: string
  alt: string
  caption: string
}

interface ModernImageGalleryProps {
  images: ImageItem[]
  columns?: number
}

export function ModernImageGallery({ images }: ModernImageGalleryProps) {
  const lightGalleryRef = useRef<{ openGallery: (index: number) => void } | null>(null)

  // Подготавливаем данные для lightGallery
  const galleryItems = images.map((image) => ({
    src: image.src,
    thumb: image.src,
    subHtml: `<div class="lightbox-caption">${image.caption}</div>`,
    alt: image.alt
  }))

  // Показываем только первые 3 изображения в карусели
  const visibleImages = images.slice(0, 3)

  return (
    <div className="lightgallery-container">
      {/* Карусель с 3 изображениями */}
      <div className="carousel-preview">
        <div className="grid grid-cols-3 gap-4">
          {visibleImages.map((image, _index) => (
            <div 
              key={`image-${_index}`}
              className="carousel-item cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 200px"
                />
                
                {/* Overlay с подписью */}
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                  <div className="w-full p-3 text-white">
                    <p className="text-xs font-medium leading-tight line-clamp-2">{image.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Кнопка "Показать все" */}
        <div className="mt-4 text-center">
          <button
            onClick={() => lightGalleryRef.current?.openGallery(0)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Показать все ({images.length})
          </button>
        </div>
      </div>

      {/* LightGallery компонент */}
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgFullscreen, lgShare]}
        elementClassNames="hidden"
        dynamic={true}
        dynamicEl={galleryItems}
        download={false}
        counter={true}
        enableDrag={true}
        enableSwipe={true}
        mousewheel={true}
        getCaptionFromTitleOrAlt={true}
        thumbnail={true}
        zoom={true}
        fullScreen={true}
        share={true}
        allowMediaOverlap={true}
        mobileSettings={{
          controls: true,
          showCloseIcon: true,
          download: false
        }}
        onInit={(detail) => {
          lightGalleryRef.current = detail.instance
        }}
      />
    </div>
  )
}
