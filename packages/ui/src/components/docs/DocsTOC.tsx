"use client"

import * as React from "react"
import { Menu } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const updateActiveItem = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header
      
      // Найти все заголовки на странице
      const headings = itemIds
        .map(id => document.getElementById(id))
        .filter(Boolean)
        .sort((a, b) => a!.offsetTop - b!.offsetTop)
      
      // Найти активный заголовок
      let current = null
      for (const heading of headings) {
        if (heading && heading.offsetTop <= scrollPosition) {
          current = heading.id
        } else {
          break
        }
      }
      
      setActiveId(current)
    }

    // Обновить при скролле
    const handleScroll = () => {
      requestAnimationFrame(updateActiveItem)
    }

    // Инициализация
    updateActiveItem()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [itemIds])

  return activeId
}

export interface DocsTOCProps {
  toc: {
    title?: React.ReactNode
    url: string
    depth: number
  }[]
  variant?: "dropdown" | "list"
  className?: string
}

export function DocsTOC({
  toc,
  variant = "list",
  className,
}: DocsTOCProps) {
  const [open, setOpen] = React.useState(false)
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  if (!toc?.length) {
    return null
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 md:h-7", className)}
          >
            <Menu className="h-4 w-4" />
            On This Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="no-scrollbar max-h-[70svh]"
        >
          {toc.map((item) => (
            <DropdownMenuItem
              key={item.url}
              asChild
              onClick={() => {
                setOpen(false)
              }}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              <a href={item.url}>{item.title}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 pl-4 text-sm relative h-full", className)}>
      <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs font-semibold uppercase tracking-wider z-20 pl-4">
        On This Page
      </p>

      {/* Градиент внизу для плавного перехода */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-8">
        {toc.map((item) => {
          const elementId = item.url.replace('#', '')
          const isActive = elementId === activeHeading
          
          return (
            <a
              key={item.url}
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(elementId)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className={cn(
                "block text-[0.8rem] no-underline transition-colors cursor-pointer text-left relative h-7 border-l border-muted-foreground/20 flex items-center",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-foreground font-semibold border-foreground",
                item.depth === 1 ? "pl-4" : item.depth === 2 ? "pl-8" : "pl-12"
              )}
            >
              {item.title}
            </a>
          )
        })}
      </div>
    </div>
  )
}
