// Configuration types for design systems and layouts

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
}

export interface AnimationConfig {
  duration: string
  easing: string
  transitions: string[]
}

export interface DesignSystem {
  name: string
  description: string
  colors: ColorPalette
  animations: AnimationConfig
}

export interface DesignSystemsConfig {
  default: string
  available: string[]
  [key: string]: DesignSystem | string | string[]
}

export interface GlobalConfig {
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

export interface LayoutTemplate {
  name: string
  description: string
  structure: string[]
}

export interface LayoutsConfig {
  default: string
  available: string[]
  breakpoints: {
    mobile: string
    tablet: string
    desktop: string
  }
  templates: {
    [key: string]: LayoutTemplate
  }
}

export interface ComponentConfig {
  header: string
  leftSidebar?: string
  rightSidebar?: string
  content: string
  footer: string
}

export interface BehaviorConfig {
  rightSidebar?: {
    hideAt: string
  }
  leftSidebar?: {
    defaultStateMobile: 'hidden' | 'visible'
  }
}

export interface PageType {
  template: string
  components: ComponentConfig
  behavior?: BehaviorConfig
  contentType: 'mdx' | 'tsx' | 'tsx+json'
}

export interface PageTypesConfig {
  [key: string]: PageType
}

export interface SiteConfig {
  global: GlobalConfig
  designSystems: DesignSystemsConfig
  layouts: LayoutsConfig
  pageTypes: PageTypesConfig
}

// Utility types
export type DesignSystemName = 'lora' | 'alisa'
export type LayoutName = 'single-column' | 'sidebar-left' | 'sidebar-right' | 'sidebar-both'
export type PageTypeName = 'documentation' | 'blogPost' | 'landingPage'

// Re-export design system types
export type { DesignSystemName } from './design-systems'
