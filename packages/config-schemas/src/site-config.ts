import { z } from 'zod';

// Author schema
const authorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  url: z.string().url()
});

// Site schema
const siteSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  version: z.string().regex(/^\d+\.\d+\.\d+/),
  url: z.string().url(),
  author: authorSchema,
  timezone: z.string()
});

// SEO schema
const robotsSchema = z.object({
  index: z.boolean(),
  follow: z.boolean(),
  googleBot: z.object({
    index: z.boolean(),
    follow: z.boolean(),
    maxVideoPreview: z.number(),
    maxImagePreview: z.enum(['none', 'standard', 'large']),
    maxSnippet: z.number()
  })
});

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  ogImage: z.string().nullable(),
  twitterCard: z.enum(['summary', 'summary_large_image', 'app', 'player']),
  twitterHandle: z.string(),
  robots: robotsSchema
});

// Manifest schema
const iconSchema = z.object({
  src: z.string(),
  sizes: z.string(),
  type: z.string(),
  purpose: z.enum(['any', 'maskable', 'monochrome']).optional()
});

const screenshotSchema = z.object({
  src: z.string(),
  sizes: z.string(),
  type: z.string(),
  formFactor: z.enum(['wide', 'narrow']),
  label: z.string()
});

const shortcutSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  url: z.string(),
  icons: z.array(z.object({
    src: z.string(),
    sizes: z.string()
  })).optional()
});

const manifestSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  startUrl: z.string(),
  display: z.enum(['fullscreen', 'standalone', 'minimal-ui', 'browser']),
  backgroundColor: z.string(),
  themeColor: z.string(),
  orientation: z.enum(['any', 'natural', 'landscape', 'landscape-primary', 'landscape-secondary', 'portrait', 'portrait-primary', 'portrait-secondary']),
  scope: z.string(),
  lang: z.string(),
  categories: z.array(z.string()),
  icons: z.array(iconSchema),
  screenshots: z.array(screenshotSchema).optional(),
  shortcuts: z.array(shortcutSchema).optional()
});

// Features schema
const blogSchema = z.object({
  enabled: z.boolean(),
  path: z.string(),
  postsPerPage: z.number(),
  enableComments: z.boolean(),
  enableTags: z.boolean(),
  enableCategories: z.boolean(),
  lazyLoad: z.object({
    enabled: z.boolean(),
    loadNextOnScrollUp: z.boolean(),
    preloadAdjacent: z.boolean(),
    scrollThreshold: z.number()
  }).optional()
});

const searchSchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(['local', 'algolia', 'elasticsearch']),
  indexPath: z.string(),
  enableFilters: z.boolean()
});

const analyticsSchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(['google', 'plausible', 'fathom', 'mixpanel']),
  trackingId: z.string().nullable()
});

const i18nSchema = z.object({
  enabled: z.boolean(),
  defaultLocale: z.string(),
  locales: z.array(z.string())
});

const pwaSchema = z.object({
  enabled: z.boolean(),
  offlineSupport: z.boolean(),
  installPrompt: z.boolean()
});

const documentationSchema = z.object({
  enabled: z.boolean(),
  path: z.string(),
  navigation: z.object({
    enabled: z.boolean(),
    position: z.string(),
    showProgress: z.boolean(),
    showBreadcrumbs: z.boolean()
  }),
  search: z.object({
    enabled: z.boolean(),
    provider: z.string(),
    placeholder: z.string()
  }),
  layout: z.object({
    sidebar: z.boolean(),
    toc: z.boolean(),
    footer: z.boolean()
  })
});

const featuresSchema = z.object({
  blog: blogSchema,
  search: searchSchema,
  analytics: analyticsSchema,
  i18n: i18nSchema,
  pwa: pwaSchema,
  documentation: documentationSchema
});

// Design systems schema
const colorSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  background: z.string(),
  foreground: z.string(),
  muted: z.string(),
  border: z.string()
});

const animationSchema = z.object({
  duration: z.string(),
  easing: z.string(),
  transitions: z.array(z.string())
});

const designSystemSchema = z.object({
  name: z.string(),
  description: z.string(),
  colors: colorSchema,
  animations: animationSchema
});

const designSystemsSchema = z.object({
  default: z.string(),
  available: z.array(z.string()),
  lora: designSystemSchema,
  alisa: designSystemSchema
});

// Layouts schema
const layoutTemplateSchema = z.object({
  name: z.string(),
  description: z.string(),
  structure: z.array(z.string())
});

const layoutsSchema = z.object({
  default: z.string(),
  available: z.array(z.string()),
  breakpoints: z.object({
    mobile: z.string(),
    tablet: z.string(),
    desktop: z.string()
  }),
  templates: z.record(layoutTemplateSchema)
});

// Page types schema
const componentMapSchema = z.object({
  header: z.string(),
  content: z.string(),
  footer: z.string(),
  leftSidebar: z.string().optional(),
  rightSidebar: z.string().optional()
});

const behaviorSchema = z.object({
  rightSidebar: z.object({
    hideAt: z.string()
  }).optional(),
  leftSidebar: z.object({
    defaultStateMobile: z.string()
  }).optional(),
  layout: z.string().optional(),
  maxWidth: z.string().optional(),
  centered: z.boolean().optional(),
  showSidebar: z.boolean().optional(),
  showToc: z.boolean().optional()
});

const pageTypeSchema = z.object({
  template: z.string(),
  components: componentMapSchema,
  contentType: z.enum(['mdx', 'json', 'tsx', 'tsx+json']),
  behavior: behaviorSchema.optional()
});

const pageTypesSchema = z.record(pageTypeSchema);

// Build schema
const webpackSchema = z.object({
  mdx: z.object({
    enabled: z.boolean(),
    jsxImportSource: z.string()
  })
});

const buildSchema = z.object({
  framework: z.enum(['nextjs', 'vite', 'webpack', 'rollup']),
  outputDirectory: z.string(),
  installCommand: z.string(),
  buildCommand: z.string(),
  devCommand: z.string(),
  nodeVersion: z.string(),
  pageExtensions: z.array(z.string()),
  webpack: webpackSchema
});

// Deployment schema
const deploymentSchema = z.object({
  vercel: z.object({
    framework: z.string(),
    functions: z.record(z.object({
      runtime: z.string()
    })),
    rewrites: z.array(z.object({
      source: z.string(),
      destination: z.string()
    })),
    headers: z.array(z.object({
      source: z.string(),
      headers: z.array(z.object({
        key: z.string(),
        value: z.string()
      }))
    }))
  }),
  netlify: z.object({
    command: z.string(),
    publish: z.string(),
    base: z.string(),
    environment: z.record(z.string()),
    redirects: z.array(z.object({
      from: z.string(),
      to: z.string(),
      status: z.number()
    })),
    headers: z.array(z.object({
      for: z.string(),
      values: z.record(z.string())
    })),
    functions: z.object({
      directory: z.string()
    })
  })
});

// UI schema
const uiThemeSchema = z.object({
  default: z.enum(['light', 'dark', 'system']),
  darkMode: z.enum(['class', 'media']),
  colors: z.object({
    border: z.string(),
    input: z.string(),
    ring: z.string(),
    background: z.string(),
    foreground: z.string(),
    primary: z.object({
      DEFAULT: z.string(),
      foreground: z.string()
    }),
    secondary: z.object({
      DEFAULT: z.string(),
      foreground: z.string()
    }),
    destructive: z.object({
      DEFAULT: z.string(),
      foreground: z.string()
    }),
    muted: z.object({
      DEFAULT: z.string(),
      foreground: z.string()
    }),
    accent: z.object({
      DEFAULT: z.string(),
      foreground: z.string()
    }),
    popover: z.object({
      DEFAULT: z.string(),
      foreground: z.string()
    }),
    card: z.object({
      DEFAULT: z.string(),
      foreground: z.string()
    })
  }),
  borderRadius: z.object({
    lg: z.string(),
    md: z.string(),
    sm: z.string()
  }),
  animation: z.object({
    fadeIn: z.string(),
    slideUp: z.string(),
    slideDown: z.string()
  })
});

const uiSchema = z.object({
  theme: uiThemeSchema,
  content: z.array(z.string())
});

// Environment schema
const environmentSchema = z.object({
  development: z.record(z.string()),
  production: z.record(z.string()),
  staging: z.record(z.string())
});

// Dev Agent schema
const devAgentSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  workflow: z.object({
    syncInterval: z.number(),
    autoSync: z.boolean()
  }),
  branches: z.object({
    main: z.string(),
    featurePrefix: z.string(),
    releasePrefix: z.string(),
    develop: z.string()
  }),
  storage: z.object({
    database: z.object({
      path: z.string()
    }),
    config: z.object({
      path: z.string()
    }),
    logs: z.object({
      path: z.string()
    })
  }),
  github: z.object({
    repo: z.string(),
    owner: z.string()
  }),
  lastUpdated: z.string(),
  goals: z.object({
    defaultStatus: z.string(),
    idPattern: z.string()
  }),
  validation: z.object({
    strictLanguage: z.boolean(),
    autoTranslate: z.boolean()
  })
});

// Navigation schema
const navigationItemSchema = z.object({
  title: z.string(),
  href: z.string(),
  children: z.array(z.object({
    title: z.string(),
    href: z.string(),
    description: z.string().optional()
  })).optional(),
  badge: z.string().optional()
});

const navigationSchema = z.object({
  main: z.array(navigationItemSchema)
});

// Header schema
const headerLayoutSchema = z.object({
  left: z.array(z.string()),
  center: z.array(z.string()),
  right: z.array(z.string())
});

const headerLogoSchema = z.object({
  enabled: z.boolean(),
  text: z.string(),
  image: z.string().nullable(),
  href: z.string()
});

const headerMobileMenuSchema = z.object({
  enabled: z.boolean()
});

const headerSearchSchema = z.object({
  enabled: z.boolean(),
  placeholder: z.string()
});

const headerLanguageSchema = z.object({
  enabled: z.boolean(),
  showFlag: z.boolean(),
  showName: z.boolean()
});

const headerThemeSchema = z.object({
  enabled: z.boolean(),
  default: z.enum(['light', 'dark', 'system'])
});

const headerNotificationsSchema = z.object({
  enabled: z.boolean(),
  count: z.number()
});

const headerUserMenuSchema = z.object({
  enabled: z.boolean(),
  showAvatar: z.boolean(),
  showName: z.boolean()
});

const headerSchema = z.object({
  layout: headerLayoutSchema,
  logo: headerLogoSchema,
  mobileMenu: headerMobileMenuSchema,
  search: headerSearchSchema,
  language: headerLanguageSchema,
  theme: headerThemeSchema,
  notifications: headerNotificationsSchema,
  userMenu: headerUserMenuSchema
});

// Global schema
const globalSchema = z.object({
  maxWidth: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string()
});

// Main site config schema
export const siteConfigSchema = z.object({
  $schema: z.string().optional(),
  site: siteSchema,
  features: featuresSchema,
  global: globalSchema,
  navigation: navigationSchema,
  header: headerSchema,
  designSystems: designSystemsSchema,
  layouts: layoutsSchema,
  pageTypes: pageTypesSchema,
  seo: seoSchema,
  manifest: manifestSchema,
  build: buildSchema,
  deployment: deploymentSchema,
  ui: uiSchema,
  environment: environmentSchema,
  devAgent: devAgentSchema,
  lastUpdated: z.string()
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type PageType = z.infer<typeof pageTypeSchema>;
export type ComponentMap = z.infer<typeof componentMapSchema>;
