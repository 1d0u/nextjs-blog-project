'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface RootLayoutClientProps {
  children: ReactNode
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col pt-16">
        <Header />
        <main className="flex-grow bg-gray-50 dark:bg-dark-900">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </SessionProvider>
  )
} 