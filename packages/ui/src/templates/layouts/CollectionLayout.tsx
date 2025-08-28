import React from 'react'
import { BaseLayout } from '../base/BaseLayout'
import { PageTypeName } from '../../types/config'

export interface CollectionLayoutProps {
  children: React.ReactNode
  pageType?: PageTypeName
  className?: string
}

export const CollectionLayout: React.FC<CollectionLayoutProps> = ({
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
