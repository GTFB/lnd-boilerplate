'use client';

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { marked } from 'marked';

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const [galleries] = useState<
    Array<{
      id: string;
      images: Array<{ src: string; alt: string; caption: string }>;
      columns: number;
    }>
  >([]);
  // const [visibleImages] = useState<Set<string>>(new Set())
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  // Intersection Observer for lazy loading images
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.classList.remove('lazy');
              // setVisibleImages(prev => new Set([...prev, src]))
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    // Observe all lazy images
    imageRefs.current.forEach(img => {
      if (img.classList.contains('lazy')) {
        imageObserver.observe(img);
      }
    });

    return () => {
      imageObserver.disconnect();
    };
  }, []);

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
    let parsedContent = content;
    let galleryIndex = 0;

    // Process ModernImageGallery components
    const imageGalleryRegex = /<ModernImageGallery\s+([^>]*)\s*\/>/g;
    parsedContent = parsedContent.replace(imageGalleryRegex, (match, props) => {
      try {
        // Extract props
        const imagesMatch = props.match(/images=\{\[([\s\S]*?)\]\}/);
        // const columnsMatch = props.match(/columns=\{(\d+)\}/)

        if (imagesMatch) {
          // const imagesStr = imagesMatch[1]
          // const images = parseImages(imagesStr)
          // const columns = columnsMatch ? parseInt(columnsMatch[1]) : 3

          // Add gallery to state
          const galleryId = `gallery-${galleryIndex}`;
          galleryIndex++;

          // Return placeholder for gallery
          return `<div class="image-gallery" data-gallery-id="${galleryId}">
            <div class="gallery-placeholder">
              <p>Image Gallery ${galleryIndex}</p>
              <small>Gallery component will be rendered here</small>
            </div>
          </div>`;
        }
      } catch (error) {
        console.error('Error parsing ModernImageGallery:', error);
      }
      return match; // Return original if parsing fails
    });

    return parsedContent;
  }, [content]);

  // Convert markdown to HTML
  const htmlContent = useMemo(() => {
    return marked(parsedContent, {
      breaks: true,
      gfm: true,
    });
  }, [parsedContent]);

  // Handle image loading
  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    img.classList.remove('lazy');
    img.classList.add('loaded');
  }, []);

  // Handle image error
  const handleImageError = useCallback((img: HTMLImageElement) => {
    img.classList.add('error');
    img.alt = 'Image failed to load';
  }, []);

  return (
    <div className="blog-content prose prose-lg max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="markdown-content"
      />
      
      <style jsx>{`
        .blog-content {
          line-height: 1.6;
          color: #374151;
        }
        
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          line-height: 1.25;
        }
        
        .blog-content h1 {
          font-size: 2.25rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        .blog-content h2 {
          font-size: 1.875rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
        }
        
        .blog-content h4 {
          font-size: 1.25rem;
        }
        
        .blog-content p {
          margin-bottom: 1.25rem;
        }
        
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        .blog-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          transition: opacity 0.3s ease;
        }
        
        .blog-content img.lazy {
          opacity: 0.3;
        }
        
        .blog-content img.loaded {
          opacity: 1;
        }
        
        .blog-content img.error {
          opacity: 0.5;
          filter: grayscale(100%);
        }
        
        .blog-content a {
          color: #3b82f6;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        
        .blog-content a:hover {
          color: #2563eb;
          text-decoration-thickness: 2px;
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        
        .blog-content th,
        .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
          text-align: left;
        }
        
        .blog-content th {
          background-color: #f9fafb;
          font-weight: 600;
        }
        
        .blog-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }
        
        .image-gallery {
          margin: 2rem 0;
          padding: 1rem;
          border: 2px dashed #e5e7eb;
          border-radius: 0.5rem;
          text-align: center;
        }
        
        .gallery-placeholder {
          color: #6b7280;
        }
        
        .gallery-placeholder p {
          margin: 0;
          font-weight: 600;
        }
        
        .gallery-placeholder small {
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
