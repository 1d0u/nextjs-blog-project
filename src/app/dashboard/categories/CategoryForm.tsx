'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CategoryBadge from '@/components/CategoryBadge'
import { Category } from '@/types'

const PRESET_COLORS = [
  '#3B82F6', // Mavi
  '#10B981', // Yeşil
  '#F97316', // Turuncu
  '#8B5CF6', // Mor
  '#EF4444', // Kırmızı
  '#EC4899', // Pembe
  '#F59E0B', // Sarı
  '#6366F1', // İndigo
]

interface CategoryFormProps {
  onSuccess?: (category: Category) => void
  category?: Category
  onCancel?: () => void
}

export default function CategoryForm({ onSuccess, category, onCancel }: CategoryFormProps) {
  const router = useRouter()
  const [name, setName] = useState(category?.name || '')
  const [description, setDescription] = useState(category?.description || '')
  const [color, setColor] = useState(category?.color || PRESET_COLORS[0])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setDescription(category.description || '')
      setColor(category.color)
    }
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = category ? `/api/categories/${category.id}` : '/api/categories'
      const method = category ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, color }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save category')
      }

      const savedCategory = await response.json()

      router.refresh()
      if (!category) {
        setName('')
        setDescription('')
        setColor(PRESET_COLORS[0])
      }
      onSuccess?.(savedCategory)
    } catch (error) {
      console.error('Error saving category:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-3 mb-4">
          {PRESET_COLORS.map((presetColor) => (
            <button
              key={presetColor}
              type="button"
              onClick={() => setColor(presetColor)}
              className={`w-8 h-8 rounded-full transition-all duration-200 ${
                color === presetColor ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1C1C1C]' : ''
              }`}
              style={{ backgroundColor: presetColor }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-9 w-9 rounded-lg border border-white/[0.08] bg-white/5 p-1"
          />
          <CategoryBadge name="Preview" color={color} />
        </div>
      </div>

      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            onCancel ? 'flex-1 bg-emerald-500/90 hover:bg-emerald-500' : 'w-full bg-emerald-500/90 hover:bg-emerald-500'
          }`}
        >
          {isLoading ? (category ? 'Saving...' : 'Creating...') : (category ? 'Save Changes' : 'Create Category')}
        </button>
      </div>
    </form>
  )
} 