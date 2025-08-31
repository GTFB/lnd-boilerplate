'use client'

import React, { useState, useEffect } from 'react'
import { BaseLayout, BaseLayoutProps } from '../base/BaseLayout'
import { useDesignSystem } from '../../design-systems'
import { PageTypeName } from '../../types'
import { NavigationItem } from '../../types/navigation'
import { Header } from '../../components/common/Header'
import { Footer } from '../../components/common/Footer'

export interface SidebarBothLayoutProps extends BaseLayoutProps {
  showHeader?: boolean
  showFooter?: boolean
  leftSidebarTitle?: string
  rightSidebarTitle?: string
  leftNavigationItems?: NavigationItem[]
  rightNavigationItems?: NavigationItem[]
}

export const SidebarBothLayout: React.FC<SidebarBothLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  leftSidebarTitle = 'Navigation',
  rightSidebarTitle = 'Table of Contents',
  leftNavigationItems = [],
  rightNavigationItems = [],
  className = '',
  pageType,
  ...props
}) => {
  const { currentSystem } = useDesignSystem()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 1024)
      setIsRightSidebarVisible(width >= 1280)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])



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
      rightSidebarTitle={rightSidebarTitle}
      {...props}
    >
      {/* Header */}
      {showHeader && <Header />}

      {/* Main Content */}
      <main className="flex flex-1">
        {/* Left Sidebar */}
        <aside className={`w-64 bg-sidebar-background border-r border-sidebar-border ${isMobile && !isSidebarOpen ? 'hidden' : ''}`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">{leftSidebarTitle}</h2>
            <div className="space-y-2">
              {leftNavigationItems.map(renderNavigationItem)}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {children}
        </div>

        {/* Right Sidebar */}
        {isRightSidebarVisible && !isMobile && (
          <aside className="w-64 bg-sidebar-background border-l border-sidebar-border">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">{rightSidebarTitle}</h2>
              <div className="space-y-2">
                {rightNavigationItems.map(renderNavigationItem)}
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </BaseLayout>
  )
}
