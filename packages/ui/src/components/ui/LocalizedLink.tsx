import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

interface LocalizedLinkProps {
  href: string
  children: ReactNode
  className?: string
  [key: string]: any
}

export function LocalizedLink({ href, children, className, ...props }: LocalizedLinkProps) {
  const params = useParams()
  const locale = params?.locale as string || 'en'
  
  const localizedHref = href.startsWith('/') ? `/${locale}${href}` : href
  
  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  )
}
