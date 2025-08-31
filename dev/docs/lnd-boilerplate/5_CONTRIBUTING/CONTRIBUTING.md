# Contributing Guide

We welcome contributions to the LND Boilerplate! Your help is essential for keeping it great.

This document provides guidelines for contributing to the project.

## How to Contribute

1.  **Fork the repository** and create your branch from `main`.
2.  **Install dependencies** by running `bun install` in the root directory.
3.  **Make your changes** in a dedicated branch.
4.  **Ensure Code Quality**:
    *   Run `bun run lint` to check for linting errors.
    *   Run `bun run format` to format your code.
    *   Run `bun run type-check` to ensure type safety.
5.  **Commit your changes** using a descriptive commit message. Please adhere to our language policy.
6.  **Open a Pull Request** to the `main` branch with a clear title and description of your changes.

## Commit Message and PR Guidelines

To maintain a clean and understandable Git history, we follow two main rules:

1.  **Conventional Commits:** We use the [Conventional Commits](https://www.conventionalcommits.org/) specification. Each commit message should be prefixed with a type, such as `feat:`, `fix:`, `docs:`, `refactor:`, etc.
2.  **Language Policy:** All commits, PR titles, descriptions, and code comments **must be in English**. This is enforced automatically by Git hooks and GitHub Actions. For detailed information, please read our **[Language Policy](./LANGUAGE_POLICY.md)**.

## Code of Conduct

This project and everyone participating in it is governed by a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.