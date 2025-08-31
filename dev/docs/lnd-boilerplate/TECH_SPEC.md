# **Unified Technical Specification: The lnd-boilerplate Platform**

### Table of Contents
1.  [Philosophy and Architectural Principles](#1-philosophy-and-architectural-principles)
2.  [Technology Stack](#2-technology-stack)
3.  [Project Structure](#3-project-structure-target-refactored-state)
4.  [The Layout Engine: Configuration-Driven UI](#4-the-layout-engine-configuration-driven-ui)
5.  [The UI Library (`packages/ui`)](#5-the-ui-library-packagesui)
6.  [Core Systems](#6-core-systems)
7.  [Implementation Example](#7-implementation-example-rendering-a-blog-post-page)
8.  [Development Tooling & Documentation](#8-development-tooling--documentation)
9.  [Core Features & Integrations](#9-core-features--integrations)
10. [Installed Packages](#10-installed-packages)
11. [Usage Examples](#11-usage-examples)
12. [Available CLI Commands](#12-available-cli-commands)
13. [UI Component Library (shadcn/ui)](#13-ui-component-library-shadcnui)
14. [Configuration Details](#14-configuration-details)

---

### 1. Philosophy and Architectural Principles

The platform is built on a set of core principles that guide every technical decision, ensuring scalability, maintainability, and a superior developer experience.

1.  **Monorepo (Turborepo):** The entire codebase resides in a single repository. Logic is segregated into reusable `packages` (`ui`, `utils`) and consumer `apps` (`landing`), simplifying dependency management and code sharing.
2.  **Configuration over Code:** The structure, layout, and component composition of most pages are defined declaratively in a central `site.config.json` file. This allows for rapid changes to page layouts without modifying rendering logic.
3.  **Three-Tier Component Model:**
    *   **Tier 1: Primitives:** Atomic, unstyled, or minimally styled elements from `shadcn/ui` (e.g., `Button`, `Card`, `Input`).
    *   **Tier 2: Components (Compositions):** Assembled from primitives to solve specific business tasks (e.g., `PricingTable`, `Header`, `BlogCard`).
    *   **Tier 3: Templates (Layouts):** High-level page skeletons that define the primary content areas.
4.  **Headless-First & Content-Driven:** All content is managed outside the rendering logic, primarily as local MDX and JSON files within the `_content` directory.
5.  **Static-First & Edge-Ready:** Prioritizes SSG and ISR via Next.js for maximum performance and SEO.
6.  **Performance by Default:** Aims for a Lighthouse score of 95+ through image optimization, efficient font loading, and minimal client-side JS.

### 2. Technology Stack

| Category | Technology | Purpose & Rationale |
| :--- | :--- | :--- |
| **Environment** | Bun, TypeScript | High-performance runtime, build tooling, and strong typing for code reliability. |
| **Framework** | Next.js (App Router) | Hybrid rendering (SSG/ISR/SSR), file-based routing, and built-in optimizations. |
| **Styling** | Tailwind CSS, shadcn/ui | Utility-first CSS for rapid development; a library of accessible UI primitives. |
| **Content** | MDX, gray-matter | File-based content management, allowing developers to write JSX within Markdown. |
| **i18n** | `next-intl` | Robust internationalization, including locale-based routing and dictionary management. |
| **State (Client)** | Zustand, React Context | Minimal global state management and simple UI state propagation. |
| **SEO** | `next-sitemap` | Automated generation of `sitemap.xml` and `robots.txt` during the build process. |

### 3. Project Structure (Target Refactored State)

The project follows a clean, organized monorepo structure.

```bash
/lnd-boilerplate/
├── apps/
│   └── landing/
│       ├── app/
│       │   └── [locale]/         # UNIFIED routing logic for all languages
│       │       ├── about/
│       │       │   └── page.tsx
│       │       ├── blog/
│       │       │   ├── [slug]/
│       │       │   │   └── page.tsx
│       │       │   └── page.tsx
│       │       └── page.tsx      # Home page for a given locale
│       ├── _content/             # ALL localized content lives here
│       │   ├── blog/
│       │   │   ├── post-one.en.mdx
│       │   │   └── post-one.ru.mdx
│       │   └── pages/
│       │       ├── about.en.json
│       │       └── about.ru.json
│       ├── public/
│       └── site.config.json      # Central configuration for the landing app
│
├── dev/
│   └── docs/
│       └── boilerplate/          # CENTRALIZED project documentation
│           ├── README.md
│           ├── ARCHITECTURE.md
│           └── ...
│
├── packages/
│   ├── ui/                       # The UI Design System Library
│   │   └── src/
│   │       ├── primitives/       # Tier 1: Atoms (e.g., button.tsx)
│   │       ├── components/       # Tier 2: Compositions (Domain-driven)
│   │       │   ├── common/       # (Header.tsx, Footer.tsx)
│   │       │   ├── blog/         # (BlogCard.tsx)
│   │       │   └── docs/         # (DocsSidebar.tsx)
│   │       └── templates/        # Tier 3: Page Layouts
│   │           └── SingleColumnLayout.tsx
│   │
│   └── utils/                    # Shared helper functions
│       └── src/
│           ├── content/
│           │   └── readers.ts    # Logic for reading localized content with fallbacks
│           └── ...
│
├── scripts/                      # Simple, root-level utility scripts
└── package.json                  # Root package.json with workspace commands
```

### 4. The Layout Engine: Configuration-Driven UI

The core of the platform's flexibility is its Layout Engine, which renders pages based on the central `site.config.json` file.

#### 4.1. `site.config.json`

This file defines page types, mapping them to templates and components.

```json
{
  "pageTypes": {
    "blogPost": {
      "template": "SidebarLeftLayout",
      "components": {
        "header": "MainHeader",
        "leftSidebar": "BlogCategories",
        "content": "PostBody",
        "footer": "MainFooter"
      },
      "contentType": "mdx"
    },
    "landingPage": {
      "template": "SingleColumnLayout",
      "components": {
        "header": "MinimalHeader",
        "content": "PageBuilder",
        "footer": "MainFooter"
      },
      "contentType": "json"
    }
  }
}
```

*   `template`: The name of the Layout Template component from `packages/ui/templates`.
*   `components`: Maps template slots (e.g., `header`, `leftSidebar`) to specific Component Compositions from `packages/ui/components`.
*   `contentType`: Specifies the source of the main content (`mdx` or `json`).

#### 4.2. Templates (Layouts) - `packages/ui/templates`

These are high-level components responsible only for the page's structural layout and responsive grid behavior.

*   **`SingleColumnLayout.tsx`**: A linear layout: Header, Content, Footer. Stacks vertically on all screens.
*   **`SidebarLeftLayout.tsx`**: Two-column grid: Left Sidebar, Content. On screens `< 1024px`, the sidebar stacks above the content.
*   **`SidebarRightLayout.tsx`**: Two-column grid: Content, Right Sidebar. On screens `< 1024px`, the sidebar stacks below the content.
*   **`SidebarBothLayout.tsx`**: Three-column grid: Left Sidebar, Content, Right Sidebar. Features configurable responsive behaviors (e.g., hide right sidebar at `< 1280px`, stack all at `< 1024px`).

### 5. The UI Library (`packages/ui`)

This package is the single source of truth for all UI elements, organized into the three-tier model.

#### 5.1. Tier 1: Primitives - `packages/ui/primitives`

Direct exports or lightly wrapped components from `shadcn/ui`. They are the unstyled, functional atoms of the design system (e.g., `button.tsx`, `card.tsx`, `dialog.tsx`).

#### 5.2. Tier 2: Components (Compositions) - `packages/ui/components`

These components are grouped by business domain/feature for clarity.

*   **`common/`**: Components used across the entire site.
    *   `Header.tsx`: Site header with logo, navigation, and controls. Supports `sticky` and `auto-hide` behaviors. Triggers `OffcanvasMenu` on mobile.
    *   `Footer.tsx`: Site footer with link columns, social media, and copyright.
    *   `ThemeToggle.tsx`: Client-side light/dark mode switcher.
    *   `LanguageSwitcher.tsx`: Dropdown for changing locales.
*   **`blog/`**: Components specific to the blog.
    *   `BlogCard.tsx`: A card for displaying a single blog post preview.
    *   `BlogCategories.tsx`: A sidebar component listing all post categories.
    *   `PreviousNext.tsx`: Navigation block at the end of a post.
*   **`docs/`**: Components specific to documentation pages.
    *   `DocsSidebar.tsx`: Hierarchical navigation sidebar, generated from a JSON or MDX meta file.
    *   `TableOfContents.tsx`: A sticky sidebar that autogenerates links from `h2`/`h3` headings in the main content.
*   **`marketing/`**: Reusable sections for building landing pages.
    *   `Hero.tsx`: Large, above-the-fold section with a title, subtitle, CTA, and image.
    *   `FeatureGrid.tsx`: A grid showcasing product features with icons and text.
    *   `PricingTable.tsx`: A responsive table comparing different pricing plans.

### 6. Core Systems

#### 6.1. Content Engine & Internationalization (i18n)

This system provides a unified way to handle localized content.

*   **Unified Routing:** All pages are rendered through the dynamic `app/[locale]` route. The `middleware.ts` handles locale detection and URL prefixing.
*   **Localized Content Sourcing:** The `packages/utils/content/readers.ts` module contains functions like `readLocalizedMdx` and `readLocalizedJson`.
*   **Fallback Logic:** These reader functions implement a critical fallback mechanism:
    1.  They first attempt to load the content file for the requested locale (e.g., `post.ru.mdx`).
    2.  If the file is not found, they attempt to load the content file for the default locale (e.g., `post.en.mdx`).
    3.  If no file is found, an error is thrown.
*   **UI Strings:** Non-content strings (e.g., button labels) are managed in `.json` files in `public/locales` and loaded via `next-intl`.

#### 6.2. SEO & Metadata

*   **`<Seo />` Component:** A dedicated component that takes `title`, `description`, `imageUrl`, etc., and generates all necessary tags (`<title>`, `<meta>`, Open Graph, Twitter Cards).
*   **Automated Files:** `next-sitemap` is configured to generate `sitemap.xml` and `robots.txt` automatically at build time, based on the file structure.

### 7. Implementation Example: Rendering a Blog Post Page

This example demonstrates how all systems work in concert.

1.  **Request:** A user navigates to `/ru/blog/my-first-post`.
2.  **Routing:** Next.js matches this to `app/[locale]/blog/[slug]/page.tsx` with `locale: 'ru'` and `slug: 'my-first-post'`.
3.  **Configuration:** The `page.tsx` component identifies the page type as `blogPost` and loads its configuration from `site.config.json`.
    *   `template`: "SidebarLeftLayout"
    *   `components`: `MainHeader`, `BlogCategories`, etc.
    *   `contentType`: "mdx"
4.  **Content Fetching:** The page calls `readLocalizedMdx('blog', 'my-first-post', 'ru')`.
    *   The function looks for `_content/blog/my-first-post.ru.mdx`. Let's assume it exists and returns its content.
5.  **Rendering:**
    *   The `SidebarLeftLayout` template is rendered.
    *   The component registry maps the string names (`MainHeader`) to their actual component implementations.
    *   The fetched MDX content is passed to the `PostBody` component, which is placed in the `content` slot of the layout.
    *   The `BlogCategories` component is rendered in the `leftSidebar` slot.

### 8. Development Tooling & Documentation

*   **`dev/` Package:** This directory is a dedicated space for internal project tooling, including complex scripts, validation logic, and code generation. It is not required for standard application development.
*   **`dev/docs/boilerplate/`:** This is the **centralized home for all project documentation**. It contains this specification, architectural diagrams, setup guides, and coding conventions. The root `README.md` provides only a quick start guide and a prominent link to this directory.

### 9. Core Features & Integrations

This boilerplate comes with a professional-grade stack, pre-configured for immediate use.

#### 🎨 **UI & Styling**
- **Next.js 14:** The React Framework, featuring the App Router.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **shadcn/ui:** A component library built on Radix UI for accessibility and customizability.
- **next-themes:** Seamless theme management (light/dark modes).
- **lucide-react:** A comprehensive and beautiful icon library.
- **clsx + tailwind-merge:** Utilities for intelligently merging CSS classes.

#### 🔤 **Fonts & Typography**
- **next/font:** Optimized, self-hosted Google Fonts for performance.
- **Inter:** The primary sans-serif font (`--font-sans`).
- **Inter Tight:** The primary display font for headings (`--font-heading`).

#### 🎯 **State Management**
- **Zustand:** A lightweight, powerful state manager for React.
- **Persist Middleware:** Built-in middleware for saving state to `localStorage`.

#### 📝 **Forms & Validation**
- **React Hook Form:** Performant and flexible form state management.
- **@hookform/resolvers:** Integrations for schema validation libraries.
- **Zod:** TypeScript-first schema declaration and validation.

#### 🛠 **Code Quality**
- **TypeScript:** End-to-end static typing.
- **ESLint:** Enforces consistent code style and catches common errors.
- **Prettier:** An opinionated code formatter for a unified codebase.
- **Official Next.js ESLint config:** A recommended, pre-configured ruleset.

#### 🔍 **SEO & Metadata**
- **Next.js Metadata API:** Built-in support for generating static and dynamic metadata.
- **`next-intl`:** Handles internationalized routing and content for global SEO.
- **Open Graph Protocol:** Structured metadata for rich social media sharing.

### 10. Installed Packages

#### Landing App (`apps/landing/package.json`)
```json
{
  "dependencies": {
    "@lnd/ui": "workspace:*",
    "@lnd/utils": "workspace:*",
    "next": "^14.0.0",
    "next-themes": "^0.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.52.1",
    "@hookform/resolvers": "^3.9.0",
    "zustand": "^4.5.4",
    "tailwindcss": "^3.4.6",
    "lucide-react": "^0.408.0"
  },
  "devDependencies": {
    "typescript": "^5.5.3",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.5",
    "prettier": "^3.3.3"
  }
}
```

#### UI Package (`packages/ui/package.json`)
```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "zod": "^3.23.8",
    "lucide-react": "^0.408.0"
  }
}
```

### 11. Usage Examples

#### 1. **Forms with React Hook Form + Zod**
```tsx
// components/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <textarea {...register('message')} />
      {errors.message && <span>{errors.message.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### 2. **State Management with Zustand**
```tsx
// stores/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  user: { name: string } | null;
  setUser: (user: { name: string } | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: 'app-storage' }
  )
);
```

#### 3. **Theming with `next-themes`**
```tsx
// components/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
```

### 12. Available CLI Commands
```bash
# Development
bun run dev          # Start the development server
bun run build        # Build the application for production
bun run start        # Start the production server

# Code Quality
bun run lint         # Run ESLint checks
bun run format       # Format code with Prettier
bun run format:check # Check for formatting issues
```

### 13. UI Component Library (shadcn/ui)

The following components are available for use from `@lnd/ui/primitives` or `@lnd/ui/components`:

- `Button`
- `Input`
- `Textarea`
- `Card`
- `Badge`
- `Avatar`
- `DropdownMenu`
- `Tabs`
- `Accordion`
- `Tooltip`
- `Skeleton`
- `Sheet`
- `Sidebar`
- `Form` (Higher-order component)
- `SearchModal`
- `LanguageSelector`
- `ImageGallery`

### 14. Configuration Details

#### Tailwind CSS (`tailwind.config.js`)
- Pre-configured colors, fonts, and theme settings.
- Dark mode support is enabled via the `class` strategy.
- Includes custom utilities for enhanced styling capabilities.

#### ESLint (`.eslintrc.json`)
- Extends the official `eslint-config-next` ruleset.
- Configured with TypeScript and React plugins.
- Enforces best practices for code quality and consistency.

#### Prettier (`.prettierrc`)
- Defines a single, unified code style for the entire project.
- Integrated into the `format` script for automatic code formatting.

---

✅ **This project is fully equipped with a professional stack.** It is production-ready for building any modern web application. 🚀