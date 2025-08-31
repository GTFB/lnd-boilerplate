# Project Structure

This document details the structure of the monorepo, explaining the purpose of each key directory.

```
lnd-boilerplate/
├── apps/
│   └── landing/                   # Main Next.js application
│       ├── app/                   # App Router (Next.js 13+)
│       │   ├── [locale]/          # Dynamic localization routes
│       │   │   ├── about/
│       │   │   ├── blog/
│       │   │   │   └── [slug]/
│       │   │   ├── contact/
│       │   │   ├── docs/
│       │   │   │   ├── introduction/
│       │   │   │   ├── search-results/
│       │   │   │   └── [...slug]/
│       │   │   ├── experts/
│       │   │   │   └── [id]/
│       │   │   ├── gallery/
│       │   │   ├── legal/
│       │   │   │   └── [slug]/
│       │   │   └── test/
│       │   └── api/               # API routes
│       │       ├── blog/
│       │       │   └── [...slug]/
│       │       ├── docs-navigation/
│       │       ├── search-documents/
│       │       └── site-config/
│       ├── _content/              # Localized content
│       │   ├── blog/
│       │   ├── docs/
│       │   │   ├── advanced/
│       │   │   └── getting-started/
│       │   ├── experts/
│       │   ├── legal/
│       │   └── pages/
│       ├── components/            # Local components
│       ├── config/                # Application configuration
│       ├── public/                # Static files
│       │   ├── images/
│       │   └── locales/
│       ├── stores/                # Application state
│       └── styles/                # Styles
├── dev/                           # Development tools
│   ├── build/                     # Build output
│   ├── docs/                      # Documentation
│   │   ├── api/                   # API documentation
│   │   ├── boilerplate/           # Boilerplate documentation
│   │   └── lnd-boilerplate/       # Specific documentation
│   ├── scripts/                   # Development scripts
│   ├── src/                       # Source code for tools
│   │   ├── config/                # Configuration
│   │   ├── core/                  # Core logic
│   │   ├── middleware/            # Middleware
│   │   ├── scripts/               # Scripts
│   │   ├── services/              # Services
│   │   └── utils/                 # Utilities
│   └── tests/                     # Tests
├── packages/                      # Monorepo packages
│   ├── ui/                        # UI components
│   │   └── src/
│   │       ├── components/        # Legacy components
│   │       │   ├── content/
│   │       │   ├── docs/
│   │       │   ├── ecommerce/
│   │       │   ├── footer/
│   │       │   ├── header/
│   │       │   ├── layout/
│   │       │   ├── marketing/
│   │       │   ├── mdx/
│   │       │   ├── navigation/
│   │       │   ├── sidebar/
│   │       │   └── ui/
│   │       │       └── icons/
│   │       ├── components-new/    # New component structure
│   │       │   ├── blog/          # Blog-specific components
│   │       │   ├── common/        # Common components
│   │       │   ├── docs/          # Documentation components
│   │       │   └── marketing/     # Marketing components
│   │       ├── config/            # UI configuration
│   │       ├── contexts/          # React contexts
│   │       ├── design-systems/    # Design systems
│   │       │   ├── alisa/
│   │       │   ├── base/
│   │       │   └── lora/
│   │       ├── examples/          # Usage examples
│   │       ├── hooks/             # React hooks
│   │       ├── lib/               # Libraries
│   │       ├── primitives/        # Primitive components
│   │       ├── providers/         # Providers
│   │       ├── styles/            # Styles
│   │       ├── templates/         # Templates
│   │       ├── types/             # TypeScript types
│   │       └── utils/             # Utilities
│   └── utils/                     # Common utilities
│       └── src/
│           ├── config/            # Configuration
│           ├── content/           # Content handling
│           ├── formatters/        # Formatters
│           ├── images/            # Image processing
│           ├── search/            # Search functionality
│           └── seo/               # SEO utilities
│       └── tests/                 # Tests
└── scripts/                       # Root scripts
```

### `apps/`
This directory contains the consumer applications. Each folder is a standalone app that imports logic from the `packages/` directory.

- **`landing/`**: The main Next.js web application.
    - **`app/[locale]/`**: The heart of the Next.js App Router. All pages and routes are defined here within a dynamic locale segment.
    - **`_content/`**: The "database" for the application. All localized content, such as MDX for blog posts and JSON for page data, is stored here.
    - **`site.config.json`**: The central configuration file for the landing app, controlling features like i18n and the layout engine.

### `packages/`
This directory contains shared code, intended to be reused across different applications in the monorepo.

- **`ui/`**: The shared UI component library (Design System).
    - **`primitives/`**: Atomic, unstyled components from shadcn/ui.
    - **`components/`**: Composable components built from primitives, organized by domain (`blog`, `common`, etc.).
    - **`templates/`**: High-level page layouts.
- **`utils/`**: Shared, framework-agnostic utility functions.
    - **`content/`**: Helpers for reading and parsing localized content files.
    - **`seo/`**: Utilities for generating metadata.
    - **`formatters/`**: Functions for formatting data like dates and numbers.

### `dev/`
This directory is the home for all internal development tooling and project documentation. It is not part of the production application bundle.

- **`docs/`**: The central location for all project documentation (the files you are reading now).
- **`scripts/`**: Complex automation scripts for tasks like code generation or database migrations.

### `scripts/`
The root-level `scripts/` directory is for simple, project-wide utility scripts, such as Git hooks setup.