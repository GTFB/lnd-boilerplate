# Cookie Consent System - GDPR Compliance

## Overview

This cookie consent system is designed to be GDPR compliant and provides granular control over different types of cookies.

## Features

### ✅ GDPR Compliant Features

1. **Explicit Consent**: Users must actively choose their preferences
2. **Granular Control**: Separate controls for each cookie type
3. **Easy Withdrawal**: Users can change preferences anytime
4. **Transparency**: Clear descriptions of each cookie type
5. **Necessary Cookies**: Always enabled, cannot be disabled
6. **Consent Storage**: Preferences stored in localStorage

### Cookie Types

- **Necessary**: Essential for website functionality (always enabled)
- **Analytics**: Site usage analysis and performance monitoring
- **Marketing**: Personalized advertisements and tracking
- **Preferences**: User settings and customization
- **Functional**: Enhanced features and personalization

## Usage

### Basic Setup

```tsx
import { CookieProvider } from './contexts/CookieContext'
import { CookieConsent } from './components/ui/CookieConsent'

function App() {
  return (
    <CookieProvider>
      <YourApp />
      <CookieConsent />
    </CookieProvider>
  )
}
```

### Conditional Analytics Loading

```tsx
import { useAnalytics } from './hooks/useAnalytics'

function AnalyticsComponent() {
  const { isEnabled } = useAnalytics()
  
  if (!isEnabled) {
    return null
  }
  
  return <AnalyticsScript />
}
```

### Conditional Marketing Scripts

```tsx
import { useMarketing } from './hooks/useMarketing'

function MarketingComponent() {
  const { isEnabled } = useMarketing()
  
  if (!isEnabled) {
    return null
  }
  
  return <MarketingScript />
}
```

## GDPR Requirements Checklist

- ✅ **Lawful Basis**: Explicit consent required
- ✅ **Transparency**: Clear information about cookie usage
- ✅ **Granular Control**: Separate consent for each category
- ✅ **Easy Withdrawal**: Users can change preferences
- ✅ **No Pre-ticked Boxes**: Default state is opt-out
- ✅ **Consent Storage**: Preferences are properly stored
- ✅ **Necessary Cookies**: Only essential cookies are always enabled

## Implementation Notes

1. **Server-Side Rendering**: System works with SSR
2. **Hydration**: Prevents hydration mismatches
3. **Fallback**: Works without context provider
4. **Responsive**: Adapts to different screen sizes
5. **Accessible**: Follows accessibility guidelines

## Legal Considerations

- Always consult with legal experts for your specific jurisdiction
- Consider additional requirements for ePrivacy Directive
- Ensure compliance with local data protection laws
- Regular review of consent mechanisms is recommended
