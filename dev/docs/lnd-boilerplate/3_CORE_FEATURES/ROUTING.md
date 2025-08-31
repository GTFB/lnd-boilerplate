# Routing System Guide

This project uses the **App Router**, the standard routing system in modern Next.js applications. This guide explains its implementation within our architecture.

## 1. File-based Routing

The App Router uses a file-system-based convention. Folders are used to define routes, and a special `page.tsx` file makes a route segment publicly accessible.

**Example:**
- The file at `app/[locale]/about/page.tsx` creates the public URL `/about` (for the default locale).
- The file at `app/[locale]/blog/page.tsx` creates the public URL `/blog`.

## 2. Dynamic Segments

To create routes from dynamic data (like blog post slugs), we use folders with square brackets.

- **`[slug]`**: A folder named `[slug]` will match any value in that URL segment. For example, `app/[locale]/blog/[slug]/page.tsx` will handle routes like `/blog/post-one`, `/blog/another-post`, etc. The `slug` value is passed as a parameter to the page component.

- **`[...slug]`**: A catch-all segment, useful for routes with multiple parts, like documentation paths (`/docs/getting-started/installation`).

## 3. The `[locale]` Segment

All user-facing routes are nested inside the `app/[locale]` directory. This is the foundation of our internationalization strategy.

- The `locale` parameter is automatically available in every page and layout, allowing us to fetch the correct content for the user's selected language.
- The `middleware.ts` file works in conjunction with this segment to handle URL prefixing and redirects.

## 4. Server Components vs. Client Components

The App Router uses React Server Components by default.

- **Server Components:** These components run only on the server. They are ideal for fetching data and reducing the amount of JavaScript sent to the client. They **cannot** use hooks like `useState` or `useEffect`.

- **Client Components:** To add interactivity and use React hooks, you must opt-in by placing the `'use client';` directive at the top of the file. This tells Next.js to send the necessary JavaScript to the browser to make the component interactive.

**Rule of Thumb:** Keep components as Server Components whenever possible. Only use `'use client';` for components that truly need browser-side interactivity.

## 5. API Routes

API endpoints are also created using the file system within the `app/api/` directory. A `route.ts` file is used to define the request handlers (`GET`, `POST`, etc.).

**Example:** `app/api/health/route.ts`
```typescript
export async function GET(request: Request) {
  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```
This creates a `GET` endpoint at `/api/health`.