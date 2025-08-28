import React, { useEffect, useRef } from 'react'
import { TableOfContentsItem } from '../../types/navigation'

export interface TocUpdaterProps {
  headings: Array<{
    id: string
    title: string
    level: number
  }>
  onUpdate?: (items: TableOfContentsItem[]) => void
  className?: string
}

export const TocUpdater: React.FC<TocUpdaterProps> = ({
  headings,
  onUpdate,
  className = ''
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!headings.length) return

    // Convert headings to TOC items
    const tocItems: TableOfContentsItem[] = headings.map(h => ({
      title: h.title,
      href: `#${h.id}`,
      level: h.level
    }))

    // Notify parent component
    if (onUpdate) {
      onUpdate(tocItems)
    }

    // Set up intersection observer for active heading tracking
    const options = {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Update active heading in TOC
          const id = entry.target.id
          const tocLink = document.querySelector(`[href="#${id}"]`)
          if (tocLink) {
            // Remove active class from all links
            document.querySelectorAll('[data-toc-link]').forEach(link => {
              link.classList.remove('text-primary', 'font-medium')
            })
            // Add active class to current link
            tocLink.classList.add('text-primary', 'font-medium')
          }
        }
      })
    }, options)

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [headings, onUpdate])

  // This component doesn't render anything visible
  return null
}
