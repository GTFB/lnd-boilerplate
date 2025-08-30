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
    <nav className="flex flex-col gap-2 text-sm relative h-full pl-0" aria-label="Documentation Navigation">
      {/* Поиск с кнопкой скрытия */}
      <div className="mb-2 flex items-center gap-2">
        <div className="flex-1">
          {searchComponent}
        </div>
        <button
          id="hide-sidebar-btn"
          title="Hide Sidebar"
          className="flex-shrink-0"
          aria-label="Hide navigation sidebar"
          aria-expanded="true"
          aria-controls="grid-container"
        >
          <PanelLeftClose size={16} className="mobile-hide" />
          <ChevronUp size={16} className="mobile-show" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pl-0">
        {isEmpty ? (
          <div className="text-xs text-muted-foreground" role="status" aria-live="polite">
            No navigation items. Check `_content/docs/navigation.json`.
          </div>
        ) : (
          <div className="space-y-3 -mt-2" role="tree" aria-label="Documentation sections">
            {tree.children.map((item, index) => {
              if (item.type === "folder" && item.children) {
                return (
                  <div key={item.$id} className="space-y-0" role="group" aria-labelledby={`section-${item.$id}`}>
                    {/* Заголовок раздела */}
                    <div 
                      id={`section-${item.$id}`}
                      className="py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-200"
                      role="heading"
                      aria-level={2}
                    >
                      {item.name}
                    </div>
                    {/* Подразделы */}
                    <div role="group" aria-label={`${item.name} pages`}>
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
                              aria-current={child.url === pathname ? 'page' : undefined}
                              role="treeitem"
                            >
                              {child.name}
                            </Link>
                          )
                        )
                      })}
                    </div>
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
                    aria-current={item.url === pathname ? 'page' : undefined}
                    role="treeitem"
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
    </nav>
  )
}

