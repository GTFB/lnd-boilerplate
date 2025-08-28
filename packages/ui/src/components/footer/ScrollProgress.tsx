'use client'

import React, { useState, useEffect } from 'react'
import { useDesignSystem } from '../../design-systems'
import { 
  ChevronUp, 
  ChevronDown, 
  Minus,
  BarChart3
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export interface ScrollProgressProps {
  position?: 'top' | 'bottom' | 'left' | 'right'
  thickness?: 'thin' | 'normal' | 'thick'
  color?: 'primary' | 'accent' | 'gradient' | 'custom'
  customColor?: string
  showPercentage?: boolean
  showScrollButtons?: boolean
  showProgressBar?: boolean
  showScrollInfo?: boolean
  smooth?: boolean
  className?: string
  onScrollChange?: (progress: number) => void
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  position = 'top',
  thickness = 'normal',
  color = 'primary',
  customColor,
  showPercentage = false,
  showScrollButtons = true,
  showProgressBar = true,
  showScrollInfo = false,
  smooth = true,
  className = '',
  onScrollChange
}) => {
  const { currentSystem } = useDesignSystem()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none')
  const [lastScrollY, setLastScrollY] = useState(0)

  const getThicknessClasses = () => {
    switch (thickness) {
      case 'thin':
        return 'h-0.5'
      case 'thick':
        return 'h-2'
      default:
        return 'h-1'
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'bottom-0 left-0 right-0'
      case 'left':
        return 'left-0 top-0 bottom-0 w-1'
      case 'right':
        return 'right-0 top-0 bottom-0 w-1'
      default:
        return 'top-0 left-0 right-0'
    }
  }

  const getColorClasses = () => {
    if (customColor) return customColor
    
    switch (color) {
      case 'accent':
        return 'bg-accent'
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-accent'
      default:
        return 'bg-primary'
    }
  }

  const getProgressBarClasses = () => {
    const baseClasses = `transition-all duration-200 ${getColorClasses()}`
    
    if (position === 'left' || position === 'right') {
      return `${baseClasses} w-full transition-all duration-200`
    }
    
    return `${baseClasses} h-full transition-all duration-200`
  }

  const getProgressStyle = () => {
    if (position === 'left' || position === 'right') {
      return { height: `${scrollProgress}%` }
    }
    return { width: `${scrollProgress}%` }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = Math.round((scrollTop / scrollHeight) * 100)
      
      setScrollProgress(progress)
      onScrollChange?.(progress)

      // Determine scroll direction
      if (scrollTop > lastScrollY) {
        setScrollDirection('down')
      } else if (scrollTop < lastScrollY) {
        setScrollDirection('up')
      }
      
      setLastScrollY(scrollTop)
    }

    const throttledScroll = () => {
      if (smooth) {
        requestAnimationFrame(handleScroll)
      } else {
        handleScroll()
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', throttledScroll)
  }, [lastScrollY, smooth, onScrollChange])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: smooth ? 'smooth' : 'auto' 
    })
  }

  const scrollUp = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop
    window.scrollTo({ 
      top: Math.max(0, currentScroll - 300), 
      behavior: smooth ? 'smooth' : 'auto' 
    })
  }

  const scrollDown = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
    window.scrollTo({ 
      top: Math.min(maxScroll, currentScroll + 300), 
      behavior: smooth ? 'smooth' : 'auto' 
    })
  }

  if (!showProgressBar && !showScrollButtons && !showScrollInfo) {
    return null
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-40 ${className}`}>
      {/* Progress Bar */}
      {showProgressBar && (
        <div className={`w-full ${getThicknessClasses()} bg-muted/30`}>
          <div 
            className={getProgressBarClasses()}
            style={getProgressStyle()}
            role="progressbar"
            aria-valuenow={scrollProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Scroll progress"
          />
        </div>
      )}

      {/* Scroll Info */}
      {showScrollInfo && (
        <div className="absolute right-4 top-2 bg-background/90 backdrop-blur border rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">
              {scrollProgress}%
            </Badge>
            <div className="flex items-center space-x-1">
              {scrollDirection === 'up' && <ChevronUp className="h-3 w-3 text-green-500" />}
              {scrollDirection === 'down' && <ChevronDown className="h-3 w-3 text-red-500" />}
              {scrollDirection === 'none' && <Minus className="h-3 w-3 text-muted-foreground" />}
            </div>
          </div>
        </div>
      )}

      {/* Scroll Buttons */}
      {showScrollButtons && (
        <div className="absolute right-4 top-4 space-y-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={scrollToTop}
            className="h-8 w-8 p-0 shadow-lg"
            title="Scroll to top"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={scrollUp}
            className="h-8 w-8 p-0 shadow-lg"
            title="Scroll up"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={scrollDown}
            className="h-8 w-8 p-0 shadow-lg"
            title="Scroll down"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={scrollToBottom}
            className="h-8 w-8 p-0 shadow-lg"
            title="Scroll to bottom"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Percentage Display */}
      {showPercentage && (
        <div className="absolute left-4 top-2 bg-background/90 backdrop-blur border rounded-lg px-3 py-2 shadow-lg">
          <Badge variant="outline" className="text-xs font-mono">
            {scrollProgress}%
          </Badge>
        </div>
      )}
    </div>
  )
}
