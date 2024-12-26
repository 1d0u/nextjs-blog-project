import Image from 'next/image'
import Link from 'next/link'

// Placeholder görseller
const PLACEHOLDER_IMAGE = 'https://picsum.photos/1200/800'
const PLACEHOLDER_AVATAR = 'https://ui-avatars.com/api/?name=Author&size=40&background=random'

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    featuredImage: string | null
    createdAt: Date
    author: {
      name: string | null
      image: string | null
    }
    category: {
      name: string
      slug: string
    }
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-secondary rounded-lg shadow-card hover:shadow-card-hover transition-all overflow-hidden">
      <div className="relative h-48">
        <Link href={`/posts/${post.slug}`}>
          <Image
            src={post.featuredImage || PLACEHOLDER_IMAGE}
            alt={post.title}
            fill
            className="object-cover"
          />
        </Link>
      </div>
      <div className="p-6">
        {post.category && (
          <Link
            href={`/categories/${post.category.slug}`}
            className="inline-block mb-2"
          >
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-accent-purple/10 text-accent-purple">
              {post.category.name}
            </span>
          </Link>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-semibold text-text-primary hover:text-primary transition-colors mb-2">
            {post.title}
          </h2>
        </Link>
        {post.excerpt && (
          <p className="text-text-secondary mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="relative h-10 w-10">
              <Image
                className="rounded-full"
                src={post.author?.image || PLACEHOLDER_AVATAR}
                alt={post.author?.name || 'Author'}
                fill
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-text-primary">
              {post.author?.name}
            </p>
            <div className="flex space-x-1 text-sm text-text-secondary">
              <time dateTime={post.createdAt.toISOString()}>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 