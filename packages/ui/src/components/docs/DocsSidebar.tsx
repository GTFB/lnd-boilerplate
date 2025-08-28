"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PanelLeftClose, ChevronUp } from "lucide-react"

export interface DocsSidebarProps {
  tree: {
    children: Array<{
      $id: string
      name: string
      type: "folder" | "page"
      children?: Array<{
        $id: string
        name: string
        type: "folder" | "page"
        url: string
      }>
      url?: string
    }>
  }
  searchComponent?: React.ReactNode
}

export function DocsSidebar({ tree, searchComponent }: DocsSidebarProps) {
  const pathname = usePathname()

  const isEmpty = !tree?.children || tree.children.length === 0

  return (
    <div className="flex flex-col gap-2 text-sm relative h-full pl-0">
      {/* Поиск с кнопкой скрытия */}
      <div className="mb-2 flex items-center gap-2">
        <div className="flex-1">
          {searchComponent}
        </div>
        <button
          id="hide-sidebar-btn"
          title="Hide Sidebar"
          className="flex-shrink-0"
        >
          <PanelLeftClose size={16} className="mobile-hide" />
          <ChevronUp size={16} className="mobile-show" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pl-0">
        {isEmpty ? (
          <div className="text-xs text-muted-foreground">No navigation items. Check `_content/docs/navigation.json`.</div>
        ) : (
          <div className="space-y-3 -mt-2">
            {tree.children.map((item, index) => {
              if (item.type === "folder" && item.children) {
                return (
                  <div key={item.$id} className="space-y-0">
                    {/* Заголовок раздела */}
                    <div className="py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-200">
                      {item.name}
                    </div>
                    {/* Подразделы */}
                    {item.children.map((child, childIndex) => {
                      return (
                        child.type === "page" && (
                          <Link
                            key={`${item.$id}-${childIndex}`}
                            href={child.url}
                            className={`
                              block pl-0 py-2 text-sm transition-all duration-200 mt-0 transform hover:translate-x-1
                              ${child.url === pathname 
                                ? 'bg-accent text-accent-foreground' 
                                : 'text-muted-foreground hover:text-foreground'
                              }
                            `}
                          >
                            {child.name}
                          </Link>
                        )
                      )
                    })}
                  </div>
                )
              } else if (item.type === "page") {
                return (
                  <Link
                    key={item.$id}
                    href={item.url || '#'}
                    className={`
                      block pl-0 py-2 text-sm transition-all duration-200 transform hover:translate-x-1
                      ${item.url === pathname 
                        ? 'bg-accent text-accent-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                )
              }
              return null
            })}
          </div>
        )}
      </div>
    </div>
  )
}

