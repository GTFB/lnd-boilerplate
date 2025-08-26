"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

export interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [value])

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100",
        className
      )}
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">Copy code</span>
    </Button>
  )
}
