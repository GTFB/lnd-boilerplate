'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  className?: string
  allowMultiple?: boolean
  defaultOpen?: string[]
  onToggle?: (id: string, isOpen: boolean) => void
}

export function Accordion({
  items,
  className,
  allowMultiple = false,
  defaultOpen = [],
  onToggle
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen))

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems)
    
    if (allowMultiple) {
      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId)
      } else {
        newOpenItems.add(itemId)
      }
    } else {
      newOpenItems.clear()
      newOpenItems.add(itemId)
    }
    
    setOpenItems(newOpenItems)
    
    if (onToggle) {
      onToggle(itemId, newOpenItems.has(itemId))
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id)
        const isDisabled = item.disabled

        return (
          <div
            key={item.id}
            className={cn(
              'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                'flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
                'focus:outline-none',
                isOpen && 'bg-gray-50 dark:bg-gray-700'
              )}
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gray-500 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            
            {isOpen && (
              <div className="px-4 pb-3 bg-gray-50 dark:bg-gray-900">
                <div className="pt-2 text-gray-700 dark:text-gray-300">
                  {item.content}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
