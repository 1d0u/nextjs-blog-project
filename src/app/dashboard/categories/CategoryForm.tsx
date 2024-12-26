'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CategoryForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          slug,
          description,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create category')
      }

      // Formu temizle
      setName('')
      setSlug('')
      setDescription('')

      // Kategorileri yeniden yükle
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
    <div>
      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/90">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
            placeholder="Enter category name"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-white/90">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
            placeholder="enter-category-slug"
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
            placeholder="Enter category description"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all duration-200 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  )
} 