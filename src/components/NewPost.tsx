'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault()
    setIsSubmitting(true)

    const postData = {
      title,
      content,
      excerpt,
      featuredImage,
      published: !isDraft
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error('Gönderi oluşturulurken bir hata oluştu')
      }

      const result = await response.json()
      console.log('Server response:', result)

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Post creation error:', error)
      alert('Gönderi oluşturulurken bir hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        {/* Başlık ve Geri Butonu */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Yeni Post</h1>
            <p className="mt-1 text-sm text-white/70">Yeni bir post oluşturun.</p>
          </div>
          <Link 
            href="/dashboard" 
            className="glass-button"
          >
            <ArrowLeftIcon className="glass-icon" />
            <span className="glass-text ml-2">Geri Dön</span>
          </Link>
        </div>

        {/* Form */}
        <div className="card p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-white/90">
                  Başlık
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
                  placeholder="Post başlığı"
                  required
                />
              </div>

              <div>
                <label htmlFor="featuredImage" className="block text-sm font-medium text-white/90">
                  Kapak Görseli (URL)
                </label>
                <input
                  type="url"
                  id="featuredImage"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-white/90">
                  Özet
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-white/90 placeholder-white/40 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
                  placeholder="Post özeti"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  İçerik
                </label>
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  height={400}
                  preview="edit"
                  className="!bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, true)}
                className="glass-button"
              >
                <span className="glass-text">
                  {isSubmitting ? 'Kaydediliyor...' : 'Taslak Olarak Kaydet'}
                </span>
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, false)}
                className="rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all duration-200 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Yayınlanıyor...' : 'Yayınla'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default NewPost 