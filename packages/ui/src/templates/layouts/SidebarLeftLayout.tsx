'use client'

import React, { useState, useEffect } from 'react'
import { BaseLayout, BaseLayoutProps } from '../base/BaseLayout'
import { useDesignSystem } from '../../design-systems'
import { PageTypeName } from '../../types'
import { NavigationItem } from '../../types/navigation'

export interface SidebarLeftLayoutProps extends BaseLayoutProps {
  showHeader?: boolean
  showFooter?: boolean
  leftSidebarTitle?: string
  navigationItems?: NavigationItem[]
}

export const SidebarLeftLayout: React.FC<SidebarLeftLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  leftSidebarTitle = 'Navigation',
  navigationItems = [],
  className = '',
  pageType,
  ...props
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderNavigationItem = (item: NavigationItem) => {
    return (
      <div key={item.href} className="space-y-2">
        <a
          href={item.href}
          className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors"
        >
          <span className="text-sm font-medium">{item.title}</span>
          {item.badge && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {item.badge}
            </span>
          )}
        </a>
        {item.children && (
          <div className="ml-4 space-y-1">
            {item.children.map(renderNavigationItem)}
          </div>
        )}
      </div>
    )
  }

  return (
    <BaseLayout
      pageType={pageType}
      className={className}
      showHeader={showHeader}
      showFooter={showFooter}
      leftSidebarTitle={leftSidebarTitle}
      {...props}
    >
      {/* Header */}
      {showHeader && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
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
        <aside className={`w-64 bg-sidebar-background border-r border-sidebar-border ${isMobile && !isSidebarOpen ? 'hidden' : ''}`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">{leftSidebarTitle}</h2>
            <div className="space-y-2">
              {navigationItems.map(renderNavigationItem)}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {children}
        </div>
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
    </BaseLayout>
  )
}
