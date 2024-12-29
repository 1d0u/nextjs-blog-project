'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PostWithRelations } from '@/types'
import { TrashIcon, PencilIcon, EyeIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { useToast } from '@/components/ui/ToastContainer'
import Modal from '@/components/ui/Modal'
import NewPostForm from '@/components/post/NewPostForm'
import Link from 'next/link'

type Category = {
  id: string
  name: string
  slug: string
}

export default function PostsPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [posts, setPosts] = useState<PostWithRelations[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<PostWithRelations | null>(null)
  const [postToEdit, setPostToEdit] = useState<PostWithRelations | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Postları getir
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
      showToast('Failed to load posts', 'error')
    }
  }

  // Kategorileri getir
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      showToast('Failed to load categories', 'error')
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [])

  // Post silme modalını aç
  const handleDeleteClick = (post: PostWithRelations) => {
    setPostToDelete(post)
    setIsDeleteModalOpen(true)
  }

  // Post düzenleme modalını aç
  const handleEditClick = (post: PostWithRelations) => {
    setPostToEdit(post)
    setIsEditModalOpen(true)
  }

  // Post silme işlemi
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/posts/${postToDelete.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')

      setIsDeleteModalOpen(false)
      setPostToDelete(null)
      fetchPosts()
      router.refresh()
      showToast(`Post "${postToDelete.title}" has been deleted successfully`, 'success')
    } catch (error) {
      console.error('Error deleting post:', error)
      showToast('An error occurred while deleting the post', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="mt-1 text-white/60">Manage your blog posts</p>
        </div>
        <Link
          href="/dashboard/new"
          className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:scale-[1.02] border border-white/[0.08]"
        >
          Create New Post
        </Link>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group flex gap-6 rounded-xl border border-white/[0.08] bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-white/[0.12]"
          >
            <div className="relative aspect-[16/9] w-48 flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
                  <DocumentIcon className="h-8 w-8 text-white/40" />
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-white group-hover:text-white/90">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-1 text-sm text-white/60 group-hover:text-white/70 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${post.slug}`}
                    className="rounded-lg border border-white/[0.08] bg-white/5 p-2 text-white/80 transition-colors hover:bg-white/10"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleEditClick(post)}
                    className="rounded-lg border border-white/[0.08] bg-white/5 p-2 text-white/80 transition-colors hover:bg-white/10"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-500 transition-colors hover:bg-red-500/20"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-white/40">
                <span>
                  Status: <span className={post.published ? 'text-emerald-500' : 'text-orange-500'}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </span>
                {post.category && (
                  <span>
                    Category: <span className="text-white/60">{post.category.name}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="rounded-lg border border-white/[0.08] bg-white/5 p-8 text-center backdrop-blur-sm">
            <DocumentIcon className="mx-auto h-8 w-8 text-white/40" />
            <h3 className="mt-4 font-medium text-white">No posts yet</h3>
            <p className="mt-1 text-sm text-white/60">Get started by creating your first blog post</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Post"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-white/60">
            Are you sure you want to delete &quot;{postToDelete?.title}&quot;? This action cannot be undone.
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
      </Modal>

      {/* Edit Post Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setPostToEdit(null)
        }}
        title="Edit Post"
        size="lg"
      >
        {postToEdit && (
          <NewPostForm
            categories={categories}
            initialData={postToEdit}
            onSuccess={(updatedPost) => {
              setIsEditModalOpen(false)
              setPostToEdit(null)
              fetchPosts()
              showToast(`Post "${updatedPost.title}" has been updated successfully`, 'success')
            }}
          />
        )}
      </Modal>
    </div>
  )
} 