# LND Boilerplate - Developer Documentation

Welcome! This is the central hub for the complete technical documentation on the architecture, setup, and development workflows for the LND Boilerplate.

## 📚 Table of Contents

### 1. Conceptual Overview
*   **[Architecture Overview](./1_CONCEPTUAL/ARCHITECTURE.md)** - High-level principles, monorepo structure, and page rendering strategies.
*   **[Technology Stack](./1_CONCEPTUAL/TECH_STACK.md)** - A detailed list of technologies used and their purpose.
*   **[Project Structure](./1_CONCEPTUAL/STRUCTURE.md)** - A detailed breakdown of the file and folder structure.

### 2. Development Guides
*   **[Quick Start Guide](./2_DEVELOPMENT_GUIDES/QUICK_START.md)** - First steps for new developers.
*   **[Adding Components](./2_DEVELOPMENT_GUIDES/ADDING_COMPONENTS.md)** - How to create and integrate new UI components.
*   **[Adding Pages](./2_DEVELOPMENT_GUIDES/ADDING_PAGES.md)** - The process for creating new pages and routes.
*   **[Styling & Theming](./2_DEVELOPMENT_GUIDES/STYLING.md)** - Working with Tailwind CSS and the design system.

### 3. Core Feature Guides
*   **[Locale Configuration](./3_CORE_FEATURES/LOCALE_CONFIGURATION.md)** - A deep dive into the internationalization system.
*   **[Component System](./3_CORE_FEATURES/COMPONENT_SYSTEM.md)** - The three-tier component architecture explained.
*   **[Routing System](./3_CORE_FEATURES/ROUTING.md)** - How the Next.js App Router is utilized.

### 4. Operations
*   **[Deployment Guide](./4_OPERATIONS/DEPLOYMENT.md)** - Instructions for deploying the application.
*   **[Testing Strategy](./4_OPERATIONS/TESTING.md)** - Our approach to unit, integration, and E2E testing.
*   **[CI/CD](./4_OPERATIONS/CI_CD.md)** - Setting up continuous integration and delivery pipelines.

### 5. Contributing
*   **[Contributing Guide](./5_CONTRIBUTING/CONTRIBUTING.md)** - The main guide for contributing to the project.
*   **[Language Policy](./5_CONTRIBUTING/LANGUAGE_POLICY.md)** - Rules for the English-only policy enforced in the repository.

---

## 🚀 Quick Commands

| Command | Description |
| :--- | :--- |
| `bun install` | Install all dependencies. |
| `bun dev` | Start the local development server. |
| `bun run build` | Build the application for production. |
| `bun test` | Run all tests. |
| `bun run lint` | Check the code for linting errors. |
| `bun run format`| Format all code with Prettier. |