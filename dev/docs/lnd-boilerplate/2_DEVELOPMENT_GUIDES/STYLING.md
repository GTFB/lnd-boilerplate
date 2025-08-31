# Styling & Theming Guide

This document outlines the principles and tools used for styling components in the project.

## 1. Tailwind CSS: The Foundation

The primary tool for styling is **Tailwind CSS**. We adhere to a **utility-first** approach, which means styling is applied directly in the JSX using class names.

```tsx
<div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Card Title</h3>
  <p className="mt-2 text-gray-600 dark:text-gray-300">This is styled with Tailwind utilities.</p>
</div>
```

### Configuration
The main configuration file is `tailwind.config.js`. Here you can extend the default theme with custom colors, fonts, spacing, etc.

## 2. Theming (Light/Dark Mode)

Theme management is handled by `next-themes`.

- **Mechanism:** The library toggles a `dark` class on the `<html>` element.
- **Styling:** Tailwind's `dark:` variant is used to apply styles specifically for dark mode.
- **Implementation:** The `ThemeToggle` component in `packages/ui/components/common/` provides the user-facing control to switch themes.

## 3. Handling Conditional and Dynamic Classes

When applying classes conditionally, style conflicts can occur (e.g., `p-2` and `p-4` applied at the same time). We use two utilities to manage this gracefully.

- **`clsx`**: A tiny utility for constructing `className` strings conditionally.
- **`tailwind-merge`**: A utility that intelligently merges Tailwind CSS classes, resolving conflicts.

These are often used together in a helper function, typically found in `packages/ui/lib/utils.ts`.

```typescript
// packages/ui/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```tsx
import { cn } from "@/lib/utils";

function MyButton({ isPrimary, className }) {
  const buttonClasses = cn(
    "px-4 py-2 rounded font-semibold", // base classes
    { "bg-blue-500 text-white": isPrimary }, // conditional class
    { "bg-gray-200 text-gray-800": !isPrimary }, // conditional class
    className // allow passing extra classes
  );
  return <button className={buttonClasses}>Click me</button>;
}
```

## 4. Global Styles

While most styling should be done with Tailwind utilities, some global styles are necessary (e.g., base font styles, CSS variable definitions).

These styles are located in `apps/landing/styles/globals.css`. This is also where base CSS variables for theming (colors, radii, etc.) are defined.