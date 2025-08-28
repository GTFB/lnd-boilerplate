'use client'

import React, { useEffect, useRef } from 'react'
import { TableOfContentsItem } from '../../types/navigation'
import { useSidebar } from '../../contexts/SidebarContext'

export interface TocUpdaterProps {
  headings?: Array<{
    id: string
    title: string
    level: number
  }>
  className?: string
}

export const TocUpdater: React.FC<TocUpdaterProps> = ({
  headings = [],
  className = ''
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { setTableOfContents } = useSidebar()

  useEffect(() => {
    console.log('TocUpdater mounted with headings:', headings)
    
    if (!headings || !headings.length) {
      // Fallback: try to extract headings from DOM after a short delay
      setTimeout(() => {
        const domHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
          .filter(heading => heading.id)
          .map(heading => ({
            id: heading.id,
            title: heading.textContent || '',
            level: parseInt(heading.tagName.charAt(1))
          }))

        if (domHeadings.length > 0) {
          setTableOfContents(domHeadings)
        }
      }, 100)
      return
    }

    // Ensure DOM headings have ids corresponding to provided headings
    headings.forEach(h => {
      const selector = `h${h.level}`
      const nodes = Array.from(document.querySelectorAll(selector)) as HTMLElement[]
      // find first heading with matching text that has no id
      const node = nodes.find(n => (n.textContent || '').trim() === h.title.trim())
      if (node && !node.id) {
        node.id = h.id
      }
    })

    // Push into global sidebar context so TOC panel can render
    setTableOfContents(
      headings.map(h => ({ id: h.id, title: h.title, level: h.level }))
    )

    const options = { rootMargin: '-20% 0px -80% 0px', threshold: 0 }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).id
          const tocLink = document.querySelector(`[href="#${id}"]`)
          if (tocLink) {
            document.querySelectorAll('[data-toc-link]').forEach(link => {
              link.classList.remove('text-primary', 'font-medium')
            })
            tocLink.classList.add('text-primary', 'font-medium')
          }
        }
      })
    }, options)

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => observerRef.current?.disconnect()
  }, [headings, setTableOfContents])

  return null
}
