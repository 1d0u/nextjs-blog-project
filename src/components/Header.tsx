'use client'

import Link from 'next/link'

const navigation = [
  { name: 'Latest Posts', href: '/posts', icon: '📝' },
  { name: 'Categories', href: '/categories', icon: '📚' },
  { name: 'Authors', href: '/authors', icon: '👥' },
  { name: 'About', href: '/about', icon: 'ℹ️' },
]

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-text-primary font-semibold text-xl">DevBlog</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-secondary/50 rounded-full backdrop-blur-sm px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm text-text-primary hover:text-primary rounded-full transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="hidden md:flex items-center space-x-1 bg-secondary/50 hover:bg-secondary px-4 py-1.5 rounded-full text-sm text-text-primary transition-colors"
            >
              <span>Sign in</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 