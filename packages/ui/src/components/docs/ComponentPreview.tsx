"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface ComponentPreviewProps extends React.ComponentProps<"div"> {
  name: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
}

export function ComponentPreview({
  name,
  type,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  // Placeholder component for now
  const Component = React.lazy(() => Promise.resolve({ 
    default: () => (
      <div className="p-4 border rounded-md bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Component preview for <code className="bg-muted px-1 rounded">{name}</code>
        </p>
      </div>
    )
  }))

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1">
        <div className="bg-background absolute inset-0 hidden w-[1600px] md:block">
          <iframe src={`/view/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group relative my-4 flex flex-col space-y-2",
        {
          "items-center": align === "center",
          "items-start": align === "start",
          "items-end": align === "end",
        },
        className
      )}
      {...props}
    >
      <div className="preview flex min-h-[350px] w-full items-center justify-center p-10 border rounded-md bg-muted/50">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component />
        </React.Suspense>
      </div>
    </div>
  )
}
