'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDownIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import BookmarkButton from '@/components/BookmarkButton'

const PLACEHOLDER_IMAGE = 'https://picsum.photos/800/400'
const PLACEHOLDER_AVATAR = 'https://api.dicebear.com/7.x/initials/svg'

// Category colors
const categoryColors: { [key: string]: string } = {
  'Starter Kit': 'bg-blue-500/10 text-blue-500',
  'UI Components': 'bg-purple-500/10 text-purple-500',
  'AI Tools': 'bg-emerald-500/10 text-emerald-500',
  default: 'bg-orange-500/10 text-orange-500'
}

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  author: {
    name: string | null
    image: string | null
  }
  category: {
    name: string
  }
}

type Category = {
  id: string
  name: string
  slug: string
}

type HomeClientProps = {
  posts: Post[]
  categories: Category[]
}

export default function HomeClient({ posts, categories }: HomeClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams?.get('category') ?? 'all'

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      router.push('/')
    } else {
      router.push(`/?category=${slug}`)
    }
  }

  const getAvatarUrl = (author: { name: string | null; image: string | null }) => {
    const name = author.name || 'Anonymous'
    if (author.image) return author.image
    return `${PLACEHOLDER_AVATAR}?seed=${encodeURIComponent(name)}&backgroundColor=2563eb&color=ffffff`
  }

  return (
    <main className="flex-1">
      {/* Controls */}
      <div className="mx-auto w-full max-w-2xl px-4 mt-2 mb-6">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="select-container">
            <select 
              className="select-button"
              value={currentCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
          </div>

          <div className="flex items-center gap-3">
            <button className="glass-button h-10 px-4">
              <AdjustmentsHorizontalIcon className="glass-icon" />
              <span className="glass-text ml-2">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-4 px-4 pb-16">
        {posts.map((post) => (
          <Link key={post.id} href={`/${post.slug}`} className="block group">
            <article className="card h-full">
              <div className="relative h-32 w-full overflow-hidden rounded-lg bg-[#1C1C1C]">
                <Image
                  src={post.featuredImage || PLACEHOLDER_IMAGE}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute right-2 top-2">
                  <BookmarkButton postId={post.id} />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 overflow-hidden rounded-full bg-white/5">
                    <Image
                      src={getAvatarUrl(post.author)}
                      alt={post.author.name || 'Anonymous'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-white/70">{post.author.name || 'Anonymous'}</span>
                </div>
                <h2 className="mt-2 text-lg font-medium text-white line-clamp-1">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-white/70 line-clamp-2">{post.excerpt}</p>
                <div className="mt-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category.name] || categoryColors.default}`}>
                    {post.category.name}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
} 