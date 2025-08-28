'use client'

import React from 'react'
import { LayoutName, PageTypeName } from '../types'
import { SingleColumnLayout } from './layouts/SingleColumnLayout'
import { SidebarLeftLayout } from './layouts/SidebarLeftLayout'
import { SidebarRightLayout } from './layouts/SidebarRightLayout'
import { SidebarBothLayout } from './layouts/SidebarBothLayout'
import { useLayout } from './hooks/useLayout'

export interface LayoutRendererProps {
  layout?: LayoutName
  pageType?: PageTypeName
  children: React.ReactNode
  className?: string
  leftSidebarTitle?: string
  rightSidebarTitle?: string
}

export const LayoutRenderer: React.FC<LayoutRendererProps> = ({
  layout,
  pageType,
  children,
  className = '',
  leftSidebarTitle,
  rightSidebarTitle
}) => {
  const { currentLayout, layoutConfig } = useLayout(layout, pageType)

  // Render the appropriate layout based on the current layout
  switch (currentLayout) {
    case 'single-column':
      return (
        <SingleColumnLayout
          layout="single-column"
          pageType={pageType}
          className={className}
        >
          {children}
        </SingleColumnLayout>
      )

    case 'sidebar-left':
      return (
        <SidebarLeftLayout
          layout="sidebar-left"
          pageType={pageType}
          className={className}
          leftSidebarTitle={leftSidebarTitle}
        >
          {children}
        </SidebarLeftLayout>
      )

    case 'sidebar-right':
      return (
        <SidebarRightLayout
          layout="sidebar-right"
          pageType={pageType}
          className={className}
          rightSidebarTitle={rightSidebarTitle}
        >
          {children}
        </SidebarRightLayout>
      )

    case 'sidebar-both':
      return (
        <SidebarBothLayout
          layout="sidebar-both"
          pageType={pageType}
          className={className}
          leftSidebarTitle={leftSidebarTitle}
          rightSidebarTitle={rightSidebarTitle}
        >
          {children}
        </SidebarBothLayout>
      )

    default:
      return (
        <SingleColumnLayout
          layout="single-column"
          pageType={pageType}
          className={className}
        >
          {children}
        </SingleColumnLayout>
      )
  }
}
