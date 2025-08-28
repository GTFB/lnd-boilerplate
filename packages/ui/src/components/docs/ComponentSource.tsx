"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { CopyButton } from "./CopyButton"

export interface ComponentSourceProps extends React.ComponentProps<"div"> {
  name?: string
  src?: string
  title?: string
  language?: string
  collapsible?: boolean
}

export function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
}: ComponentSourceProps) {
  const [code, setCode] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchCode = async () => {
      try {
        if (name) {
          // This would fetch from your component registry
          const response = await fetch(`/api/components/${name}`)
          const data = await response.text()
          setCode(data)
        } else if (src) {
          const response = await fetch(src)
          const data = await response.text()
          setCode(data)
        }
      } catch (error) {
        console.error("Failed to fetch code:", error)
        setCode("// Code not available")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCode()
  }, [name, src])

  if (isLoading) {
    return (
      <div className={cn("relative", className)}>
        <div className="animate-pulse rounded-md bg-muted h-32" />
      </div>
    )
  }

  if (!code) {
    return null
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx"

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={code}
          language={lang}
          title={title}
        />
      </div>
    )
  }

  return (
    <CollapsibleCode className={className}>
      <ComponentCode
        code={code}
        language={lang}
        title={title}
      />
    </CollapsibleCode>
  )
}

function ComponentCode({
  code,
  language,
  title,
}: {
  code: string
  language: string
  title: string | undefined
}) {
  return (
    <figure className="[&>pre]:max-h-96">
      {title && (
        <figcaption className="text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton value={code} />
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </figure>
  )
}

function CollapsibleCode({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border p-2 text-sm"
      >
        <span>Show code</span>
        <span className={cn("transition-transform", isOpen && "rotate-180")}>
          ▼
        </span>
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  )
}

function getIconForLanguageExtension(language: string) {
  // This would return appropriate icons for different languages
  return <span className="text-xs">{language}</span>
}
