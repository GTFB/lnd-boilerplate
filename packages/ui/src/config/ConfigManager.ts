import { SiteConfig, DesignSystemName, LayoutName, PageTypeName } from '../types'

export class ConfigManager {
  private static instance: ConfigManager
  private config: SiteConfig | null = null

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  async loadConfig(): Promise<SiteConfig> {
    if (this.config) {
      return this.config
    }

    try {
      // Try to load from the actual site.config.json file
      this.config = await this.loadSiteConfig()
      return this.config
    } catch (error) {
      console.error('Failed to load site configuration, falling back to static config:', error)
      // Fallback to static configuration
      this.config = await this.loadStaticConfig()
      return this.config
    }
  }

  private async loadSiteConfig(): Promise<SiteConfig> {
    try {
      // In a real application, this would be loaded from an API endpoint
      // For now, we'll try to fetch it from the public directory or use a dynamic import
      const response = await fetch('/api/site-config')
      if (!response.ok) {
        throw new Error(`Failed to fetch site config: ${response.status}`)
      }
      const configData = await response.json()
      
      // Validate that the config has the required structure
      if (!this.validateConfigStructure(configData)) {
        throw new Error('Invalid configuration structure')
      }
      
      return configData
    } catch (error) {
      console.warn('Could not load site configuration from API:', error)
      throw error
    }
  }

  private validateConfigStructure(config: any): config is SiteConfig {
    return (
      config &&
      config.global &&
      config.designSystems &&
      config.layouts &&
      config.pageTypes &&
      typeof config.global.maxWidth === 'string' &&
      Array.isArray(config.designSystems.available) &&
      Array.isArray(config.layouts.available) &&
      typeof config.layouts.default === 'string'
    )
  }

  private async loadStaticConfig(): Promise<SiteConfig> {
    // Fallback static configuration
    return {
      global: {
        maxWidth: 'xl',
        primaryColor: '#1a365d',
        secondaryColor: '#2d3748',
        accentColor: '#3182ce'
      },
      designSystems: {
        default: 'lora',
        available: ['lora', 'alisa'],
        lora: {
          name: 'Lora',
          description: 'Elegant and sophisticated design system',
          colors: {
            primary: '#1a365d',
            secondary: '#2d3748',
            accent: '#3182ce',
            background: '#ffffff',
            foreground: '#1a202c',
            muted: '#718096',
            border: '#e2e8f0'
          },
          animations: {
            duration: '300ms',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitions: ['fade', 'slide', 'scale']
          }
        },
        alisa: {
          name: 'Alisa',
          description: 'Modern and dynamic design system',
          colors: {
            primary: '#7c3aed',
            secondary: '#4c1d95',
            accent: '#f59e0b',
            background: '#f8fafc',
            foreground: '#0f172a',
            muted: '#64748b',
            border: '#cbd5e1'
          },
          animations: {
            duration: '200ms',
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitions: ['bounce', 'pulse', 'wiggle']
          }
        }
      },
      layouts: {
        default: 'sidebar-both',
        available: ['single-column', 'sidebar-left', 'sidebar-right', 'sidebar-both'],
        breakpoints: {
          mobile: '1024px',
          tablet: '1280px',
          desktop: '1281px+'
        },
        templates: {
          'single-column': {
            name: 'Single Column',
            description: 'Simple single column layout',
            structure: ['header', 'content', 'footer']
          },
          'sidebar-left': {
            name: 'Sidebar Left',
            description: 'Layout with left sidebar',
            structure: ['header', 'left-sidebar', 'content', 'footer']
          },
          'sidebar-right': {
            name: 'Sidebar Right',
            description: 'Layout with right sidebar',
            structure: ['header', 'content', 'right-sidebar', 'footer']
          },
          'sidebar-both': {
            name: 'Sidebar Both',
            description: 'Layout with both sidebars',
            structure: ['header', 'left-sidebar', 'content', 'right-sidebar', 'footer']
          }
        }
      },
      pageTypes: {
        documentation: {
          template: 'sidebar-both',
          components: {
            header: 'mainHeader',
            leftSidebar: 'docsNavigation',
            rightSidebar: 'tableOfContents',
            content: 'mdxContent',
            footer: 'mainFooter'
          },
          behavior: {
            rightSidebar: {
              hideAt: '1280px'
            },
            leftSidebar: {
              defaultStateMobile: 'hidden'
            }
          },
          contentType: 'mdx'
        },
        blogPost: {
          template: 'sidebar-left',
          components: {
            header: 'mainHeader',
            leftSidebar: 'blogCategories',
            content: 'mdxContent',
            footer: 'mainFooter'
          },
          contentType: 'mdx'
        },
        landingPage: {
          template: 'single-column',
          components: {
            header: 'minimalHeader',
            content: 'pageBuilder',
            footer: 'mainFooter'
          },
          contentType: 'tsx+json'
        }
      }
    }
  }

  getGlobalConfig() {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.global
  }

  getDesignSystem(name: DesignSystemName) {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.designSystems[name]
  }

  getLayout(name: LayoutName) {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.layouts.templates[name]
  }

  getPageType(name: PageTypeName) {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.pageTypes[name]
  }

  getDefaultDesignSystem(): DesignSystemName {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.designSystems.default as DesignSystemName
  }

  getDefaultLayout(): LayoutName {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.layouts.default as LayoutName
  }

  getBreakpoints() {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.layouts.breakpoints
  }

  getMaxWidth() {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.global.maxWidth
  }
}
