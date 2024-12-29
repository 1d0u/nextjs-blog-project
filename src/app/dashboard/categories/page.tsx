'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CategoryForm from './CategoryForm'
import CategoryBadge from '@/components/CategoryBadge'
import { Category } from '@/types'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useToast } from '@/components/ui/ToastContainer'

export default function CategoriesPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Kategorileri getir
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Sayfa yüklendiğinde kategorileri getir
  useEffect(() => {
    fetchCategories()
  }, [])

  // Kategori silme modalını aç
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category)
    setIsDeleteModalOpen(true)
  }

  // Kategori silme işlemi
  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/categories/${categoryToDelete.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete category')

      setIsDeleteModalOpen(false)
      setCategoryToDelete(null)
      fetchCategories()
      router.refresh()
      showToast(`Category "${categoryToDelete.name}" has been deleted successfully`, 'success')
    } catch (error) {
      console.error('Error deleting category:', error)
      showToast('An error occurred while deleting the category', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Kategori düzenleme modalını aç
  const handleEditClick = (category: Category) => {
    setCategoryToEdit(category)
    // Kısa bir gecikme ile scroll işlemini yap
    setTimeout(() => {
      const editForm = document.getElementById('editCategoryForm')
      if (editForm) {
        const windowHeight = window.innerHeight
        const formRect = editForm.getBoundingClientRect()
        const scrollTo = window.scrollY + formRect.top - (windowHeight - formRect.height) / 2
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">Categories</h1>
        {categoryToEdit ? (
          <div id="editCategoryForm" className="rounded-lg border border-white/[0.08] bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-medium text-white mb-4">Edit Category</h2>
            <CategoryForm
              category={categoryToEdit}
              onSuccess={() => {
                setCategoryToEdit(null)
                fetchCategories()
                showToast(`Category "${categoryToEdit.name}" has been updated successfully`, 'success')
              }}
              onCancel={() => setCategoryToEdit(null)}
            />
          </div>
        ) : (
          <CategoryForm 
            onSuccess={(category) => {
              fetchCategories()
              showToast(`Category "${category.name}" has been created successfully`, 'success')
            }} 
          />
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Existing Categories</h2>
        <div className="grid gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <CategoryBadge name={category.name} color={category.color} />
                {category.description && (
                  <p className="text-sm text-white/60">{category.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(category)}
                  className="rounded-lg border border-white/[0.08] bg-white/5 p-2 text-white/80 transition-colors hover:bg-white/10"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(category)}
                  className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-500 transition-colors hover:bg-red-500/20"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-white/[0.08] bg-[#1C1C1C] p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium text-white">Delete Category</h3>
            <p className="mb-6 text-white/60">
              Are you sure you want to delete &quot;{categoryToDelete?.name}&quot;? This will also delete all posts in this category.
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="rounded-lg bg-red-500/90 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 