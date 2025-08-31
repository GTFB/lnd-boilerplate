import { siteConfigSchema, SiteConfig } from '@lnd/config-schemas';

let validatedConfig: SiteConfig | null = null;

export function validateSiteConfig(config: unknown): SiteConfig {
  try {
    return siteConfigSchema.parse(config);
  } catch (error) {
    console.error("Invalid site.config.json:", error);
    throw new Error("Site configuration is invalid. Check console for details.");
  }
}

export function getValidatedSiteConfig(config: unknown): SiteConfig {
  if (validatedConfig) {
    return validatedConfig;
  }
  
  validatedConfig = validateSiteConfig(config);
  return validatedConfig;
}

export function validatePageType(pageType: unknown) {
  return siteConfigSchema.shape.pageTypes.parse(pageType);
}
