"use client"
import { Inter, Inter_Tight } from 'next/font/google'
import '../styles/globals.css'
import '../styles/blog.css'
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
    <html lang="en" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning={true}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent flickering on page load
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
                  const isDark = theme === 'dark';
                  
                  // Apply theme only to documentElement
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = 'hsl(0 0% 0%)';
                    document.documentElement.style.color = 'hsl(0 0% 98%)';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = 'hsl(0 0% 100%)';
                    document.documentElement.style.color = 'hsl(222.2 84% 4.9%)';
                  }
                  
                  // Apply styles to body after its creation
                  if (document.body) {
                    if (isDark) {
                      document.body.style.backgroundColor = 'hsl(0 0% 0%)';
                      document.body.style.color = 'hsl(0 0% 98%)';
                    } else {
                      document.body.style.backgroundColor = 'hsl(0 0% 100%)';
                      document.body.style.color = 'hsl(222.2 84% 4.9%)';
                    }
                  }
                } catch (e) {
                  console.warn('Failed to apply theme on load:', e);
                }
              })();
            `,
          }}
        />
      </head>
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