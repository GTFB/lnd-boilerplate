'use client'

import { useEffect } from 'react'
import { useSidebar } from '../../contexts/SidebarContext'

interface TocUpdaterProps {
  tableOfContents: Array<{
    id: string
    title: string
    level: number
  }>
}

export function TocUpdater({ tableOfContents }: TocUpdaterProps) {
  const { setTableOfContents } = useSidebar()

  useEffect(() => {
    setTableOfContents(tableOfContents)
  }, [tableOfContents, setTableOfContents])

  return null
}
