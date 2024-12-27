'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CategoryForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })

      if (!response.ok) throw new Error('Failed to create category')

      router.refresh()
      setName('')
      setDescription('')
    } catch (error) {
      console.error('Error creating category:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/90">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white/90">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all duration-200 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating...' : 'Create Category'}
      </button>
    </form>
  )
} 