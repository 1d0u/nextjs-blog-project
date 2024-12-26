import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { Post } from '@/types/blog'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug }
  })
}

async function getCategoryPosts(categoryId: string) {
  const posts = await prisma.post.findMany({
    where: { 
      categoryId,
      published: true 
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        }
      },
      category: {
        select: {
          name: true,
          slug: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return posts.map(post => ({
    ...post,
    publishedAt: post.createdAt.toISOString(),
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const categoryPosts = await getCategoryPosts(category.id)

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {category.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {category.description}
        </p>
      </div>

      <div className="grid gap-8">
        {categoryPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {categoryPosts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Bu kategoride henüz yazı bulunmuyor.
        </p>
      )}
    </div>
  )
} 