"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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

  return (
    <div className="flex flex-col gap-2 p-4 pt-0 pl-0 text-sm relative h-full">
      {/* Поиск */}
      {searchComponent && (
        <div className="sticky top-0 z-20 bg-background pb-2">
          {searchComponent}
        </div>
      )}
      
      <h3 className="text-muted-foreground bg-background sticky top-0 h-6 text-xs font-semibold uppercase tracking-wider z-20 pl-2">
        DOCUMENTATION
      </h3>

      {/* Градиент внизу для плавного перехода */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-8">
        <div className="pl-2">
          {tree.children.map((item) => {
            if (item.type === "folder" && item.children) {
              return (
                <div key={item.$id} className="space-y-1">
                  {/* Заголовок раздела */}
                  <div className="px-3 py-2 text-sm font-medium text-foreground">
                    {item.name}
                  </div>
                  {/* Подразделы */}
                  {item.children.map((child) => {
                    return (
                      child.type === "page" && (
                        <Link
                          key={child.url}
                          href={child.url}
                          className={`
                            block px-3 py-2 text-sm rounded-md transition-colors text-left ml-4
                            ${child.url === pathname 
                              ? 'bg-accent text-accent-foreground' 
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
                  key={item.url}
                  href={item.url || '#'}
                  className={`
                    block px-3 py-2 text-sm rounded-md transition-colors text-left
                    ${item.url === pathname 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
      </div>
    </div>
  )
}
