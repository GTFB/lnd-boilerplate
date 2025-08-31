<div align="center">
  
  <h1>🚀 LND Boilerplate</h1>
  
  <p>
    <strong>A modern, opinionated boilerplate for building high-performance, multilingual web applications with Next.js.</strong>
  </p>

  <!-- Badges -->
  <a href="https://github.com/GTFB/lnd-boilerplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/GTFB/lnd-boilerplate?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/GTFB/lnd-boilerplate/pulls">
    <img src="https://img.shields.io/github/issues-pr/GTFB/lnd-boilerplate?style=flat-square" alt="Pull Requests">
  </a>
  <a href="https://github.com/GTFB/lnd-boilerplate/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/GTFB/lnd-boilerplate/ci.yml?branch=main&style=flat-square" alt="CI Status">
  </a>
  
</div>

---

**LND Boilerplate** is a production-ready foundation designed to accelerate the development of robust, scalable, and internationalized web applications. It leverages a modern tech stack and follows best practices for architecture and developer experience.

## ✨ Features

*   **Internationalization (i18n) by Default:** Built with `next-intl` for seamless, SEO-friendly multilingual support.
*   **Configuration-Driven UI:** Define page layouts and component structures in a simple JSON file.
*   **Three-Tier Component Architecture:** A clear and scalable system for UI development (Primitives, Components, Templates).
*   **Static-First & SEO Optimized:** Prioritizes SSG for top performance and excellent search engine visibility.
*   **Modern Tech Stack:** Powered by Next.js 14, TypeScript, and the lightning-fast Bun runtime.
*   **Monorepo Structure:** Organized with Turborepo for efficient code sharing and management.

## 🚀 Getting Started

Follow these steps to get your local development environment up and running.

**Prerequisites:**
*   [Bun](https://bun.sh/) (v1.0 or higher)

```bash
# 1. Clone the repository
git clone https://github.com/GTFB/lnd-boilerplate.git
cd lnd-boilerplate

# 2. Install dependencies
bun install

# 3. Run the development server
bun dev
```

The application will be available at **http://localhost:3000**.

## 📚 Documentation

For a deep dive into the architecture, component library, and development workflows, please refer to our comprehensive **[Developer Documentation](./dev/docs/boilerplate/README.md)**.

## 🛠 Core Technologies

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14** | The React Framework for the Web |
| **TypeScript** | Static typing for robust code |
| **Bun** | A fast all-in-one JavaScript toolkit |
| **Tailwind CSS** | A utility-first CSS framework |
| **`next-intl`** | Internationalization library |
| **Turborepo** | High-performance monorepo build system |

## 📁 Project Structure

The project is organized as a monorepo with a clear separation of concerns:

```
.
├── apps/
│   └── landing/          # The main Next.js application
├── packages/
│   ├── ui/               # Shared, reusable UI components (the design system)
│   └── utils/            # Shared utility functions (e.g., content readers)
└── dev/
    ├── docs/             # All project-related documentation
    └── ...               # Internal development and automation tools
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to contribute to the project, please start by reading the **[Contribution Guide](./dev/docs/boilerplate/CONTRIBUTING.md)** and opening an issue to discuss your ideas.

## 📄 License

This project is licensed under the MIT License. See the **[LICENSE](./LICENSE.md)** file for details.