'use client'

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { marked } from 'marked'


interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const [galleries] = useState<Array<{
    id: string
    images: Array<{src: string, alt: string, caption: string}>
    columns: number
  }>>([])
  // const [visibleImages] = useState<Set<string>>(new Set())
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map())

  // Intersection Observer для lazy loading изображений
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const src = img.dataset.src
            if (src) {
              img.src = src
              img.classList.remove('lazy')
              // setVisibleImages(prev => new Set([...prev, src]))
              imageObserver.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    )

    // Observe all lazy images
    imageRefs.current.forEach((img) => {
      if (img.classList.contains('lazy')) {
        imageObserver.observe(img)
      }
    })

    return () => {
      imageObserver.disconnect()
    }
  }, [])

  // Функция для парсинга изображений
  // const parseImages = useCallback((imagesStr: string) => {
  //   const images: Array<{src: string, alt: string, caption: string}> = []
  //   const imageRegex = /\{\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]+)",\s*caption:\s*"([^"]*)"\s*\}/g
  //   let match
    
  //   while ((match = imageRegex.exec(imagesStr)) !== null) {
  //     images.push({
  //       src: match[1],
  //       alt: match[2],
  //       caption: match[3]
  //     })
  //   }
    
  //   return images
  // }, [])

  // Парсим контент только один раз при изменении content
  const parsedContent = useMemo(() => {
    let parsedContent = content
    let galleryIndex = 0
    
    // Обрабатываем ModernImageGallery компоненты
    const imageGalleryRegex = /<ModernImageGallery\s+([^>]*)\s*\/>/g
    parsedContent = parsedContent.replace(imageGalleryRegex, (match, props) => {
      try {
        // Извлекаем props
        const imagesMatch = props.match(/images=\{\[([\s\S]*?)\]\}/)
        // const columnsMatch = props.match(/columns=\{(\d+)\}/)
        
        if (imagesMatch) {
          // const imagesStr = imagesMatch[1]
          // const images = parseImages(imagesStr)
          // const columns = columnsMatch ? parseInt(columnsMatch[1]) : 3
          
          // Добавляем галерею в состояние
          const galleryId = `gallery-${galleryIndex}`
          galleryIndex++
          
          return `<div class="gallery-placeholder" data-gallery-id="${galleryId}"></div>`
        }
      } catch (error) {
        console.error('Error parsing ModernImageGallery:', error)
      }
      
      return match
    })
    
    // Парсим markdown в HTML
    let htmlContent = marked(parsedContent) as string
    
    // Добавляем CSS классы к HTML элементам
    htmlContent = htmlContent
      // Заголовки
      .replace(/<h1>/g, '<h1 class="blog-content-h1">')
      .replace(/<h2>/g, '<h2 class="blog-content-h2">')
      .replace(/<h3>/g, '<h3 class="blog-content-h3">')
      .replace(/<h4>/g, '<h4 class="blog-content-h4">')
      .replace(/<h5>/g, '<h5 class="blog-content-h5">')
      .replace(/<h6>/g, '<h6 class="blog-content-h6">')
      // Параграфы
      .replace(/<p>/g, '<p class="blog-content-p">')
      // Списки
      .replace(/<ul>/g, '<ul class="blog-content-ul">')
      .replace(/<ol>/g, '<ol class="blog-content-ol">')
      .replace(/<li>/g, '<li class="blog-content-li">')
      // Ссылки
      .replace(/<a\s+href=/g, '<a class="blog-content-a" href=')
      // Код
      .replace(/<code>/g, '<code class="blog-content-code">')
      .replace(/<pre>/g, '<pre class="blog-content-pre">')
      // Блоки цитат
      .replace(/<blockquote>/g, '<blockquote class="blog-content-blockquote">')
      // Изображения - добавляем lazy loading
      .replace(/<img/g, '<img class="blog-content-img lazy" loading="lazy"')
      // Таблицы
      .replace(/<table>/g, '<table class="blog-content-table">')
      .replace(/<th>/g, '<th class="blog-content-th">')
      .replace(/<td>/g, '<td class="blog-content-td">')
      .replace(/<tr>/g, '<tr class="blog-content-tr">')
      // Горизонтальные линии
      .replace(/<hr>/g, '<hr class="blog-content-hr">')
      // Жирный и курсив
      .replace(/<strong>/g, '<strong class="blog-content-strong">')
      .replace(/<em>/g, '<em class="blog-content-em">')
    
    return htmlContent
  }, [content])

  // Обработчик для замены изображений на lazy loading версии
  useEffect(() => {
    const images = document.querySelectorAll('.blog-content-img')
    images.forEach((img, index) => {
      const imgElement = img as HTMLImageElement
      const originalSrc = imgElement.src
      const alt = imgElement.alt || `Image ${index + 1}`
      
      // Создаем уникальный ID для изображения
      const imageId = `img-${index}-${Date.now()}`
      imageRefs.current.set(imageId, imgElement)
      
      // Заменяем src на data-src для lazy loading
      imgElement.dataset.src = originalSrc
      imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
      imgElement.classList.add('lazy')
      imgElement.alt = alt
      
      // Добавляем стили для lazy loading
      imgElement.style.transition = 'opacity 0.3s ease-in-out'
      imgElement.style.opacity = '0.7'
    })
  }, [parsedContent])

  // Обработчик для галерей
  useEffect(() => {
    const galleryPlaceholders = document.querySelectorAll('.gallery-placeholder')
    galleryPlaceholders.forEach((placeholder) => {
      const galleryId = placeholder.getAttribute('data-gallery-id')
      if (galleryId) {
        const gallery = galleries.find(g => g.id === galleryId)
        if (gallery) {
          // Заменяем placeholder на реальную галерею
          const galleryElement = document.createElement('div')
          galleryElement.innerHTML = `<ModernImageGallery images={${JSON.stringify(gallery.images)}} columns={${gallery.columns}} />`
          placeholder.parentNode?.replaceChild(galleryElement, placeholder)
        }
      }
    })
  }, [galleries])

  // Обработчик для загрузки изображений
  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    img.style.opacity = '1'
    img.classList.remove('lazy')
  }, [])

  // Обработчик для ошибок загрузки изображений
  const handleImageError = useCallback((img: HTMLImageElement) => {
    img.style.opacity = '0.5'
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
    img.alt = 'Image not found'
  }, [])

  // Добавляем обработчики событий для изображений
  useEffect(() => {
    const currentImageRefs = imageRefs.current
    currentImageRefs.forEach((img) => {
      if (img.classList.contains('lazy')) {
        img.addEventListener('load', () => handleImageLoad(img))
        img.addEventListener('error', () => handleImageError(img))
      }
    })

    return () => {
      currentImageRefs.forEach((img) => {
        img.removeEventListener('load', () => handleImageLoad(img))
        img.removeEventListener('error', () => handleImageError(img))
      })
    }
  }, [handleImageLoad, handleImageError])

  return (
    <div 
      className="blog-content prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: parsedContent }}
    />
  )
}
