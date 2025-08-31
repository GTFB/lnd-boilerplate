'use client'

import { useEffect } from 'react'
import { useSidebar } from '../../contexts/SidebarContext'

interface TocUpdaterProps {
  headings: Array<{
    id: string
    title: string
    level: number
  }>
}

export function TocUpdater({ headings }: TocUpdaterProps) {
  const { setTableOfContents } = useSidebar()

  useEffect(() => {
    setTableOfContents(headings)
  }, [headings, setTableOfContents])

  return null
}
