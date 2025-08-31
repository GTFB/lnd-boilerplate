# Architecture Overview

This document describes the high-level architecture of the LND Boilerplate, including its core principles and key structural patterns.

## 1. Monorepo Structure

The project utilizes a monorepo managed by Turborepo to organize the codebase. This approach offers several advantages:
- **Shared Code:** Logic can be easily shared between applications via local `packages`.
- **Simplified Dependency Management:** A single lock file and `node_modules` at the root level.
- **Atomic Commits:** Changes across multiple packages and apps can be made in a single commit.

The main workspaces are:
- `apps/landing`: The primary Next.js web application.
- `packages/ui`: The shared UI component library.
- `packages/utils`: Shared, framework-agnostic helper functions.
- `dev/`: Internal tooling for development and automation.

## 2. The Three-Tier Component Model

The UI is built on a clear, hierarchical component model to ensure scalability and maintainability.
- **Tier 1: Primitives:** Atomic, unstyled, or minimally styled elements from `shadcn/ui` (e.g., `Button`, `Card`). These are the fundamental building blocks.
- **Tier 2: Components (Compositions):** Assembled from primitives to solve specific business tasks (e.g., `PricingTable`, `Header`, `BlogCard`).
- **Tier 3: Templates (Layouts):** High-level page skeletons that define the primary content areas (e.g., `SidebarLeftLayout`).

## 3. Page Rendering Strategies: Content-Driven vs. Application-Driven

To optimize for different use cases, the boilerplate distinguishes between two primary page types. This dual architecture allows us to choose the best rendering strategy for each page.

### 3.1. Content-Driven Pages

*   **Purpose**: Designed for static content where performance, SEO, and fast load times are paramount.
*   **Use Cases**: Blog posts, documentation, marketing pages, legal documents.
*   **Characteristics**:
    *   Minimal client-side JavaScript.
    *   Primarily rendered on the server (SSG/ISR).
    *   Content-first approach, often sourced from MDX files.
*   **Layout Template**: Uses `<ContentLayout />` which is optimized for readability (`prose` styling), accessibility, and semantic HTML.
*   **Best Practices**:
    *   Use Static Site Generation (`generateStaticParams` in Next.js).
    *   Optimize images with `<Image />`.
    *   Ensure rich metadata for SEO.

### 3.2. Application-Driven Pages

*   **Purpose**: Designed for pages that require high interactivity, dynamic data, and client-side state management.
*   **Use Cases**: User dashboards, complex forms, data analytics, real-time interfaces.
*   **Characteristics**:
    *   Rich client-side interactivity and state.
    *   Dynamic content loading via API calls.
    *   Leverages React hooks, state managers (Zustand), and client-side rendering.
*   **Layout Template**: Uses `<ApplicationLayout />` which provides the necessary structure for interactive elements and is ready for state management providers.
*   **Best Practices**:
    *   Implement proper loading states (skeletons) and error boundaries.
    *   Use code-splitting (`next/dynamic`) for heavy components.
    *   Optimize re-renders with `useMemo` and `useCallback`.