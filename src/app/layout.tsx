import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RootLayoutClient from './RootLayoutClient'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog Platform',
  description: 'A modern blog platform built with Next.js and MongoDB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen`}>
        <Providers>
          <main className="pattern-background min-h-screen">
            <RootLayoutClient>{children}</RootLayoutClient>
          </main>
        </Providers>
      </body>
    </html>
  )
}
