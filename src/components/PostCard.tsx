import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types/blog'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/${post.slug}`}>
      <article className="card group overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="relative w-full md:w-48 h-48 flex-shrink-0">
            <Image
              src={post.featuredImage || '/images/placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-accent-500/10 dark:bg-accent-500/20 text-accent-500 dark:text-accent-300">
                {post.category.name}
              </span>
              <span className="text-sm text-text-muted">
                {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-accent-500 mb-2 group-hover:text-accent-500 dark:group-hover:text-accent-400 transition-colors duration-200">
              {post.title}
            </h2>
            <p className="text-gray-500 dark:text-text-secondary mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-auto flex items-center">
              <div className="relative h-8 w-8">
                <Image
                  className="rounded-full ring-2 ring-accent-500/20"
                  src={post.author.image || '/images/placeholder-avatar.jpg'}
                  alt={post.author.name}
                  fill
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-text-light">
                  {post.author.name}
                </p>
                <p className="text-sm text-text-muted">{post.readingTime}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
} 