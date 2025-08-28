export interface NavigationItem {
  title: string
  href: string
  file: string
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export interface DocsNavigation {
  sections: NavigationSection[]
}

/**
 * Default navigation structure
 */
export const defaultDocsNavigation: DocsNavigation = {
  sections: [
    {
      title: "DOCUMENTATION",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
          file: "introduction.mdx"
        },
        {
          title: "Installation Guide",
          href: "/docs/installation", 
          file: "installation.mdx"
        },
        {
          title: "System Architecture",
          href: "/docs/architecture",
          file: "architecture.mdx"
        }
      ]
    },
    {
      title: "GETTING STARTED",
      items: [
        {
          title: "Quick Start Guide",
          href: "/docs/getting-started/quick-start",
          file: "getting-started/quick-start.mdx"
        },
        {
          title: "First Steps",
          href: "/docs/getting-started/first-steps", 
          file: "getting-started/first-steps.mdx"
        }
      ]
    },
    {
      title: "ADVANCED TOPICS",
      items: [
        {
          title: "Customization Guide",
          href: "/docs/advanced/customization",
          file: "advanced/customization.mdx"
        },
        {
          title: "Performance Optimization",
          href: "/docs/advanced/performance",
          file: "advanced/performance.mdx"
        }
      ]
    }
  ]
}

/**
 * Load documentation navigation configuration from API
 */
export async function getDocsNavigation(): Promise<DocsNavigation> {
  try {
    const response = await fetch('/api/docs-navigation')
    if (response.ok) {
      return await response.json()
    }
    throw new Error('Failed to fetch navigation')
  } catch (error) {
    console.error('Failed to load docs navigation config:', error)
    return defaultDocsNavigation
  }
}

/**
 * Convert navigation config to DocsLayout format
 */
export function docsNavigationToLayout(navigation: DocsNavigation) {
  return navigation.sections.map(section => ({
    title: section.title,
    href: section.title.toLowerCase().replace(/\s+/g, '-'),
    children: section.items.map(item => ({
      title: item.title,
      href: item.href
    }))
  }))
}

/**
 * Get all navigation items as flat array
 */
export function getAllNavigationItems(navigation: DocsNavigation): NavigationItem[] {
  return navigation.sections.flatMap(section => section.items)
}

/**
 * Find navigation item by href
 */
export function findNavigationItem(navigation: DocsNavigation, href: string): NavigationItem | undefined {
  return getAllNavigationItems(navigation).find(item => item.href === href)
}
