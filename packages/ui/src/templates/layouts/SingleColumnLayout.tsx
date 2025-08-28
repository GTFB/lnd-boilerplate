'use client'

import React from 'react'
import { BaseLayout, BaseLayoutProps } from '../base/BaseLayout'
import { useDesignSystem } from '../../design-systems'
import { PageTypeName } from '../../types'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'

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
      {showHeader && <Header />}

      {/* Main Content */}
      <main className="flex-1">
        <div className={`container mx-auto px-4 py-8 max-w-1480 ${getCenteredClass()}`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </BaseLayout>
  )
}
