'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { marked } from 'marked'
import { ModernImageGallery } from './ModernImageGallery'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const [galleries, setGalleries] = useState<Array<{
    id: string
    images: Array<{src: string, alt: string, caption: string}>
    columns: number
  }>>([])

  // Функция для парсинга изображений
  const parseImages = (imagesStr: string) => {
    const images: Array<{src: string, alt: string, caption: string}> = []
    const imageRegex = /\{\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]+)",\s*caption:\s*"([^"]*)"\s*\}/g
    let match
    
    while ((match = imageRegex.exec(imagesStr)) !== null) {
      images.push({
        src: match[1],
        alt: match[2],
        caption: match[3]
      })
    }
    
    return images
  }

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
        const columnsMatch = props.match(/columns=\{(\d+)\}/)
        
        if (imagesMatch) {
          const imagesStr = imagesMatch[1]
          const images = parseImages(imagesStr)
          const columns = columnsMatch ? parseInt(columnsMatch[1]) : 3
          
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
      // Изображения
      .replace(/<img/g, '<img class="blog-content-img"')
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

  // Извлекаем данные галерей из контента
  useEffect(() => {
    const extractedGalleries: Array<{
      id: string
      images: Array<{src: string, alt: string, caption: string}>
      columns: number
    }> = []
    
    let galleryIndex = 0
    const imageGalleryRegex = /<ModernImageGallery\s+([^>]*)\s*\/>/g
    let match
    
    while ((match = imageGalleryRegex.exec(content)) !== null) {
      try {
        const props = match[1]
        const imagesMatch = props.match(/images=\{\[([\s\S]*?)\]\}/)
        const columnsMatch = props.match(/columns=\{(\d+)\}/)
        
        if (imagesMatch) {
          const imagesStr = imagesMatch[1]
          const images = parseImages(imagesStr)
          const columns = columnsMatch ? parseInt(columnsMatch[1]) : 3
          
          extractedGalleries.push({ 
            id: `gallery-${galleryIndex}`, 
            images, 
            columns 
          })
          galleryIndex++
        }
      } catch (error) {
        console.error('Error extracting gallery data:', error)
      }
    }
    
    setGalleries(extractedGalleries)
  }, [content])

  return (
    <div className="blog-content">
      <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
      
      {/* Рендерим галереи */}
      {galleries.map((gallery) => (
        <div key={gallery.id} className="my-8">
          <ModernImageGallery 
            images={gallery.images} 
            columns={gallery.columns} 
          />
        </div>
      ))}
    </div>
  )
}
