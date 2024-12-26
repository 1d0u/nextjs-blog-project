import { posts } from '@/data/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/blog'
import ThemeSwitcher from '@/components/ThemeSwitcher'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: PageProps) {
  const findPost = async () => {
    await Promise.resolve()
    return posts.find((post) => post.slug === params.slug)
  }

  const post = await findPost()

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ThemeSwitcher />
      {/* Hero Section */}
      <div className="relative h-96 w-full mb-8">
        <Image
          src={post.featuredImage || '/images/placeholder.jpg'}
          alt={post.title}
          fill
          className="object-cover rounded-lg shadow-xl"
          priority
        />
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <Link
          href={`/categories/${post.category.slug}`}
          className="inline-block mb-4"
        >
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-accent-500/10 dark:bg-accent-500/20 text-accent-500 dark:text-accent-300">
            {post.category.name}
          </span>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-accent-500 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="relative h-10 w-10">
              <Image
                className="rounded-full ring-2 ring-accent-500/20"
                src={post.author.image || '/images/placeholder-avatar.jpg'}
                alt={post.author.name}
                fill
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-text-light">
              {post.author.name}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500 dark:text-text-secondary">
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
        <p className="text-gray-500 dark:text-text-secondary text-lg mb-8">
          {post.excerpt}
        </p>
        <div className="text-gray-900 dark:text-text-primary whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      {/* Article Footer */}
      <div className="mt-16 border-t border-gray-200 dark:border-dark-700 pt-8">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-accent-500 hover:text-accent-400 transition-colors duration-200"
          >
            ← Ana Sayfaya Dön
          </Link>
          <div className="flex space-x-4">
            <button className="text-text-muted hover:text-text-secondary transition-colors duration-200">
              Paylaş
            </button>
            <button className="text-text-muted hover:text-text-secondary transition-colors duration-200">
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </article>
  )
} 