import { ReactNode } from 'react'

export interface NavigationItem {
  title: string
  href: string
  description?: string
  badge?: string
  icon?: ReactNode
  excerpt?: string
  image?: string
  children?: NavigationItem[]
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export interface NavigationConfig {
  sections: NavigationSection[]
}

export interface BreadcrumbItem {
  title: string
  href?: string
  icon?: ReactNode
}

export interface TableOfContentsItem {
  title: string
  href: string
  level: number
  badge?: string
  icon?: ReactNode
  children?: TableOfContentsItem[]
}
