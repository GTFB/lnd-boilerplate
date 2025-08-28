'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useDesignSystem } from '../../design-systems'
import { LayoutName, PageTypeName } from '../../types'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'

export interface BaseLayoutProps {
  layout: LayoutName
  pageType?: PageTypeName
  children: React.ReactNode
  className?: string
  showHeader?: boolean
  showFooter?: boolean
  leftSidebarTitle?: string
  rightSidebarTitle?: string
}

export abstract class BaseLayoutClass {
  abstract name: string
  abstract description: string
  abstract structure: string[]
  
  getLayoutClasses(): string {
    return 'min-h-screen flex flex-col'
  }
  
  getSidebarClasses(): string {
    return 'w-64 bg-sidebar-background border-r border-sidebar-border'
  }
  
  getContentClasses(): string {
    return 'flex-1 p-6'
  }
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  layout,
  pageType,
  children,
  className = '',
  showHeader = true,
  showFooter = true,
  leftSidebarTitle,
  rightSidebarTitle
}) => {
  const { currentSystem } = useDesignSystem()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const previousThemeClassRef = useRef<string | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Apply design system theme class without overwriting other classes (e.g., fonts)
    if (typeof document !== 'undefined') {
      const docEl = document.documentElement
      const nextThemeClass = `${currentSystem}-theme`

      // Remove previous theme class if present
      const prev = previousThemeClassRef.current
      if (prev && prev !== nextThemeClass) {
        docEl.classList.remove(prev)
      }

      // Add next theme class if not already on element
      if (!docEl.classList.contains(nextThemeClass)) {
        docEl.classList.add(nextThemeClass)
      }

      // Save current theme class for cleanup on change
      previousThemeClassRef.current = nextThemeClass
    }
  }, [currentSystem])

  const getLayoutClasses = () => {
    const baseClasses = 'min-h-screen flex flex-col'
    return `${baseClasses} ${className}`.trim()
  }

  const getSidebarClasses = () => {
    const baseClasses = 'w-64 bg-sidebar-background border-r border-sidebar-border'
    return isMobile ? 'w-full' : baseClasses
  }

  const getContentClasses = () => {
    const baseClasses = 'flex-1 p-6'
    return isMobile ? 'w-full p-4' : baseClasses
  }

  return (
    <div className={getLayoutClasses()}>
      {/* Header */}
      {showHeader && <Header />}

      {/* Main Content */}
      <main className="flex flex-1">
        {/* Left Sidebar */}
        {leftSidebarTitle && (
          <aside className={`${getSidebarClasses()} ${isMobile && !isSidebarOpen ? 'hidden' : ''}`}>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">{leftSidebarTitle}</h2>
              <div className="space-y-2">
                {/* Sidebar content will be injected here */}
              </div>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <div className={getContentClasses()}>
          {children}
        </div>

        {/* Right Sidebar */}
        {rightSidebarTitle && (
          <aside className={`${getSidebarClasses()} ${isMobile ? 'hidden' : ''}`}>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">{rightSidebarTitle}</h2>
              <div className="space-y-2">
                {/* Right sidebar content will be injected here */}
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  )
}

export const useBaseLayout = () => {
  const { currentSystem } = useDesignSystem()
  
  return {
    currentSystem,
    getLayoutClasses: () => 'min-h-screen flex flex-col',
    getSidebarClasses: () => 'w-64 bg-sidebar-background border-r border-sidebar-border',
    getContentClasses: () => 'flex-1 p-6'
  }
}
