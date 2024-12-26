'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Post } from '@/types/blog'

export default function DashboardClient() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [activeTab, setActiveTab] = useState<'published' | 'drafts'>('published')
  const [deletingPosts, setDeletingPosts] = useState<Record<string, boolean>>({})

  const deletePost = async (postId: string) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      return
    }

    setDeletingPosts(prev => ({ ...prev, [postId]: true }))
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId))
      } else {
        alert('Yazı silinirken bir hata oluştu.')
      }
    } catch (error) {
      console.error('Post silme hatası:', error)
      alert('Yazı silinirken bir hata oluştu.')
    } finally {
      setDeletingPosts(prev => ({ ...prev, [postId]: false }))
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const published = activeTab === 'published' ? 'true' : 'false'
        const response = await fetch(`/api/posts?published=${published}`)
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error('Posts fetch error:', error)
      }
    }

    fetchPosts()
  }, [activeTab])

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('published')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'published'
                ? 'border-accent-500 text-accent-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Published Posts
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'drafts'
                ? 'border-accent-500 text-accent-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Drafts
          </button>
        </nav>
      </div>

      {/* Action Buttons */}
      <div className="mb-6">
        <Link
          href="/new-post"
          className="inline-flex items-center px-4 py-2 border border-transparent 
                   rounded-md shadow-sm text-sm font-medium text-white 
                   bg-accent-500 hover:bg-accent-400 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-accent-500"
        >
          Create New Post
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-white dark:bg-dark-800 shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-dark-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${post.published
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link
                      href={`/edit-post/${post.slug}`}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      disabled={deletingPosts[post.id]}
                      className={`text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 
                        ${deletingPosts[post.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {deletingPosts[post.id] ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {activeTab === 'published' 
              ? 'Henüz yayınlanmış yazınız bulunmuyor.' 
              : 'Henüz taslak yazınız bulunmuyor.'}
          </p>
          <Link
            href="/new-post"
            className="text-accent-500 hover:text-accent-400"
          >
            İlk yazınızı oluşturun
          </Link>
        </div>
      )}
    </div>
  )
} 