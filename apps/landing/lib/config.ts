import siteConfig from '../site.config.json';

export interface ThemeConfig {
  name: 'lora' | 'alisa';
  options: ('lora' | 'alisa')[];
  autoSwitch: boolean;
  default: 'lora' | 'alisa';
}

export function getThemeConfig(): ThemeConfig {
  return siteConfig.theme as ThemeConfig;
}
