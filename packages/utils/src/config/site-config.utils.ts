/**
 * Utilities for working with site.config.json
 */

import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { SiteConfig, Environment, FeatureKey, DeploymentProvider, isSiteConfig, isValidEnvironment, isValidFeatureKey, isValidDeploymentProvider } from './site-config.types';

/**
 * Site configuration manager
 */
export class SiteConfigManager {
  private config: SiteConfig | null = null;
  private configPath: string;

  constructor(configPath?: string) {
    this.configPath = configPath || this.findConfigFile();
  }

  /**
   * Find the site.config.json file in the project
   */
  private findConfigFile(): string {
    const possiblePaths = [
      'site.config.json',
      'apps/landing/site.config.json',
      'config/site.config.json',
      'src/config/site.config.json',
      'packages/utils/src/config/site.config.json'
    ];

    for (const path of possiblePaths) {
      if (existsSync(path)) {
        return resolve(path);
      }
    }

    throw new Error('site.config.json not found. Please ensure the file exists in the project root or one of the expected locations.');
  }

  /**
   * Load configuration from file
   */
  load(): SiteConfig {
    if (this.config) {
      return this.config;
    }

    try {
      const content = readFileSync(this.configPath, 'utf-8');
      const parsed = JSON.parse(content.replace(/^\uFEFF/, '').trim()); // Remove BOM
      
      if (!isSiteConfig(parsed)) {
        throw new Error('Invalid site configuration format');
      }

      this.config = parsed;
      return this.config;
    } catch (error) {
      throw new Error(`Failed to load site configuration: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get site metadata
   */
  getSiteMetadata() {
    return this.load().site;
  }

  /**
   * Get SEO configuration
   */
  getSEOConfig() {
    return this.load().seo;
  }

  /**
   * Get Web App Manifest
   */
  getManifest() {
    return this.load().manifest;
  }

  /**
   * Get build configuration
   */
  getBuildConfig() {
    return this.load().build;
  }

  /**
   * Get deployment configuration for a specific provider
   */
  getDeploymentConfig(provider: DeploymentProvider) {
    const config = this.load().deployment;
    if (!isValidDeploymentProvider(provider)) {
      throw new Error(`Invalid deployment provider: ${provider}`);
    }
    return config[provider];
  }

  /**
   * Get UI configuration
   */
  getUIConfig() {
    return this.load().ui;
  }

  /**
   * Get feature configuration
   */
  getFeatureConfig(feature: FeatureKey) {
    const config = this.load().features;
    if (!isValidFeatureKey(feature)) {
      throw new Error(`Invalid feature key: ${feature}`);
    }
    return config[feature];
  }

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(feature: FeatureKey): boolean {
    const featureConfig = this.getFeatureConfig(feature);
    return featureConfig.enabled;
  }

  /**
   * Get environment variables for a specific environment
   */
  getEnvironmentVariables(env: Environment): Record<string, string> {
    const config = this.load().environment;
    if (!isValidEnvironment(env)) {
      throw new Error(`Invalid environment: ${env}`);
    }
    return config[env];
  }

  /**
   * Get Dev Agent configuration
   */
  getDevAgentConfig() {
    return this.load().devAgent;
  }

  /**
   * Get current environment based on NODE_ENV
   */
  getCurrentEnvironment(): Environment {
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'development') return 'development';
    if (nodeEnv === 'production') return 'production';
    return 'staging';
  }

  /**
   * Get environment variables for current environment
   */
  getCurrentEnvironmentVariables(): Record<string, string> {
    return this.getEnvironmentVariables(this.getCurrentEnvironment());
  }

  /**
   * Generate Next.js configuration from site config
   */
  generateNextConfig() {
    const buildConfig = this.getBuildConfig();
    const uiConfig = this.getUIConfig();
    
    return {
      pageExtensions: buildConfig.pageExtensions,
      webpack: (config: any) => {
        if (buildConfig.webpack.mdx.enabled) {
          config.module.rules.push({
            test: /\.mdx?$/,
            use: [
              {
                loader: '@mdx-js/loader',
                options: {
                  jsxImportSource: buildConfig.webpack.mdx.jsxImportSource,
                },
              },
            ],
          });
        }
        return config;
      },
    };
  }

  /**
   * Generate Tailwind configuration from site config
   */
  generateTailwindConfig() {
    const uiConfig = this.getUIConfig();
    
    return {
      content: uiConfig.content,
      darkMode: uiConfig.theme.darkMode,
      theme: {
        extend: {
          colors: uiConfig.theme.colors,
          borderRadius: uiConfig.theme.borderRadius,
          animation: uiConfig.theme.animation,
        },
      },
      plugins: [],
    };
  }

  /**
   * Generate Vercel configuration from site config
   */
  generateVercelConfig() {
    const deploymentConfig = this.getDeploymentConfig('vercel');
    
    return {
      buildCommand: deploymentConfig.framework,
      outputDirectory: deploymentConfig.framework,
      installCommand: deploymentConfig.framework,
      framework: deploymentConfig.framework,
      functions: deploymentConfig.functions,
      rewrites: deploymentConfig.rewrites,
      headers: deploymentConfig.headers,
    };
  }

  /**
   * Generate Netlify configuration from site config
   */
  generateNetlifyConfig() {
    const deploymentConfig = this.getDeploymentConfig('netlify');
    
    return {
      build: {
        command: deploymentConfig.command,
        publish: deploymentConfig.publish,
        base: deploymentConfig.base,
      },
      'build.environment': deploymentConfig.environment,
      redirects: deploymentConfig.redirects.map((r: any) => ({
        from: r.from,
        to: r.to,
        status: r.status,
      })),
      headers: deploymentConfig.headers.map((h: any) => ({
        for: h.for,
        values: h.values,
      })),
      functions: deploymentConfig.functions,
    };
  }

  /**
   * Validate configuration
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      const config = this.load();
      
      // Validate required fields
      if (!config.site.name) errors.push('Site name is required');
      if (!config.site.url) errors.push('Site URL is required');
      if (!config.seo.title) errors.push('SEO title is required');
      if (!config.manifest.name) errors.push('Manifest name is required');
      
      // Validate URLs
      try {
        new URL(config.site.url);
      } catch {
        errors.push('Invalid site URL format');
      }

      // Validate version format
      if (!/^\d+\.\d+\.\d+/.test(config.site.version)) {
        errors.push('Invalid version format (should be semver)');
      }

      // Validate feature configurations
      Object.entries(config.features).forEach(([key, feature]) => {
        if (typeof feature !== 'object' || feature === null) {
          errors.push(`Invalid feature configuration for ${key}`);
        }
      });

    } catch (error) {
      errors.push(`Configuration loading error: ${error instanceof Error ? error.message : String(error)}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Clear cached configuration
   */
  clearCache(): void {
    this.config = null;
  }

  /**
   * Get configuration path
   */
  getConfigPath(): string {
    return this.configPath;
  }
}

// Singleton instance
let siteConfigManager: SiteConfigManager | null = null;

/**
 * Get the global site configuration manager instance
 */
export function getSiteConfig(): SiteConfigManager {
  if (!siteConfigManager) {
    siteConfigManager = new SiteConfigManager();
  }
  return siteConfigManager;
}

/**
 * Initialize site configuration with custom path
 */
export function initSiteConfig(configPath: string): SiteConfigManager {
  siteConfigManager = new SiteConfigManager(configPath);
  return siteConfigManager;
}

/**
 * Utility functions for common operations
 */

/**
 * Get site name
 */
export function getSiteName(): string {
  return getSiteConfig().getSiteMetadata().name;
}

/**
 * Get site URL
 */
export function getSiteUrl(): string {
  return getSiteConfig().getSiteMetadata().url;
}

/**
 * Check if feature is enabled
 */
export function isFeatureEnabled(feature: FeatureKey): boolean {
  return getSiteConfig().isFeatureEnabled(feature);
}

/**
 * Get environment variable from current environment
 */
export function getEnvVar(key: string): string | undefined {
  const envVars = getSiteConfig().getCurrentEnvironmentVariables();
  return envVars[key];
}

/**
 * Get all environment variables for current environment
 */
export function getAllEnvVars(): Record<string, string> {
  return getSiteConfig().getCurrentEnvironmentVariables();
}

/**
 * Get deployment configuration for current provider
 */
export function getDeploymentConfig(provider: DeploymentProvider) {
  return getSiteConfig().getDeploymentConfig(provider);
}

/**
 * Generate configuration files from site config
 */
export function generateConfigFiles() {
  const config = getSiteConfig();
  
  return {
    next: config.generateNextConfig(),
    tailwind: config.generateTailwindConfig(),
    vercel: config.generateVercelConfig(),
    netlify: config.generateNetlifyConfig(),
  };
}
