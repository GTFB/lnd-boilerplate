# CI/CD Guide

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline, which automates code quality checks and deployments.

## 1. Continuous Integration (CI)

The CI pipeline is managed by **GitHub Actions** and is defined in the workflow file located at `.github/workflows/ci.yml`.

### Triggers
The CI pipeline is automatically triggered on:
-   Any `push` to the `main` or `develop` branches.
-   Any `pull_request` opened against the `main` branch.

### Jobs
The pipeline consists of several sequential jobs that must all pass for the run to be considered successful.

1.  **Install Dependencies:**
    *   Checks out the code.
    *   Installs Bun.
    *   Runs `bun install` to install all monorepo dependencies, using a cache for speed.

2.  **Code Quality Checks:**
    *   **Lint:** Runs `bun run lint` to check for code style errors with ESLint.
    *   **Format:** Runs `bun run format:check` to ensure all code has been formatted with Prettier.
    *   **Type Check:** Runs `bun run type-check` to perform static analysis with TypeScript and catch any type errors.

3.  **Testing:**
    *   Runs `bun test` to execute all unit and component tests across the monorepo.

4.  **Build:**
    *   Runs `bun run build` to create a production-ready build of all applications in the `apps/` directory. This ensures that the code can be successfully compiled for production.

## 2. Continuous Deployment (CD)

Continuous Deployment is handled by our hosting platform (e.g., Vercel) and is triggered by the successful completion of the CI pipeline.

### Vercel Deployment Flow

1.  A developer opens a Pull Request against the `main` branch.
2.  The GitHub Actions CI pipeline runs all checks.
3.  Simultaneously, Vercel creates a **Preview Deployment** for the PR, allowing for live review of the changes.
4.  Once the PR is approved and merged into `main`, Vercel detects the push and automatically triggers a **Production Deployment**.
5.  The new version is deployed to production with zero downtime.