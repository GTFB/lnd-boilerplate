export abstract class BaseDesignSystem {
  abstract name: string
  abstract description: string
  abstract version: string

  abstract applyStyles(): void
  abstract removeStyles(): void

  protected addCSSVariables(variables: Record<string, string>): void {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  protected removeCSSVariables(variables: string[]): void {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    variables.forEach(key => {
      root.style.removeProperty(key)
    })
  }

  protected addCSSClass(className: string): void {
    if (typeof document === 'undefined') return

    document.documentElement.classList.add(className)
  }

  protected removeCSSClass(className: string): void {
    if (typeof document === 'undefined') return

    document.documentElement.classList.remove(className)
  }
}
