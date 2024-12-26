'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { 
  MoonIcon,
  HomeIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  Squares2X2Icon as DashboardIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

const navLinks = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon },
]

type HeaderProps = {
  categories?: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const currentCategory = searchParams?.get('category') ?? 'all'

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      router.push('/')
    } else {
      router.push(`/?category=${slug}`)
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* Top Section - Logo and Sign In (Fully Transparent) */}
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="py-8 flex h-16 items-center justify-between px-1">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A0D0F] font-semibold text-white shadow-lg shadow-black/20 backdrop-blur-md">
              1d0u
            </div>
            <span className="text-lg font-semibold text-white/90">Blog</span>
          </Link>

          <div className="flex items-center gap-4">
            <button 
              className="rounded-lg p-2 text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              <MoonIcon className="h-5 w-5" />
            </button>
            
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
                >
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-emerald-500/10">
                    {session.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || ''} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-6 w-6 text-emerald-500" />
                    )}
                  </div>
                  <span className="max-w-[120px] truncate">{session.user?.name}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/[0.08] bg-[#0A0D0F] p-1 shadow-lg z-[100]">
                    <Link
                      href="/profile"
                      className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <DashboardIcon className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <div className="my-1 border-t border-white/[0.08]"></div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/signin" 
                className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Menu and Controls (Dark Background) */}
      <div className="sticky top-0 z-50 w-full py-4">
        <div className="mx-auto w-full max-w-2xl px-4 space-y-4">
          <header className="w-full rounded-xl border-b border-white/[0.02] bg-[#0A0D0F]/80 backdrop-blur-md shadow-lg shadow-black/20">
            <div className="mx-auto px-4">
              <div className="flex h-14 items-center">
                <nav className="flex items-center gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group flex items-center gap-2 text-white/70 transition-all duration-200 hover:text-white"
                    >
                      <link.icon className="h-5 w-5 transition-opacity group-hover:opacity-100 opacity-70" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  )
} 