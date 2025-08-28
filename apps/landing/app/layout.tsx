"use client"
import { Inter, Inter_Tight } from 'next/font/google'
import '../styles/globals.css'
import { SidebarProvider, ThemeProvider } from '@lnd/ui/contexts'
import { DesignSystemProvider } from '@lnd/ui/design-systems/DesignSystemProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const interTight = Inter_Tight({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <DesignSystemProvider>
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </DesignSystemProvider>
      </body>
    </html>
  )
}