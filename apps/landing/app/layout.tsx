import '../styles/globals.css';
import '../styles/blog.css';
import { Inter, Inter_Tight } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light"
          storageKey="theme"
          enableSystem={false}
          themes={['light', 'dark']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}