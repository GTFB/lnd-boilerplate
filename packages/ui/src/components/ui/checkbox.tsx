'use client'

import React from 'react'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
                  className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
          {...props}
        />
        {checked && (
          <div className="absolute top-0 left-0 h-4 w-4 text-primary-foreground pointer-events-none flex items-center justify-center">
            ✓
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
