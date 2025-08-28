import { BaseDesignSystem } from '../base/DesignSystem'

export class LoraDesignSystem extends BaseDesignSystem {
  constructor() {
    super({
      name: 'Lora',
      description: 'Elegant and sophisticated design system',
      colors: {
        primary: '#1a365d',
        secondary: '#2d3748',
        accent: '#3182ce',
        background: '#ffffff',
        foreground: '#1a202c',
        muted: '#718096',
        border: '#e2e8f0'
      },
      animations: {
        duration: '300ms',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitions: ['fade', 'slide', 'scale']
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
      
      // Дополнительные цвета для Lora
      'color-primary-light': '#2d5a87',
      'color-primary-dark': '#0f2029',
      'color-accent-light': '#63b3ed',
      'color-accent-dark': '#2c5282',
      
      // Градиенты
      'gradient-primary': `linear-gradient(135deg, ${this.colors.primary}, ${this.colors.accent})`,
      'gradient-secondary': `linear-gradient(135deg, ${this.colors.secondary}, ${this.colors.muted})`,
      
      // Тени
      'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      
      // Скругления
      'radius-sm': '0.25rem',
      'radius-md': '0.5rem',
      'radius-lg': '1rem',
      'radius-xl': '1.5rem'
    }
  }

  getTailwindConfig(): Record<string, any> {
    return {
      colors: {
        primary: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4a5568',
          700: '#2d3748',
          800: '#1a202c',
          900: '#171923'
        },
        accent: {
          50: '#ebf8ff',
          100: '#bee3f8',
          200: '#90cdf4',
          300: '#63b3ed',
          400: '#4299e1',
          500: '#3182ce',
          600: '#2b6cb0',
          700: '#2c5282',
          800: '#2a4365',
          900: '#1a365d'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      }
    }
  }

  getAnimationClasses(): Record<string, string> {
    return {
      'fade-in': `${this.animations.duration} ${this.animations.easing}`,
      'slide-up': `${this.animations.duration} ${this.animations.easing}`,
      'slide-down': `${this.animations.duration} ${this.animations.easing}`,
      'scale-in': `${this.animations.duration} ${this.animations.easing}`,
      'slide-in-left': `${this.animations.duration} ${this.animations.easing}`,
      'slide-in-right': `${this.animations.duration} ${this.animations.easing}`
    }
  }

  // Специфичные для Lora методы
  getElegantTransitions(): Record<string, string> {
    return {
      'transition-elegant': `all ${this.animations.duration} ${this.animations.easing}`,
      'transition-smooth': `all ${this.animations.duration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      'transition-bounce': `all ${this.animations.duration} cubic-bezier(0.68, -0.55, 0.265, 1.55)`
    }
  }

  getTypographyScale(): Record<string, string> {
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
      'text-6xl': '3.75rem'
    }
  }
}
