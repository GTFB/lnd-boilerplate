import { BaseDesignSystem } from './BaseDesignSystem'

export class AlisaDesignSystem extends BaseDesignSystem {
  name = 'Alisa'
  description = 'A vibrant, energetic design system with bold colors and dynamic animations'
  version = '1.0.0'

  private cssVariables = {
    '--color-primary': '#8b5cf6',
    '--color-primary-hover': '#7c3aed',
    '--color-secondary': '#ec4899',
    '--color-accent': '#06b6d4',
    '--color-background': '#fafafa',
    '--color-foreground': '#18181b',
    '--color-muted': '#f4f4f5',
    '--color-muted-foreground': '#71717a',
    '--color-border': '#e4e4e7',
    '--color-input': '#ffffff',
    '--color-ring': '#8b5cf6',
    '--color-card': '#ffffff',
    '--color-card-foreground': '#18181b',
    '--color-popover': '#ffffff',
    '--color-popover-foreground': '#18181b',
    '--color-destructive': '#f43f5e',
    '--color-destructive-foreground': '#fefefe',
    '--color-success': '#22c55e',
    '--color-warning': '#f59e0b',
    '--color-info': '#06b6d4',
    '--font-family-sans': 'Poppins, system-ui, sans-serif',
    '--font-family-mono': 'Fira Code, monospace',
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
    '--border-radius-sm': '0.25rem',
    '--border-radius-base': '0.5rem',
    '--border-radius-md': '0.75rem',
    '--border-radius-lg': '1rem',
    '--border-radius-xl': '1.5rem',
    '--border-radius-2xl': '2rem',
    '--border-radius-full': '9999px',
    '--shadow-sm': '0 2px 4px 0 rgb(0 0 0 / 0.1)',
    '--shadow-base': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '--shadow-md': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '--shadow-lg': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
    '--shadow-xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '--transition-fast': '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-base': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-slow': '250ms cubic-bezier(0.4, 0, 0.2, 1)'
  }

  applyStyles(): void {
    this.addCSSClass('alisa-theme')
    this.addCSSVariables(this.cssVariables)
  }

  removeStyles(): void {
    this.removeCSSClass('alisa-theme')
    this.removeCSSVariables(Object.keys(this.cssVariables))
  }
}
