"use client"

import { useState, useEffect, useMemo } from 'react'
import { ConfigManager } from '../../config'
import { LayoutName, PageTypeName } from '../../types'

export interface UseLayoutReturn {
  currentLayout: LayoutName
  layoutConfig: any
  isLoading: boolean
  error: string | null
}

export const useLayout = (
  layout?: LayoutName,
  pageType?: PageTypeName
): UseLayoutReturn => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const configManager = ConfigManager.getInstance()
        const loadedConfig = await configManager.loadConfig()
        setConfig(loadedConfig)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load layout configuration')
      } finally {
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [])

  const currentLayout = useMemo((): LayoutName => {
    if (layout) return layout
    
    if (pageType && config?.pageTypes?.[pageType]?.template) {
      return config.pageTypes[pageType].template as LayoutName
    }
    
    return config?.layouts?.default || 'single-column'
  }, [layout, pageType, config])

  const layoutConfig = useMemo(() => {
    if (!config) return {}
    
    // Получаем конфигурацию для текущего макета
    const layoutTemplate = config.layouts?.templates?.[currentLayout]
    const pageTypeConfig = pageType ? config.pageTypes?.[pageType] : null
    
    return {
      ...layoutTemplate,
      ...pageTypeConfig,
      // Дополнительные настройки для конкретного макета
      ...(currentLayout === 'sidebar-both' && {
        leftSidebarTitle: 'Navigation',
        rightSidebarTitle: 'Table of Contents'
      }),
      ...(currentLayout === 'sidebar-left' && {
        sidebarTitle: 'Navigation'
      }),
      ...(currentLayout === 'sidebar-right' && {
        sidebarTitle: 'Related'
      })
    }
  }, [config, currentLayout, pageType])

  return {
    currentLayout,
    layoutConfig,
    isLoading,
    error
  }
}
