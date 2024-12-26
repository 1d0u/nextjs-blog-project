'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function SignInButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
      >
        Sign out
      </button>
    )
  }

  return (
    <Link
      href="/auth/signin"
      className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
    >
      Sign in
    </Link>
  )
} 