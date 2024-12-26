'use client'

import { Post } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const DEFAULT_IMAGE = 'https://picsum.photos/1200/800'
  const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=Author&size=40&background=random'
  
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white dark:bg-dark-800 hover:dark:bg-dark-700 transition-all duration-300">
      <div className="flex-shrink-0">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 w-full">
            <Image
              className="object-cover"
              src={post.featuredImage || DEFAULT_IMAGE}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <Link
            href={`/categories/${post.category.slug}`}
            className="inline-block"
          >
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-accent-500/10 text-accent-500">
              {post.category.name}
            </span>
          </Link>
          <Link href={`/blog/${post.slug}`} className="mt-2 block group">
            <p className="text-xl font-semibold text-accent-500 group-hover:text-accent-400 transition-colors">{post.title}</p>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{post.excerpt}</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div className="relative h-10 w-10">
              <Image
                className="rounded-full"
                src={post.author.image || DEFAULT_AVATAR}
                alt={post.author.name}
                fill
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author.name}</p>
            <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
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
    </div>
  )
}

export default PostCard 