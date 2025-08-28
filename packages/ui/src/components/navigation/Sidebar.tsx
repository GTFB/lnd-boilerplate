import React from 'react'
import { NavLink } from './NavLink'

interface SidebarItem {
  title: string
  href: string
  children?: Array<{
    title: string
    href: string
  }>
}

interface SidebarProps {
  navItems: SidebarItem[]
  currentPath?: string
}

/**
 * Sidebar - Next.js style navigation sidebar component
 * 
 * Features:
 * - Next.js inspired design with proper section grouping
 * - Hierarchical navigation with nested items
 * - Active state detection with visual indicators
 * - Clean typography and spacing
 */
export function Sidebar({ navItems, currentPath = '' }: SidebarProps) {
  return (
    <nav className="space-y-8">
      {navItems.map((item) => (
        <div key={item.href} className="space-y-2">
          {/* Section header */}
          <div className="px-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {item.title}
            </h3>
          </div>
          
          {/* Section items */}
          {item.children && (
            <div className="space-y-1">
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  href={child.href}
                  active={currentPath === child.href}
                  nested
                >
                  {child.title}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}