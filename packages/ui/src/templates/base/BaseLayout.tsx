'use client'

import React, { useState, useEffect } from 'react'
import { useDesignSystem } from '../../design-systems'
import { LayoutName, PageTypeName } from '../../types'

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Apply design system to document
    if (typeof document !== 'undefined') {
      document.documentElement.className = `${currentSystem}-theme`
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
      {showHeader && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2 rounded-md hover:bg-accent"
                >
                  <span className="sr-only">Toggle sidebar</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-xl font-bold">LND Boilerplate</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Design System: {currentSystem}
                </span>
              </div>
            </div>
          </div>
        </header>
      )}

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
      {showFooter && (
        <footer className="border-t bg-background">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-muted-foreground">
              © 2024 LND Boilerplate. All rights reserved.
            </div>
          </div>
        </footer>
      )}
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
