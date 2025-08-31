# Locale Configuration Guide

## Overview

The system now supports dynamic locale configuration based on `site.config.json`. The default locale is displayed without a prefix, while other locales use the language prefix. The system uses separate utilities for different runtime environments to avoid compatibility issues.

## Architecture

### Three-Tier Runtime Support

The system uses three sets of utilities for different environments:

**Server-Side (`locale.ts`):**
- Reads configuration from `site.config.json`
- Used in server components and API routes
- Has access to file system
- Runs in Node.js environment

**Client-Side (`locale-client.ts`):**
- Uses fallback values when config is not available
- Used in React components and client-side code
- No file system dependencies
- Runs in browser environment

**Edge Runtime (`locale-edge.ts`):**
- Uses fallback values for Edge Runtime
- Used in middleware and Edge functions
- No Node.js dependencies
- Runs in Edge Runtime environment

## Configuration

### Basic Configuration

In `site.config.json`, configure the i18n section:

```json
{
  "features": {
    "i18n": {
      "enabled": true,
      "defaultLocale": "ru",
      "locales": ["ru", "en", "es", "fr", "de"]
    }
  }
}
```

### Supported Languages

The system supports the following languages with their display names and flags:

| Code | Name | Flag | Supported |
|------|------|------|-----------|
| `ru` | Русский | 🇷🇺 | ✅ |
| `en` | English | 🇺🇸 | ✅ |
| `es` | Español | 🇪🇸 | ✅ |
| `fr` | Français | 🇫🇷 | ✅ |
| `de` | Deutsch | 🇩🇪 | ✅ |
| `it` | Italiano | 🇮🇹 | ✅ |
| `pt` | Português | 🇵🇹 | ✅ |
| `ja` | 日本語 | 🇯🇵 | ✅ |
| `ko` | 한국어 | 🇰🇷 | ✅ |
| `zh` | 中文 | 🇨🇳 | ✅ |

## Examples

### Example 1: Russian as Default

```json
{
  "features": {
    "i18n": {
      "enabled": true,
      "defaultLocale": "ru",
      "locales": ["ru", "en", "es", "fr", "de"]
    }
  }
}
```

**Result:**
- `/` → `/ru` (redirects to Russian homepage)
- `/ru` → Russian homepage (no prefix)
- `/ru/docs` → Russian docs (no prefix)
- `/en` → English homepage (with prefix)
- `/en/docs` → English docs (with prefix)

### Example 2: English as Default

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

**Result:**
- `/` → `/en` (redirects to English homepage)
- `/en` → English homepage (no prefix)
- `/en/docs` → English docs (no prefix)
- `/ru` → Russian homepage (with prefix)
- `/ru/docs` → Russian docs (with prefix)

### Example 3: Spanish as Default

```json
{
  "features": {
    "i18n": {
      "enabled": true,
      "defaultLocale": "es",
      "locales": ["es", "en", "ru", "fr", "de"]
    }
  }
}
```

**Result:**
- `/` → `/es` (redirects to Spanish homepage)
- `/es` → Spanish homepage (no prefix)
- `/es/docs` → Spanish docs (no prefix)
- `/en` → English homepage (with prefix)
- `/ru` → Russian homepage (with prefix)

## URL Structure

### Default Locale URLs
- **Homepage**: `/` (redirects to default locale)
- **Pages**: `/docs`, `/about` (no prefix)

### Other Locale URLs
- **Homepage**: `/en`, `/ru`, `/es` (with prefix)
- **Pages**: `/en/docs`, `/ru/about` (with prefix)

## Language Switcher Behavior

The language switcher intelligently preserves the current page:

### From Default Locale
- **From `/docs`** → **To `/en/docs`** (preserves page)
- **From `/about`** → **To `/es/about`** (preserves page)
- **From `/`** → **To `/ru`** (homepage to homepage)

### To Default Locale
- **From `/en/docs`** → **To `/docs`** (removes prefix)
- **From `/ru/about`** → **To `/about`** (removes prefix)
- **From `/es`** → **To `/`** (homepage to homepage)

## Navigation Links

Navigation links automatically adjust based on the current language:

### Default Locale Navigation
```tsx
<Link href="/">Home</Link>
<Link href="/docs">Documentation</Link>
<Link href="/about">About</Link>
```

### Other Locale Navigation
```tsx
<Link href="/en">Home</Link>
<Link href="/en/docs">Documentation</Link>
<Link href="/en/about">About</Link>
```

## Implementation Details

### Server-Side Utilities

For server components and API routes:

```typescript
import { 
  getDefaultLocale, 
  getSupportedLocales, 
  isDefaultLocale,
  getLocaleDisplayName,
  getLocaleFlag
} from '@lnd/utils/config/locale'
```

### Client-Side Utilities

For React components:

```typescript
import { 
  getDefaultLocale, 
  getSupportedLocales, 
  isDefaultLocale,
  getLocaleDisplayName,
  getLocaleFlag
} from '@lnd/utils/config/locale-client'
```

### Edge Runtime Utilities

For middleware and Edge functions:

```typescript
import { 
  getDefaultLocale, 
  getSupportedLocales, 
  isDefaultLocale,
  getLocaleDisplayName,
  getLocaleFlag
} from '@lnd/utils/config/locale-edge'
```

### Functions

- **`getDefaultLocale()`**: Returns the default locale from config (server) or fallback (client/edge)
- **`getSupportedLocales()`**: Returns array of supported locales
- **`isDefaultLocale(locale)`**: Checks if locale is the default
- **`getLocaleDisplayName(locale)`**: Returns localized name
- **`getLocaleFlag(locale)`**: Returns flag emoji

### Components

- **`LanguageSwitcher`**: Dynamic language dropdown (uses client utilities)
- **`Navigation`**: Language-aware navigation links (uses client utilities)
- **`useCurrentPath`**: Hook for current URL path
- **`middleware`**: Edge Runtime middleware (uses edge utilities)

## Migration Guide

### From Hardcoded Locales

**Before:**
```typescript
const languages = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]
```

**After:**
```typescript
import { getSupportedLocales, getLocaleDisplayName, getLocaleFlag } from '@lnd/utils/config/locale-client'

const supportedLocales = getSupportedLocales()
const languages = supportedLocales.map(locale => ({
  code: locale,
  name: getLocaleDisplayName(locale),
  flag: getLocaleFlag(locale)
}))
```

### From Hardcoded Navigation

**Before:**
```typescript
{currentLanguage === 'ru' && 'Главная'}
{currentLanguage === 'en' && 'Home'}
```

**After:**
```typescript
{getNavText('home')}
```

## Best Practices

1. **Use appropriate utilities**: Use client utilities in components, server utilities in API routes, edge utilities in middleware
2. **Always use utilities**: Don't hardcode locale values
3. **Test with different configs**: Verify behavior with various default locales
4. **Handle edge cases**: Empty strings, unknown locales
5. **Maintain consistency**: Use the same locale codes throughout
6. **Document changes**: Update documentation when adding new locales

## Troubleshooting

### Common Issues

1. **Build errors**: Ensure you're using the correct utility for your runtime environment
2. **Missing config**: Check that `site.config.json` exists and is valid
3. **Wrong paths**: Verify middleware redirects are working
4. **Language not showing**: Check if locale is in `locales` array
5. **Module not found**: Use the appropriate utility for your environment

### Debug Tips

1. **Check config**: Log `getDefaultLocale()` and `getSupportedLocales()`
2. **Verify paths**: Test URL generation with `getLanguagePath()`
3. **Inspect middleware**: Check redirect behavior in browser dev tools
4. **Test switching**: Verify language switcher preserves current page
5. **Check imports**: Ensure you're importing from the correct module

### Build Errors

#### "Module not found: Can't resolve 'fs'"

**Wrong:**
```typescript
import { getDefaultLocale } from '@lnd/utils/config/locale' // Server-side
```

**Correct:**
```typescript
import { getDefaultLocale } from '@lnd/utils/config/locale-client' // Client-side
```

#### "The edge runtime does not support Node.js 'fs' module"

**Wrong:**
```typescript
import { getDefaultLocale } from '@lnd/utils/config/locale' // Server-side
```

**Correct:**
```typescript
import { getDefaultLocale } from '@lnd/utils/config/locale-edge' // Edge Runtime
```

## Testing

The system includes comprehensive tests for all three runtime environments:

- **Server-side tests**: `tests/config/locale.test.ts`
- **Client-side tests**: `tests/config/locale-client.test.ts`
- **Edge Runtime tests**: `tests/config/locale-edge.test.ts`

Run tests with:
```bash
make utils-test
```

## Runtime Environment Guide

### When to Use Each Utility

**Use `locale.ts` (Server-side):**
- Server components
- API routes
- Build-time configuration
- Static generation

**Use `locale-client.ts` (Client-side):**
- React components
- Client-side hooks
- Browser-only code
- Interactive features

**Use `locale-edge.ts` (Edge Runtime):**
- Middleware
- Edge functions
- Edge API routes
- Runtime configuration

### Environment Detection

The system automatically detects the runtime environment:

- **Node.js**: Uses server utilities
- **Browser**: Uses client utilities  
- **Edge Runtime**: Uses edge utilities

### Configuration Priority

1. **Server-side**: Reads from `site.config.json`
2. **Client-side**: Uses fallback values
3. **Edge Runtime**: Uses fallback values

For production, consider using environment variables to override fallback values in client and edge environments.
