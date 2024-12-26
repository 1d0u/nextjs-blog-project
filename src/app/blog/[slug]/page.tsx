import { posts } from '@/data/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/blog'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

async function getPost(slug: string): Promise<Post | undefined> {
  // Simüle edilmiş async veri çekme
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find((post) => post.slug === slug)
      resolve(post)
    }, 100)
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-96 w-full mb-8">
        <Image
          src={post.featuredImage || '/images/placeholder.jpg'}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <Link
          href={`/categories/${post.category.slug}`}
          className="inline-block mb-4"
        >
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
            {post.category.name}
          </span>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="relative h-10 w-10">
              <Image
                className="rounded-full"
                src={post.author.image || '/images/placeholder-avatar.jpg'}
                alt={post.author.name}
                fill
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author.name}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
          {post.excerpt}
        </p>
        <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      {/* Article Footer */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            ← Ana Sayfaya Dön
          </Link>
          <div className="flex space-x-4">
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              Paylaş
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </article>
  )
} 