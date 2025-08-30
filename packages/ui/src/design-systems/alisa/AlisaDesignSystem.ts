import { BaseDesignSystem } from '../base/DesignSystem'

export class AlisaDesignSystem extends BaseDesignSystem {
  constructor() {
    super({
      name: 'Alisa',
      description: 'Modern and dynamic design system',
      colors: {
        primary: '#7c3aed',
        secondary: '#4c1d95',
        accent: '#f59e0b',
        background: '#f8fafc',
        foreground: '#0f172a',
        muted: '#64748b',
        border: '#cbd5e1'
      },
      animations: {
        duration: '200ms',
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitions: ['bounce', 'pulse', 'wiggle']
      }
    })
  }

  getCSSVariables(): Record<string, string> {
    return {
      'color-primary': this.colors.primary,
      'color-secondary': this.colors.secondary,
      'color-accent': this.colors.accent,
      'color-background': this.colors.background,
      'color-foreground': this.colors.foreground,
      'color-muted': this.colors.muted,
      'color-border': this.colors.border,
      
      // Additional colors for Alisa
      'color-primary-light': '#a855f7',
      'color-primary-dark': '#581c87',
      'color-accent-light': '#fbbf24',
      'color-accent-dark': '#d97706',
      
      // Gradients
      'gradient-primary': `linear-gradient(135deg, ${this.colors.primary}, ${this.colors.accent})`,
      'gradient-secondary': `linear-gradient(135deg, ${this.colors.secondary}, ${this.colors.primary})`,
      'gradient-accent': `linear-gradient(135deg, ${this.colors.accent}, #ef4444)`,
      
      // Shadows
      'shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      
      // Border radius
      'radius-sm': '0.375rem',
      'radius-md': '0.75rem',
      'radius-lg': '1.5rem',
      'radius-xl': '2rem',
      'radius-2xl': '3rem'
    }
  }

  getTailwindConfig(): Record<string, any> {
    return {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87'
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite'
      }
    }
  }

  getAnimationClasses(): Record<string, string> {
    return {
      'bounce': `${this.animations.duration} ${this.animations.easing}`,
      'pulse': `${this.animations.duration} ${this.animations.easing}`,
      'wiggle': `${this.animations.duration} ${this.animations.easing}`,
      'slide-in-left': `${this.animations.duration} ${this.animations.easing}`,
      'slide-in-right': `${this.animations.duration} ${this.animations.easing}`,
      'scale-bounce': `${this.animations.duration} ${this.animations.easing}`
    }
  }

  // Alisa-specific methods
  getDynamicTransitions(): Record<string, string> {
    return {
      'transition-dynamic': `all ${this.animations.duration} ${this.animations.easing}`,
      'transition-bounce': `all ${this.animations.duration} cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
      'transition-elastic': `all ${this.animations.duration} cubic-bezier(0.175, 0.885, 0.32, 1.275)`
    }
  }

  getModernTypographyScale(): Record<string, string> {
    return {
      'text-xs': '0.75rem',
      'text-sm': '0.875rem',
      'text-base': '1rem',
      'text-lg': '1.125rem',
      'text-xl': '1.25rem',
      'text-2xl': '1.5rem',
      'text-3xl': '1.875rem',
      'text-4xl': '2.25rem',
      'text-5xl': '3rem',
      'text-6xl': '3.75rem',
      'text-7xl': '4.5rem',
      'text-8xl': '6rem',
      'text-9xl': '8rem'
    }
  }

  getGlassmorphismStyles(): Record<string, string> {
    return {
      'glass-bg': 'rgba(255, 255, 255, 0.1)',
      'glass-border': 'rgba(255, 255, 255, 0.2)',
      'glass-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      'backdrop-blur': 'blur(10px)'
    }
  }
}
