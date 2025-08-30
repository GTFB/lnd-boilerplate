import { DesignSystem as IDesignSystem, ColorPalette, AnimationConfig } from '../../types'

export interface IDesignSystemPlugin {
  name: string
  version: string
  apply(system: BaseDesignSystem): void
}

export abstract class BaseDesignSystem implements IDesignSystem {
  public name: string
  public description: string
  public colors: ColorPalette
  public animations: AnimationConfig
  private plugins: IDesignSystemPlugin[] = []

  constructor(config: IDesignSystem) {
    this.name = config.name
    this.description = config.description
    this.colors = config.colors
    this.animations = config.animations
  }

  // Method for applying plugins
  addPlugin(plugin: IDesignSystemPlugin): void {
    this.plugins.push(plugin)
    plugin.apply(this)
  }

  // Method for getting all plugins
  getPlugins(): IDesignSystemPlugin[] {
    return this.plugins
  }

  // Abstract methods that must be implemented by inheritors
  abstract getCSSVariables(): Record<string, string>
  abstract getTailwindConfig(): Record<string, any>
  abstract getAnimationClasses(): Record<string, string>

  // Method for applying design system to DOM
  applyToDOM(): void {
    const root = document.documentElement
    const cssVars = this.getCSSVariables()
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    // Apply animations
    const animationClasses = this.getAnimationClasses()
    Object.entries(animationClasses).forEach(([key, value]) => {
      root.style.setProperty(`--animation-${key}`, value)
    })
  }

  // Method for getting CSS variables in Tailwind format
  getTailwindCSSVariables(): string {
    const cssVars = this.getCSSVariables()
    return Object.entries(cssVars)
      .map(([key, value]) => `--${key}: ${value};`)
      .join('\n')
  }
}
