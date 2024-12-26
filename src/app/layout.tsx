import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { prisma } from '@/lib/prisma'
import Providers from '@/components/Providers'
import Header from '@/components/layout/Header'
import './globals.css'

export const metadata: Metadata = {
  title: '1d0u - Development and Technology Blog',
  description: 'Discover the latest insights, tutorials, and stories from the world of technology and development.',
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  return categories
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <div className="min-h-screen bg-background">
            <Header categories={categories} />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
