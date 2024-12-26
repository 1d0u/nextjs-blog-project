'use client'

import { useState } from 'react'
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

type Category = {
  id: string
  name: string
  slug: string
}

type NewPostFormProps = {
  categories: Category[]
}

export default function NewPostForm({ categories }: NewPostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState('')
  const [isPublished, setIsPublished] = useState(false)
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
    content: '',
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
      let featuredImageUrl = ''
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

      // Şimdi postu oluşturalım
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          excerpt,
          content: editor.getHTML(),
          categoryId,
          featuredImage: featuredImageUrl,
          published: isPublished,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create post')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An error occurred while creating the post')
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
          <div className="mt-1 rounded-lg border border-white/[0.08] bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="border-b border-white/[0.08] p-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-white/5 ${editor.isActive('bold') ? 'text-white' : 'text-white/70'}`}
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-white/5 ${editor.isActive('italic') ? 'text-white' : 'text-white/70'}`}
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-white/5 ${editor.isActive('bulletList') ? 'text-white' : 'text-white/70'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-white/5 ${editor.isActive('orderedList') ? 'text-white' : 'text-white/70'}`}
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-white/5 ${editor.isActive('heading', { level: 2 }) ? 'text-white' : 'text-white/70'}`}
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-white/5 ${editor.isActive('blockquote') ? 'text-white' : 'text-white/70'}`}
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded hover:bg-white/5 ${editor.isActive('codeBlock') ? 'text-white' : 'text-white/70'}`}
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={async () => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*'
                  input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) {
                      const formData = new FormData()
                      formData.append('file', file)
                      
                      try {
                        const uploadResponse = await fetch('/api/upload', {
                          method: 'POST',
                          body: formData,
                        })

                        if (!uploadResponse.ok) {
                          throw new Error('Failed to upload image')
                        }

                        const uploadData = await uploadResponse.json()
                        editor.chain().focus().setImage({ src: uploadData.url }).run()
                      } catch (error) {
                        console.error('Error uploading image:', error)
                      }
                    }
                  }
                  input.click()
                }}
                className="p-2 rounded hover:bg-white/5 text-white/70"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = window.prompt('Enter URL')
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run()
                  }
                }}
                className={`p-2 rounded hover:bg-white/5 ${editor.isActive('link') ? 'text-white' : 'text-white/70'}`}
              >
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      {/* Alt Kısım - Yayınlama Seçenekleri */}
      <div className="flex items-center justify-between border-t border-white/[0.08] pt-6">
        <div className="flex items-center gap-4">
          <select
            value={isPublished ? 'published' : 'draft'}
            onChange={(e) => setIsPublished(e.target.value === 'published')}
            className="rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
          >
            <option value="draft">Save as Draft</option>
            <option value="published">Publish Now</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all duration-200 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  )
} 