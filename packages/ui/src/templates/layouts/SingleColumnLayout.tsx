'use client'

import React from 'react'
import { BaseLayout, BaseLayoutProps } from '../base/BaseLayout'
import { useDesignSystem } from '../../design-systems'
import { PageTypeName } from '../../types'

export interface SingleColumnLayoutProps extends BaseLayoutProps {
  showHeader?: boolean
  showFooter?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  centered?: boolean
}

export const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  maxWidth = 'xl',
  centered = true,
  className = '',
  pageType,
  ...props
}) => {
  const { currentSystem } = useDesignSystem()

  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm': return 'max-w-sm'
      case 'md': return 'max-w-md'
      case 'lg': return 'max-w-lg'
      case 'xl': return 'max-w-xl'
      case '2xl': return 'max-w-2xl'
      case 'full': return 'max-w-full'
      default: return 'max-w-xl'
    }
  }

  const getCenteredClass = () => {
    return centered ? 'mx-auto' : ''
  }

  return (
    <BaseLayout
      pageType={pageType}
      className={`${className}`}
      showHeader={showHeader}
      showFooter={showFooter}
      {...props}
    >
      {/* Header */}
      {showHeader && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
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
      <main className="flex-1">
        <div className={`container mx-auto px-4 py-8 ${getMaxWidthClass()} ${getCenteredClass()}`}>
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
