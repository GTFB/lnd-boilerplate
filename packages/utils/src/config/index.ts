/**
 * Configuration utilities exports
 */

// Site config types only (no fs dependencies)
export * from './site-config.types';

// Client-side locale utilities (fallback values)
export {
  getDefaultLocale as getDefaultLocaleClient,
  getSupportedLocales as getSupportedLocalesClient,
  isDefaultLocale as isDefaultLocaleClient,
  getLocaleDisplayName,
  getLocaleFlag
} from './locale-client';

// Edge Runtime locale utilities (fallback values)
export {
  getDefaultLocale as getDefaultLocaleEdge,
  getSupportedLocales as getSupportedLocalesEdge,
  isDefaultLocale as isDefaultLocaleEdge,
  getLocaleDisplayName as getLocaleDisplayNameEdge,
  getLocaleFlag as getLocaleFlagEdge
} from './locale-edge';
