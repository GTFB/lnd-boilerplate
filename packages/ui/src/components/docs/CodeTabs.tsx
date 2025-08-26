"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export interface CodeTabsProps extends React.ComponentProps<typeof Tabs> {
  children: React.ReactNode
}

export function CodeTabs({ children, ...props }: CodeTabsProps) {
  const [activeTab, setActiveTab] = React.useState("cli")

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="relative mt-6 w-full"
      {...props}
    >
      {children}
    </Tabs>
  )
}

// Re-export tabs components with docs prefix to avoid conflicts
export { TabsList as DocsTabsList, TabsTrigger as DocsTabsTrigger, TabsContent as DocsTabsContent }
