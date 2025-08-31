'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function useCurrentPath() {
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setCurrentPath(pathname)
  }, [pathname])

  return currentPath
}
