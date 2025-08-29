'use client'

import React, { useRef } from 'react'
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

export function ModernImageGallery({ images, columns = 3 }: ModernImageGalleryProps) {
  const lightGalleryRef = useRef<any>(null)

  // Подготавливаем данные для lightGallery
  const galleryItems = images.map((image, index) => ({
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
          {visibleImages.map((image, index) => (
            <div 
              key={index} 
              className="carousel-item cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
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
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
            </svg>
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
