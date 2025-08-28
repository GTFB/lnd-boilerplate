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

  // Метод для применения плагинов
  addPlugin(plugin: IDesignSystemPlugin): void {
    this.plugins.push(plugin)
    plugin.apply(this)
  }

  // Метод для получения всех плагинов
  getPlugins(): IDesignSystemPlugin[] {
    return this.plugins
  }

  // Абстрактные методы, которые должны реализовать наследники
  abstract getCSSVariables(): Record<string, string>
  abstract getTailwindConfig(): Record<string, any>
  abstract getAnimationClasses(): Record<string, string>

  // Метод для применения дизайн-системы к DOM
  applyToDOM(): void {
    const root = document.documentElement
    const cssVars = this.getCSSVariables()
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    // Применяем анимации
    const animationClasses = this.getAnimationClasses()
    Object.entries(animationClasses).forEach(([key, value]) => {
      root.style.setProperty(`--animation-${key}`, value)
    })
  }

  // Метод для получения CSS переменных в формате для Tailwind
  getTailwindCSSVariables(): string {
    const cssVars = this.getCSSVariables()
    return Object.entries(cssVars)
      .map(([key, value]) => `--${key}: ${value};`)
      .join('\n')
  }
}
