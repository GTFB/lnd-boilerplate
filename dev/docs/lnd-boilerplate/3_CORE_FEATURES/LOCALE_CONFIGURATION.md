# Locale Configuration Guide

This guide provides a comprehensive overview of the internationalization (i18n) system. It covers everything from quick configuration to the underlying architecture that supports different runtime environments.

## Quick Configuration

To change the available languages and set the default language for the application, edit the `i18n` section in `apps/landing/site.config.json`.

```json
{
  "features": {
    "i18n": {
      "enabled": true,
      "defaultLocale": "en",
      "locales": ["en", "ru", "es", "fr", "de"]
    }
  }
}
```
*   `defaultLocale`: The language that will be served without a URL prefix (e.g., `/about`).
*   `locales`: The complete list of supported language codes.

After changing the configuration, restart the development server.

## Architecture: Multi-Runtime Support

The system is designed to work seamlessly across different JavaScript environments by providing specialized utility modules. This prevents bundling server-side code (like `fs`) on the client and ensures compatibility with edge runtimes.

*   **Server-Side (`@lnd/utils/config/locale.ts`):** Used in Server Components and API routes. It has full access to the file system to read `site.config.json` directly.
*   **Client-Side (`@lnd/utils/config/locale-client.ts`):** Used in Client Components (`'use client'`). It does not access the file system and relies on build-time environment variables or hardcoded fallbacks.
*   **Edge Runtime (`@lnd/utils/config/locale-edge.ts`):** A lightweight version for use in Next.js Middleware. It has no Node.js dependencies.

## URL Structure and Routing

The routing logic is designed to be intuitive and SEO-friendly.

*   **Default Locale URLs:** Pages are served without a language prefix (e.g., `/docs`, `/about`). The root `/` path serves the default locale's homepage.
*   **Other Locale URLs:** All other languages are served with a URL prefix (e.g., `/ru/docs`, `/es/about`).

The `middleware.ts` file automatically handles redirects. For example, if `en` is the default locale, a request to `/en/docs` will be redirected to `/docs`.

## Language Switcher Behavior

The language switcher component intelligently preserves the user's context:
- Navigating from a default locale page `/docs` to Russian will redirect to `/ru/docs`.
- Navigating from a prefixed page `/ru/docs` to the default locale (`en`) will redirect to `/docs`.

## Available API and Functions

You should always import locale utilities from the correct module based on your environment.

### 1. Server-Side Utilities
For Server Components and API Routes.
```typescript
import {
  getDefaultLocale,
  getSupportedLocales,
  isDefaultLocale,
  getLocaleDisplayName,
  getLocaleFlag
} from '@lnd/utils/config/locale';
```

### 2. Client-Side Utilities
For React Components (`'use client'`).
```typescript
import {
  getDefaultLocale,
  getSupportedLocales,
  // ...and other functions
} from '@lnd/utils/config/locale-client';
```

### 3. Edge Runtime Utilities
For `middleware.ts`.
```typescript
import {
  getDefaultLocale,
  getSupportedLocales,
  // ...and other functions
} from '@lnd/utils/config/locale-edge';
```

#### Key Functions
- `getDefaultLocale()`: Returns the default locale code (e.g., `'en'`).
- `getSupportedLocales()`: Returns an array of supported locale codes.
- `isDefaultLocale(locale)`: Returns `true` if the given locale is the default.
- `getLocaleDisplayName(locale)`: Returns the human-readable name (e.g., 'English').
- `getLocaleFlag(locale)`: Returns the flag emoji (e.g., '🇺🇸').

## Troubleshooting

### "Module not found: Can't resolve 'fs'"
**Cause:** You are importing the server-side `locale.ts` utility inside a Client Component.
**Solution:** Change the import path to `locale-client.ts`.

### "The edge runtime does not support Node.js 'fs' module"
**Cause:** You are importing the server-side `locale.ts` utility inside `middleware.ts`.
**Solution:** Change the import path to `locale-edge.ts`.