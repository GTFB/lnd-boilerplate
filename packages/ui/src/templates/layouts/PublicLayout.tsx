import React from 'react'
import { BaseLayout } from '../base/BaseLayout'
import { PageTypeName } from '../../types/config'

export interface PublicLayoutProps {
  children: React.ReactNode
  pageType?: PageTypeName
  className?: string
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
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
