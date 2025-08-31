'use client'

import React, { useState } from 'react'
import { useDesignSystem } from '../../design-systems'
import { NavigationItem } from '../../types/navigation'
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Settings, 
  Bell, 
  Sun, 
  Moon,
  ChevronDown,
  LogOut
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

export interface MainHeaderProps {
  logo?: React.ReactNode
  navigation?: Array<{
    title: string
    href: string
    badge?: string
    children?: Array<{
      title: string
      href: string
      description?: string
      badge?: string
    }>
  }>
  actions?: React.ReactNode
  headerConfig?: {
    layout: {
      left: string[]
      center: string[]
      right: string[]
    }
    logo: {
      enabled: boolean
      text: string
      image: string | null
      href: string
    }
    mobileMenu: {
      enabled: boolean
    }
    search: {
      enabled: boolean
      placeholder: string
    }
    language: {
      enabled: boolean
      showFlag: boolean
      showName: boolean
    }
    theme: {
      enabled: boolean
      default: string
    }
    notifications: {
      enabled: boolean
      count: number
    }
    userMenu: {
      enabled: boolean
      showAvatar: boolean
      showName: boolean
    }
  }
  globalConfig?: {
    maxWidth?: string
    primaryColor?: string
    secondaryColor?: string
    accentColor?: string
  }
  currentLocale?: string
  availableLocales?: string[]
  onLocaleChange?: (locale: string) => void
  t?: (key: string) => string
  className?: string
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  logo,
  navigation = [],
  actions,
  headerConfig,
  globalConfig,
  currentLocale = 'en',
  availableLocales = ['en', 'ru'],
  onLocaleChange,
  t = (key: string) => key,
  className = ''
}) => {
  const { currentSystem, switchSystem } = useDesignSystem()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Default header configuration
  const defaultHeaderConfig = {
    layout: {
      left: ['logo', 'mobileMenu'],
      center: ['navigation'],
      right: ['search', 'language', 'theme', 'notifications', 'userMenu']
    },
    logo: {
      enabled: true,
      text: 'LND',
      image: null,
      href: '/'
    },
    mobileMenu: {
      enabled: true
    },
    search: {
      enabled: true,
      placeholder: 'common.search'
    },
    language: {
      enabled: true,
      showFlag: false,
      showName: true
    },
    theme: {
      enabled: true,
      default: 'light'
    },
    notifications: {
      enabled: false,
      count: 0
    },
    userMenu: {
      enabled: false,
      showAvatar: true,
      showName: true
    }
  }

  const config = headerConfig || defaultHeaderConfig

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
    console.log('Searching for:', searchQuery)
  }

  const toggleTheme = () => {
    const newTheme = currentSystem === 'lora' ? 'alisa' : 'lora'
    switchSystem(newTheme)
  }

  // Render functions for each element
  const renderLogo = () => {
    if (!config.logo.enabled) return null
    return logo || (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
        <span className="text-xl font-bold">{config.logo.text}</span>
      </div>
    )
  }

  const renderMobileMenu = () => {
    if (!config.mobileMenu.enabled) return null
    return (
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="sr-only">Toggle mobile menu</span>
      </Button>
    )
  }

  const renderNavigation = () => {
    return (
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item, index) => (
          <div key={index} className="relative group">
            {item.children ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {item.children.map((child, childIndex) => (
                    <DropdownMenuItem key={childIndex} asChild>
                      <a href={child.href} className="flex flex-col items-start">
                        <span className="font-medium">{child.title}</span>
                        {child.description && (
                          <span className="text-xs text-muted-foreground">
                            {child.description}
                          </span>
                        )}
                        {child.badge && (
                          <Badge variant="outline" className="mt-1">
                            {child.badge}
                          </Badge>
                        )}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
              >
                <span>{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </a>
            )}
          </div>
        ))}
      </nav>
    )
  }

  const renderSearch = () => {
    if (!config.search.enabled) return null
    return (
      <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t(config.search.placeholder)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
      </form>
    )
  }

  const renderLanguage = () => {
    if (!config.language.enabled) return null
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="hidden md:flex">
            {config.language.showName && (
              <span className="text-sm font-medium">{currentLocale.toUpperCase()}</span>
            )}
            <ChevronDown className="ml-1 h-3 w-3" />
            <span className="sr-only">Select language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('common.selectLanguage')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableLocales.map((locale) => (
            <DropdownMenuItem
              key={locale}
              onClick={() => onLocaleChange?.(locale)}
              className={locale === currentLocale ? 'bg-accent' : ''}
            >
              <span className="text-sm">
                {locale === 'en' ? 'English' : 
                 locale === 'ru' ? 'Русский' :
                 locale === 'es' ? 'Español' :
                 locale === 'fr' ? 'Français' :
                 locale === 'de' ? 'Deutsch' : locale.toUpperCase()}
              </span>
              {locale === currentLocale && (
                <span className="ml-2 text-xs text-muted-foreground">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const renderTheme = () => {
    if (!config.theme.enabled) return null
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="hidden md:flex"
      >
        {currentSystem === 'lora' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const renderNotifications = () => {
    if (!config.notifications.enabled) return null
    return (
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-4 w-4" />
        {config.notifications.count > 0 && (
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
            {config.notifications.count}
          </Badge>
        )}
        <span className="sr-only">View notifications</span>
      </Button>
    )
  }

  const renderUserMenu = () => {
    if (!config.userMenu.enabled) return null
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">User Name</p>
              <p className="text-xs leading-none text-muted-foreground">
                user@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const renderElement = (element: string) => {
    switch (element) {
      case 'logo':
        return renderLogo()
      case 'mobileMenu':
        return renderMobileMenu()
      case 'navigation':
        return renderNavigation()
      case 'search':
        return renderSearch()
      case 'language':
        return renderLanguage()
      case 'theme':
        return renderTheme()
      case 'notifications':
        return renderNotifications()
      case 'userMenu':
        return renderUserMenu()
      default:
        return null
    }
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div 
        className="mx-auto px-4"
        style={{ 
          maxWidth: globalConfig?.maxWidth || '1480px'
        }}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {config.layout.left.map((element, index) => (
              <div key={index}>
                {renderElement(element)}
              </div>
            ))}
          </div>

          {/* Center */}
          <div className="flex items-center">
            {config.layout.center.map((element, index) => (
              <div key={index}>
                {renderElement(element)}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {config.layout.right.map((element, index) => (
              <div key={index}>
                {renderElement(element)}
              </div>
            ))}
            {/* Custom Actions */}
            {actions}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.title}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <a
                          key={childIndex}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground"
                        >
                          {child.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

                         {/* Mobile Search */}
             {config.search.enabled && (
               <form onSubmit={handleSearch} className="mt-4 px-3">
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                   <Input
                     type="search"
                     placeholder={t(config.search.placeholder)}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-10"
                   />
                 </div>
               </form>
             )}

             {/* Mobile Actions */}
             <div className="mt-4 px-3 space-y-2">
               {config.theme.enabled && (
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
               {config.userMenu.enabled && (
                 <Button variant="ghost" size="sm" className="w-full justify-start">
                   <User className="mr-2 h-4 w-4" />
                   Profile
                 </Button>
               )}
             </div>
          </div>
        )}
      </div>
    </header>
  )
}
