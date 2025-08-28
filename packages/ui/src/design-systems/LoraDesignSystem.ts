import { BaseDesignSystem } from './BaseDesignSystem'

export class LoraDesignSystem extends BaseDesignSystem {
  name = 'Lora'
  description = 'A modern, clean design system with elegant typography and smooth animations'
  version = '1.0.0'

  private cssVariables = {
    '--color-primary': '#3b82f6',
    '--color-primary-hover': '#2563eb',
    '--color-secondary': '#64748b',
    '--color-accent': '#f59e0b',
    '--color-background': '#ffffff',
    '--color-foreground': '#0f172a',
    '--color-muted': '#f1f5f9',
    '--color-muted-foreground': '#64748b',
    '--color-border': '#e2e8f0',
    '--color-input': '#ffffff',
    '--color-ring': '#3b82f6',
    '--color-card': '#ffffff',
    '--color-card-foreground': '#0f172a',
    '--color-popover': '#ffffff',
    '--color-popover-foreground': '#0f172a',
    '--color-destructive': '#ef4444',
    '--color-destructive-foreground': '#fefefe',
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-info': '#3b82f6',
    '--font-family-sans': 'Inter, system-ui, sans-serif',
    '--font-family-mono': 'JetBrains Mono, monospace',
    '--font-size-xs': '0.75rem',
    '--font-size-sm': '0.875rem',
    '--font-size-base': '1rem',
    '--font-size-lg': '1.125rem',
    '--font-size-xl': '1.25rem',
    '--font-size-2xl': '1.5rem',
    '--font-size-3xl': '1.875rem',
    '--font-size-4xl': '2.25rem',
    '--font-weight-normal': '400',
    '--font-weight-medium': '500',
    '--font-weight-semibold': '600',
    '--font-weight-bold': '700',
    '--border-radius-sm': '0.125rem',
    '--border-radius-base': '0.25rem',
    '--border-radius-md': '0.375rem',
    '--border-radius-lg': '0.5rem',
    '--border-radius-xl': '0.75rem',
    '--border-radius-2xl': '1rem',
    '--border-radius-full': '9999px',
    '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '--shadow-base': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '--shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '--transition-fast': '150ms ease-in-out',
    '--transition-base': '200ms ease-in-out',
    '--transition-slow': '300ms ease-in-out'
  }

  applyStyles(): void {
    this.addCSSClass('lora-theme')
    this.addCSSVariables(this.cssVariables)
  }

  removeStyles(): void {
    this.removeCSSClass('lora-theme')
    this.removeCSSVariables(Object.keys(this.cssVariables))
  }
}
