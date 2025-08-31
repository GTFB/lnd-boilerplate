# Testing Strategy

This document outlines the testing strategy for the project, aimed at ensuring code quality and application stability. We follow a balanced approach inspired by the "Testing Trophy."

## 1. Static Analysis

*   **Tools:** TypeScript, ESLint, Prettier
*   **Purpose:** This is the first line of defense. Static analysis catches type errors, code style inconsistencies, and common programming mistakes at build time, before the code is ever run.
*   **Execution:** Runs automatically during development and as a required check in the CI pipeline.

## 2. Unit Tests

*   **Tools:** Vitest, React Testing Library
*   **Location:** `*.test.ts` files located next to the source code, primarily in `packages/utils`.
*   **Purpose:** To test individual, isolated functions or "units" of code. This is ideal for testing business logic, utility functions, and formatters.
*   **Example:** Testing a `formatDate` function in `packages/utils/formatters` to ensure it returns the correct string for various inputs.
*   **Command:** `bun test`

## 3. Component Tests

*   **Tools:** Vitest, React Testing Library
*   **Location:** `*.test.tsx` files located next to components in `packages/ui`.
*   **Purpose:** To test individual React components in isolation. We test from the user's perspective: does the component render correctly given certain props, and does it behave as expected when the user interacts with it?
*   **Example:** Testing a `<ThemeToggle />` component to ensure that clicking it calls the theme-changing function.

## 4. End-to-End (E2E) Tests

*   **Tools:** Playwright (Recommended) or Cypress
*   **Location:** A dedicated `tests/` directory within `apps/landing`.
*   **Purpose:** To test critical user flows through the entire application, simulating real user behavior in a browser. E2E tests are the most powerful but also the slowest and most brittle.
*   **Example:** A test that navigates to the contact page, fills out the form, clicks "submit," and verifies that a success message is displayed.
*   **Execution:** Typically run as a separate job in the CI pipeline, often only against the `main` branch before a production deployment.