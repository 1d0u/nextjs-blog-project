'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'An error occurred')
      }

      // Kayıt başarılı, direkt giriş yapalım
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard'
      })

      if (result?.error) {
        throw new Error('Failed to sign in')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/90">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/90">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
          placeholder="example@email.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white/90">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
          placeholder="••••••••"
          required
        />
      </div>

      <div className="flex items-center justify-end">
        <Link 
          href="/signin"
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          Already have an account? Sign in
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all duration-200 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
} 