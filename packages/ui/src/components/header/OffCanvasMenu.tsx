'use client'

import React, { useState, useEffect } from 'react'
import { useDesignSystem } from '../../design-systems'
import { NavigationItem } from '../../types/navigation'
import { X, Search, User, Settings, Bell, Sun, Moon, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export interface OffCanvasMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation?: NavigationItem[]
  showSearch?: boolean
  showUserMenu?: boolean
  showNotifications?: boolean
  showThemeToggle?: boolean
  className?: string
}

export const OffCanvasMenu: React.FC<OffCanvasMenuProps> = ({
  isOpen,
  onClose,
  navigation = [],
  showSearch = true,
  showUserMenu = true,
  showNotifications = true,
  showThemeToggle = true,
  className = ''
}) => {
  const { currentSystem, switchSystem } = useDesignSystem()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const defaultNavigation = [
    {
      title: 'Home',
      href: '/',
      children: [
        { title: 'Overview', href: '/', description: 'Get started with our platform' },
        { title: 'Features', href: '/features', description: 'Explore what we offer' }
      ]
    },
    {
      title: 'Documentation',
      href: '/docs',
      children: [
        { title: 'Getting Started', href: '/docs/getting-started', description: 'Quick start guide' },
        { title: 'API Reference', href: '/docs/api', description: 'Complete API documentation' },
        { title: 'Examples', href: '/docs/examples', description: 'Code examples and tutorials' }
      ]
    },
    {
      title: 'Blog',
      href: '/blog',
      badge: 'New'
    },
    {
      title: 'About',
      href: '/about'
    }
  ] as NavigationItem[]

  const navItems = navigation.length > 0 ? navigation : defaultNavigation

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
    console.log('Searching for:', searchQuery)
  }

  const toggleTheme = () => {
    const newTheme = currentSystem === 'lora' ? 'alisa' : 'lora'
    switchSystem(newTheme)
  }

  const toggleExpandedItem = (title: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(title)) {
      newExpanded.delete(title)
    } else {
      newExpanded.add(title)
    }
    setExpandedItems(newExpanded)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-background border-l z-50 transform transition-transform duration-300 ease-in-out ${className}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Search */}
            {showSearch && (
              <div>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10"
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    <span>{item.title}</span>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.children && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleExpandedItem(item.title)
                          }}
                        >
                          <ChevronRight 
                            className={`h-3 w-3 transition-transform ${
                              expandedItems.has(item.title) ? 'rotate-90' : ''
                            }`} 
                          />
                        </Button>
                      )}
                    </div>
                  </a>
                  
                  {/* Nested items */}
                  {item.children && expandedItems.has(item.title) && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <a
                          key={childIndex}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="flex items-center justify-between">
                            <span>{child.title}</span>
                            {child.badge && (
                              <Badge variant="outline" className="text-xs">
                                {child.badge}
                              </Badge>
                            )}
                          </div>
                          {child.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {child.description}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="space-y-2">
              {showThemeToggle && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-full justify-start"
                >
                  {currentSystem === 'lora' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  Toggle theme
                </Button>
              )}

              {showNotifications && (
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                  <Badge className="ml-auto">3</Badge>
                </Button>
              )}
            </div>
          </div>

          {/* Footer - User Menu */}
          {showUserMenu && (
            <div className="border-t p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">User Name</p>
                  <p className="text-xs text-muted-foreground truncate">
                    user@example.com
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
