# Technology Stack

This document provides an overview of the core technologies used in this boilerplate and the rationale behind their selection.

| Category | Technology | Rationale |
| :--- | :--- | :--- |
| **Environment** | **Bun** | An incredibly fast all-in-one JavaScript toolkit. Used as the runtime, package manager, and bundler to maximize development speed and performance. |
| **Framework** | **Next.js (App Router)** | The leading React framework for production. The App Router enables server components, fine-grained caching, and advanced rendering patterns like SSG and ISR, which are crucial for performance and SEO. |
| **Language** | **TypeScript** | Ensures type safety across the entire monorepo, reducing runtime errors and improving developer experience through autocompletion and static analysis. |
| **Styling** | **Tailwind CSS** | A utility-first CSS framework that allows for rapid UI development directly in the markup without leaving your HTML file. It's highly customizable and promotes consistency. |
| **UI Primitives** | **shadcn/ui** | Not a component library, but a collection of reusable, unstyled, and accessible components built on Radix UI. We copy them into our project, giving us full control over their code and style. |
| **i18n** | **`next-intl`** | A robust internationalization library specifically designed for the Next.js App Router. It handles everything from typed messages to locale-based routing. |
| **State Mgmt** | **Zustand** | A small, fast, and scalable state management solution with a minimal API. It avoids the boilerplate of other state managers and is perfect for both simple and complex state. |
| **Validation** | **Zod** | A TypeScript-first schema declaration and validation library. It allows us to define data schemas and infer TypeScript types from them, ensuring data is valid at runtime. |
| **Build System** | **Turborepo** | A high-performance build system for JavaScript/TypeScript monorepos. It speeds up our CI/CD pipelines and local development through smart caching and task orchestration. |