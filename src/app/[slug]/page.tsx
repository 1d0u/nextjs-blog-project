import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PostWithRelations } from '@/types'
import { ArrowLeftIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import Markdown from '@/components/Markdown'
import CategoryBadge from '@/components/CategoryBadge'

const PLACEHOLDER_IMAGE = 'https://picsum.photos/1200/800'
const PLACEHOLDER_AVATAR = 'https://ui-avatars.com/api/?name=Author&size=40&background=random'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<PostWithRelations | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true
      }
    })

    if (!post) return null

    return post as PostWithRelations
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export const revalidate = 60

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-1">
      <article className="mx-auto w-full max-w-2xl px-4">
        {/* Back Button */}
        <Link 
          href="/" 
          className="group mb-6 inline-flex items-center gap-2 text-sm text-[#71717A] transition-colors hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        {/* Article Header */}
        <div className="mb-6">
          {post.category && (
            <CategoryBadge
              name={post.category.name}
              color={post.category.color}
              className="mb-3"
            />
          )}
          <h1 className="mb-3 text-2xl font-bold text-white">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-base text-[#71717A]">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Featured Image */}
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-xl bg-[#1C1C1C]">
          <Image
            src={post.featuredImage || PLACEHOLDER_IMAGE}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Meta Info */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src={post.author?.image || PLACEHOLDER_AVATAR}
                alt={post.author?.name || 'Yazar'}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {post.author?.name}
              </p>
              <time className="text-xs text-[#71717A]">
                {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="glass-button h-8 w-8 !p-0">
              <ShareIcon className="h-3.5 w-3.5 text-white/80" />
            </button>
            <button className="glass-button h-8 w-8 !p-0">
              <BookmarkIcon className="h-3.5 w-3.5 text-white/80" />
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="rounded-2xl bg-white/[0.02] backdrop-blur-sm p-6 shadow-lg">
            <div className="[&>*:first-child]:mt-0">
              <Markdown content={post.content} />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
} 