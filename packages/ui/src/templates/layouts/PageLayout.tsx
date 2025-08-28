import React from 'react'
import { BaseLayout } from '../base/BaseLayout'
import { PageTypeName } from '../../types/config'

export interface PageLayoutProps {
  children: React.ReactNode
  pageType?: PageTypeName
  className?: string
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  pageType = 'landingPage',
  className = ''
}) => {
  return (
    <BaseLayout
      layout="single-column"
      pageType={pageType}
      className={className}
    >
      {children}
    </BaseLayout>
  )
}
