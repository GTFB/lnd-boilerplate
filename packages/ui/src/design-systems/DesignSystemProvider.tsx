'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { BaseDesignSystem } from './BaseDesignSystem'
import { LoraDesignSystem } from './LoraDesignSystem'
import { AlisaDesignSystem } from './AlisaDesignSystem'
import { DesignSystemName } from '../types'
import { CookieProvider } from '../contexts/CookieContext'

interface DesignSystemContextType {
  currentSystem: DesignSystemName
  switchSystem: (system: DesignSystemName) => void
  getCurrentSystem: () => BaseDesignSystem
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined)

interface DesignSystemProviderProps {
  children: React.ReactNode
  defaultSystem?: DesignSystemName
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  defaultSystem = 'lora'
}) => {
  const [currentSystem, setCurrentSystem] = useState<DesignSystemName>(defaultSystem)

  const systems: Record<DesignSystemName, BaseDesignSystem> = {
    lora: new LoraDesignSystem(),
    alisa: new AlisaDesignSystem()
  }

  const switchSystem = (system: DesignSystemName) => {
    // Remove current system styles
    const currentSystemInstance = systems[currentSystem]
    currentSystemInstance.removeStyles()

    // Apply new system styles
    const newSystemInstance = systems[system]
    newSystemInstance.applyStyles()

    setCurrentSystem(system)
  }

  const getCurrentSystem = (): BaseDesignSystem => {
    return systems[currentSystem]
  }

  useEffect(() => {
    // Apply initial system styles
    const initialSystem = systems[currentSystem]
    initialSystem.applyStyles()

    // Cleanup on unmount
    return () => {
      initialSystem.removeStyles()
    }
  }, [currentSystem])

  return (
    <DesignSystemContext.Provider value={{
      currentSystem,
      switchSystem,
      getCurrentSystem
    }}>
      <CookieProvider>
        {children}
      </CookieProvider>
    </DesignSystemContext.Provider>
  )
}

export const useDesignSystem = (): DesignSystemContextType => {
  const context = useContext(DesignSystemContext)
  if (!context) {
    // Return default values instead of throwing error
    return {
      currentSystem: 'lora' as DesignSystemName,
      switchSystem: () => {},
      getCurrentSystem: () => new LoraDesignSystem()
    }
  }
  return context
}
