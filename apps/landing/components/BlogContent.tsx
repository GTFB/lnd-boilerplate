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

  // Intersection Observer for lazy loading images
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

  // Function for parsing images
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

  // Parse content only once when content changes
  const parsedContent = useMemo(() => {
    let parsedContent = content
    let galleryIndex = 0
    
    // Process ModernImageGallery components
    const imageGalleryRegex = /<ModernImageGallery\s+([^>]*)\s*\/>/g
    parsedContent = parsedContent.replace(imageGalleryRegex, (match, props) => {
      try {
        // Extract props
        const imagesMatch = props.match(/images=\{\[([\s\S]*?)\]\}/)
        // const columnsMatch = props.match(/columns=\{(\d+)\}/)
        
        if (imagesMatch) {
          // const imagesStr = imagesMatch[1]
          // const images = parseImages(imagesStr)
          // const columns = columnsMatch ? parseInt(columnsMatch[1]) : 3
          
          // Add gallery to state
          const galleryId = `gallery-${galleryIndex}`
          galleryIndex++
          
          return `<div class="gallery-placeholder" data-gallery-id="${galleryId}"></div>`
        }
      } catch (error) {
        console.error('Error parsing ModernImageGallery:', error)
      }
      
      return match
    })
    
    // Parse markdown to HTML
    let htmlContent = marked(parsedContent) as string
    
    // Add CSS classes to HTML elements
    htmlContent = htmlContent
              // Headings
      .replace(/<h1>/g, '<h1 class="blog-content-h1">')
      .replace(/<h2>/g, '<h2 class="blog-content-h2">')
      .replace(/<h3>/g, '<h3 class="blog-content-h3">')
      .replace(/<h4>/g, '<h4 class="blog-content-h4">')
      .replace(/<h5>/g, '<h5 class="blog-content-h5">')
      .replace(/<h6>/g, '<h6 class="blog-content-h6">')
              // Paragraphs
      .replace(/<p>/g, '<p class="blog-content-p">')
              // Lists
      .replace(/<ul>/g, '<ul class="blog-content-ul">')
      .replace(/<ol>/g, '<ol class="blog-content-ol">')
      .replace(/<li>/g, '<li class="blog-content-li">')
              // Links
      .replace(/<a\s+href=/g, '<a class="blog-content-a" href=')
              // Code
      .replace(/<code>/g, '<code class="blog-content-code">')
      .replace(/<pre>/g, '<pre class="blog-content-pre">')
              // Blockquotes
      .replace(/<blockquote>/g, '<blockquote class="blog-content-blockquote">')
              // Images - add lazy loading
      .replace(/<img/g, '<img class="blog-content-img lazy" loading="lazy"')
              // Tables
      .replace(/<table>/g, '<table class="blog-content-table">')
      .replace(/<th>/g, '<th class="blog-content-th">')
      .replace(/<td>/g, '<td class="blog-content-td">')
      .replace(/<tr>/g, '<tr class="blog-content-tr">')
              // Horizontal lines
      .replace(/<hr>/g, '<hr class="blog-content-hr">')
              // Bold and italic
      .replace(/<strong>/g, '<strong class="blog-content-strong">')
      .replace(/<em>/g, '<em class="blog-content-em">')
    
    return htmlContent
  }, [content])

      // Handler for replacing images with lazy loading versions
  useEffect(() => {
    const images = document.querySelectorAll('.blog-content-img')
    images.forEach((img, index) => {
      const imgElement = img as HTMLImageElement
      const originalSrc = imgElement.src
      const alt = imgElement.alt || `Image ${index + 1}`
      
      // Create unique ID for image
      const imageId = `img-${index}-${Date.now()}`
      imageRefs.current.set(imageId, imgElement)
      
      // Replace src with data-src for lazy loading
      imgElement.dataset.src = originalSrc
      imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
      imgElement.classList.add('lazy')
      imgElement.alt = alt
      
      // Add styles for lazy loading
      imgElement.style.transition = 'opacity 0.3s ease-in-out'
      imgElement.style.opacity = '0.7'
    })
  }, [parsedContent])

  // Gallery handler
  useEffect(() => {
    const galleryPlaceholders = document.querySelectorAll('.gallery-placeholder')
    galleryPlaceholders.forEach((placeholder) => {
      const galleryId = placeholder.getAttribute('data-gallery-id')
      if (galleryId) {
        const gallery = galleries.find(g => g.id === galleryId)
        if (gallery) {
          // Replace placeholder with real gallery
          const galleryElement = document.createElement('div')
          galleryElement.innerHTML = `<ModernImageGallery images={${JSON.stringify(gallery.images)}} columns={${gallery.columns}} />`
          placeholder.parentNode?.replaceChild(galleryElement, placeholder)
        }
      }
    })
  }, [galleries])

  // Image load handler
  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    img.style.opacity = '1'
    img.classList.remove('lazy')
  }, [])

  // Image error handler
  const handleImageError = useCallback((img: HTMLImageElement) => {
    img.style.opacity = '0.5'
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
    img.alt = 'Image not found'
  }, [])

  // Add event handlers for images
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
