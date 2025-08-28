// Common types used across the UI package
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

export interface ComponentProps extends BaseProps {
  id?: string
  'data-testid'?: string
}

export interface ResponsiveProps {
  mobile?: boolean
  tablet?: boolean
  desktop?: boolean
}

export interface ThemeProps {
  theme?: 'light' | 'dark' | 'system'
}

export interface SizeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface ColorProps {
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'destructive'
}
