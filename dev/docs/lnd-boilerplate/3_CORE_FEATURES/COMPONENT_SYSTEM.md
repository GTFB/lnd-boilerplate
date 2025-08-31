# Component System Deep Dive

This document provides a detailed explanation of the three-tier component architecture used in the `packages/ui` library.

## Tier 1: Primitives

*   **Location:** `packages/ui/src/primitives/`
*   **Purpose:** Primitives are the indivisible, atomic units of our UI. They are direct, lightly-styled wrappers around components from `shadcn/ui` and Radix UI.
*   **Characteristics:**
    *   They are highly reusable and generic.
    *   They contain minimal to no styling, focusing on functionality and accessibility.
    *   They do not contain any business logic or hardcoded content.
*   **Examples:** `Button`, `Card`, `Input`, `Dialog`, `Avatar`.

## Tier 2: Components (Compositions)

*   **Location:** `packages/ui/src/components/`
*   **Purpose:** These are the workhorses of the application. They solve specific business or UI problems by composing one or more Primitives together.
*   **Characteristics:**
    *   They are organized by domain/feature (e.g., `blog/`, `docs/`, `common/`) for discoverability.
    *   They encapsulate a specific piece of functionality (e.g., `PricingTable` knows how to render pricing plans).
    *   They accept props to display data but are generally unaware of where that data comes from.
*   **Examples:** `Header` (composes `Button`s and navigation links), `BlogCard` (composes `Card`, `Image`, and text Primitives), `ThemeToggle`.

## Tier 3: Templates (Layouts)

*   **Location:** `packages/ui/src/templates/`
*   **Purpose:** Templates are the highest-level components that define the overall structure and layout of a page. They provide the "slots" where Components will be placed.
*   **Characteristics:**
    *   They are concerned only with macro-layout: the position of the header, footer, sidebars, and main content area.
    *   They manage the responsive behavior of the main page grid.
    *   They are used by the Layout Engine, which populates their slots based on `site.config.json`.
*   **Examples:** `SingleColumnLayout`, `SidebarLeftLayout`.

## How They Work Together: An Example

Let's trace the rendering of a blog post page to see all three tiers in action.

1.  **The Layout Engine selects a Template:** Based on `site.config.json`, it chooses `SidebarLeftLayout` (**Tier 3**).
2.  **The Template provides slots:** `SidebarLeftLayout` has slots for `header`, `leftSidebar`, and `children` (main content).
3.  **Components are placed in slots:**
    *   The `header` slot is filled with the `Header` component (**Tier 2**).
    *   The `leftSidebar` slot is filled with the `BlogCategories` component (**Tier 2**).
    *   The main content area is filled with a `PostBody` component (**Tier 2**).
4.  **Components are built from Primitives:**
    *   The `Header` component is itself built from `Button` primitives (**Tier 1**) for its links and controls.
    *   The `BlogCategories` component might use a `Card` primitive (**Tier 1**) to frame its list of links.