# Language Configuration Guide

## How to Change Languages Without Hardcoding

### Option 1: site.config.json (Recommended)

Update the `defaultLocale` and `locales` in `apps/landing/site.config.json`:

```json
{
  "features": {
    "i18n": {
      "enabled": true,
      "defaultLocale": "es",
      "locales": ["en", "es", "ru", "fr", "de"]
    }
  }
}
```

### Option 2: Environment Variables (Fallback)

Create a `.env.local` file in the `apps/landing/` directory:

```bash
# Default language (without prefix in URLs)
NEXT_PUBLIC_DEFAULT_LOCALE=es

# Supported languages (comma-separated)
NEXT_PUBLIC_SUPPORTED_LOCALES=en,es,ru,fr,de
```

### Option 2: Modify site.config.json

Update the `defaultLocale` and `locales` in `apps/landing/site.config.json`:

```json
{
  "features": {
    "i18n": {
      "enabled": true,
      "defaultLocale": "es",
      "locales": ["en", "es", "ru", "fr", "de"]
    }
  }
}
```

### Option 3: Runtime Configuration

Modify `apps/landing/config/env.ts`:

```typescript
export const envConfig = {
  defaultLocale: 'es',
  supportedLocales: 'en,es,ru,fr,de'
}
```

## How It Works

1. **Default Language**: Shows content without prefix (e.g., `/` shows Spanish content)
2. **Other Languages**: Show content with prefix (e.g., `/en`, `/ru`)
3. **Automatic Redirects**: `/es` redirects to `/`, `/es/docs` redirects to `/docs`
4. **Dynamic Navigation**: Language switcher updates automatically

## Available Languages

- `en` - English
- `es` - Español (Spanish)
- `ru` - Русский (Russian)
- `fr` - Français (French)
- `de` - Deutsch (German)

## After Changing Configuration

1. Restart the development server
2. Clear browser cache (Ctrl+Shift+R)
3. Test the new language configuration
