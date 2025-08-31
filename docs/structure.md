# Project Structure

## Configuration Files (Root Level)
- **`package.json`** - Dependencies & scripts
- **`tsconfig.json`** - TypeScript configuration
- **`bun.lockb`** - Bun lock file
- **`.gitignore`** - Git ignore rules
- **`README.md`** - Project documentation
- **`Makefile`** - Build and development commands

## Source Code Structure
- **`packages/`** - Monorepo packages
  - **`ui/`** - UI components package
    - **`src/components/`** - React components
      - **`ui/`** - UI primitives
        - **`LanguageSwitcher.tsx`** - Language switcher dropdown component
        - **`ThemeToggle.tsx`** - Theme toggle component
      - **`layout/`** - Layout components
        - **`Navigation.tsx`** - Navigation bar with language switcher
    - **`src/hooks/`** - Custom React hooks
      - **`useCurrentPath.ts`** - Hook to get current pathname
    - **`src/utils/`** - UI utilities
      - **`siteConfig.ts`** - Site configuration utilities
    - **`src/primitives/`** - Basic UI primitives
    - **`src/utils/`** - UI utilities
  - **`utils/`** - Utilities package
    - **`src/content/`** - Content processing utilities
    - **`src/config/`** - Configuration utilities
    - **`src/formatters/`** - Data formatting utilities
    - **`src/search/`** - Search functionality
    - **`src/seo/`** - SEO utilities
- **`apps/`** - Applications
  - **`landing/`** - Landing page application
    - **`app/`** - Next.js App Router
      - **`page.tsx`** - Root page (redirects to default locale)
      - **`layout.tsx`** - Root layout with ThemeProvider
      - **`ru/`** - Russian pages
        - **`page.tsx`** - Russian homepage with navigation
        - **`docs/page.tsx`** - Documentation page with navigation
        - **`about/page.tsx`** - About page with navigation
      - **`en/`** - English pages
        - **`page.tsx`** - English homepage with navigation
        - **`docs/page.tsx`** - Documentation page with navigation
        - **`about/page.tsx`** - About page with navigation
      - **`es/`** - Spanish pages
        - **`page.tsx`** - Spanish homepage with navigation
        - **`docs/page.tsx`** - Documentation page with navigation
        - **`about/page.tsx`** - About page with navigation
      - **`fr/`** - French pages
        - **`page.tsx`** - French homepage with navigation
        - **`docs/page.tsx`** - Documentation page with navigation
        - **`about/page.tsx`** - About page with navigation
      - **`de/`** - German pages
        - **`page.tsx`** - German homepage with navigation
        - **`docs/page.tsx`** - Documentation page with navigation
        - **`about/page.tsx`** - About page with navigation
      - **`[locale]/`** - Localized routes (legacy)
        - **`page.tsx`** - Homepage
        - **`layout.tsx`** - Locale layout with NextIntlClientProvider
        - **`default.tsx`** - Default component for locale parallel routes
        - **`docs/`** - Documentation pages
          - **`page.tsx`** - Docs index
          - **`default.tsx`** - Default component for docs parallel routes
          - **`[...slug]/`** - Dynamic docs routes
          - **`introduction/`** - Introduction page
        - **`test/`** - Test page
        - **`about/`** - About page
        - **`experts/`** - Experts page
        - **`legal/`** - Legal pages
        - **`blog/`** - Blog pages
        - **`gallery/`** - Gallery pages
        - **`contact/`** - Contact page
      - **`api/`** - API routes
      - **`not-found.tsx`** - 404 page
      - **`error.tsx`** - Error page
      - **`global-error.tsx`** - Global error page
    - **`middleware.ts`** - Next.js middleware for locale handling
    - **`next.config.js`** - Next.js configuration
    - **`i18n.ts`** - Internationalization configuration
    - **`site.config.json`** - Site configuration with default locale
- **`dev/`** - Development tools
  - **`src/`** - Source code
  - **`tests/`** - Test files

## Documentation
- **`docs/`** - Documentation files
- **`docs/structure.md`** - This file

## Build and Deployment
- **`dist/`** - Build output (generated)
- **`node_modules/`** - Dependencies (generated)

## Key Features
- **Multi-language Support**: Pages available in Russian, English, Spanish, French, and German
- **Smart Language Switcher**: Preserves current page when switching languages
- **Default Locale Handling**: Main language (Russian) displayed without prefix
- **Consistent Navigation**: Navigation bar present on all pages across all languages
- **Simple Routing**: Basic Next.js routing without complex internationalization
- **Theme Management**: next-themes for light/dark mode
- **Content Management**: MDX content with frontmatter processing
- **SEO**: Built-in SEO utilities and metadata generation
- **Search**: Content search functionality
- **TypeScript**: Full TypeScript support
- **Monorepo**: Organized with packages and apps

## Working Pages
- **`/`** - Redirects to `/ru` (default locale)
- **`/ru`** - Russian homepage (default locale, no prefix)
- **`/ru/docs`** - Russian documentation page
- **`/ru/about`** - Russian about page
- **`/en`** - English homepage (with prefix)
- **`/en/docs`** - English documentation page
- **`/en/about`** - English about page
- **`/es`** - Spanish homepage (with prefix)
- **`/es/docs`** - Spanish documentation page
- **`/es/about`** - Spanish about page
- **`/fr`** - French homepage (with prefix)
- **`/fr/docs`** - French documentation page
- **`/fr/about`** - French about page
- **`/de`** - German homepage (with prefix)
- **`/de/docs`** - German documentation page
- **`/de/about`** - German about page

## Language Switching
Users can switch between languages using the language switcher in the navigation bar:
- **🇷🇺 Русский** - Russian (default, no prefix)
- **🇺🇸 English** - English (with prefix)
- **🇪🇸 Español** - Spanish (with prefix)
- **🇫🇷 Français** - French (with prefix)
- **🇩🇪 Deutsch** - German (with prefix)

### Smart Path Preservation
The language switcher intelligently preserves the current page path:
- **From `/ru/docs`** → **To `/en/docs`** (same page, different language)
- **From `/fr/about`** → **To `/de/about`** (same page, different language)
- **From `/es`** → **To `/ru`** (homepage to homepage, default locale)

### Default Locale Behavior
- **Default locale (Russian)**: URLs without prefix (`/`, `/docs`, `/about`)
- **Other locales**: URLs with prefix (`/en`, `/en/docs`, `/en/about`)
- **Navigation links**: Automatically adjust based on current language
- **Language switcher**: Generates appropriate URLs for each language

## Navigation Features
- **Consistent Header**: All pages have the same navigation bar
- **Language-Aware Links**: Navigation links automatically use the correct language
- **Logo Navigation**: Logo links to the homepage in the current language
- **Responsive Design**: Navigation adapts to different screen sizes
- **Accessibility**: Proper focus states and keyboard navigation
- **Path Preservation**: Language switching maintains the current page context
- **Default Locale Support**: Main language URLs without prefix

## Technical Implementation
- **`useCurrentPath` Hook**: Automatically detects the current URL path
- **`siteConfig` Utilities**: Read default locale from site configuration
- **Dynamic URL Generation**: Creates language-specific URLs while preserving page structure
- **Middleware**: Handles locale detection and redirects
- **Client-side Navigation**: Uses Next.js Link for fast, seamless transitions
- **TypeScript Support**: Full type safety for all components

## Configuration
The default locale is configured in `site.config.json`:
```json
{
  "features": {
    "i18n": {
      "enabled": true,
      "defaultLocale": "ru",
      "locales": ["ru", "en"]
    }
  }
}
```

Last Updated: 2025-01-20
Version: 0.2.0
