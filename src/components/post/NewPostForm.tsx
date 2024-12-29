'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapImage from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
} from 'lucide-react'
import { PostWithRelations } from '@/types'

type Category = {
  id: string
  name: string
  slug: string
}

type NewPostFormProps = {
  categories: Category[]
  initialData?: PostWithRelations
  onSuccess?: (post: PostWithRelations) => void
}

export default function NewPostForm({ categories, initialData, onSuccess }: NewPostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '')
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState(initialData?.featuredImage || '')
  const [isPublished, setIsPublished] = useState(initialData?.published || false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const lowlight = createLowlight(common)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapImage.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert min-h-[500px] px-4 py-2 text-white/90 focus:outline-none',
      },
    },
  })

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFeaturedImage(file)
      setFeaturedImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editor) return

    setIsLoading(true)
    setError('')

    try {
      // Önce görseli yükleyelim
      let featuredImageUrl = featuredImagePreview
      if (featuredImage) {
        const formData = new FormData()
        formData.append('file', featuredImage)
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image')
        }

        const uploadData = await uploadResponse.json()
        featuredImageUrl = uploadData.url
      }

      // Post verilerini hazırlayalım
      const postData = {
        title,
        excerpt,
        content: editor.getHTML(),
        categoryId,
        featuredImage: featuredImageUrl,
        published: isPublished,
      }

      // Post oluştur veya güncelle
      const url = initialData ? `/api/posts/${initialData.id}` : '/api/posts'
      const method = initialData ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || `Failed to ${initialData ? 'update' : 'create'} post`)
      }

      const savedPost = await response.json()

      if (onSuccess) {
        onSuccess(savedPost)
      } else {
        router.push('/dashboard/posts')
        router.refresh()
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(`An error occurred while ${initialData ? 'updating' : 'creating'} the post`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Başlık */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white/90">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Özet */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-white/90">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
            placeholder="Enter post excerpt"
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-white/90">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Öne Çıkan Görsel */}
        <div>
          <label className="block text-sm font-medium text-white/90">
            Featured Image
          </label>
          <div className="mt-1">
            {featuredImagePreview ? (
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={featuredImagePreview}
                  alt="Featured image preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFeaturedImage(null)
                    setFeaturedImagePreview('')
                  }}
                  className="absolute right-2 top-2 rounded-lg bg-black/50 p-2 text-white/70 transition-colors hover:bg-black/70 hover:text-white"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-white/[0.08] bg-white/5 hover:border-white/20">
                <div className="space-y-1 text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-white/40" />
                  <div className="text-sm text-white/70">
                    <span>Upload a file</span> or drag and drop
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFeaturedImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* İçerik Editörü */}
        <div>
          <label className="block text-sm font-medium text-white/90">
            Content
          </label>
          <div className="prose-toolbar mt-1 flex items-center gap-1 rounded-t-lg border border-white/[0.08] bg-white/5 p-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded p-2 hover:bg-white/10 ${
                editor.isActive('bold') ? 'bg-white/10' : ''
              }`}
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`rounded p-2 hover:bg-white/10 ${
                editor.isActive('italic') ? 'bg-white/10' : ''
              }`}
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`rounded p-2 hover:bg-white/10 ${
                editor.isActive('bulletList') ? 'bg-white/10' : ''
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`rounded p-2 hover:bg-white/10 ${
                editor.isActive('orderedList') ? 'bg-white/10' : ''
              }`}
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`rounded p-2 hover:bg-white/10 ${
                editor.isActive('heading', { level: 2 }) ? 'bg-white/10' : ''
              }`}
            >
              <Heading2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`rounded p-2 hover:bg-white/10 ${
                editor.isActive('blockquote') ? 'bg-white/10' : ''
              }`}
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`rounded p-2 hover:bg-white/10 ${
                editor.isActive('codeBlock') ? 'bg-white/10' : ''
              }`}
            >
              <Code className="h-4 w-4" />
            </button>
          </div>
          <div className="rounded-b-lg border border-t-0 border-white/[0.08] bg-white/5">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Yayınlama Durumu */}
        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 rounded border-white/[0.08] bg-white/5 text-blue-500 focus:ring-0 focus:ring-offset-0"
          />
          <label htmlFor="published" className="ml-2 text-sm text-white/90">
            Publish this post
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-blue-500/90 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  )
} 