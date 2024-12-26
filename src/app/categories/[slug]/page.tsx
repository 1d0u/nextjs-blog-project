import { categories } from '@/data/categories'
import { posts } from '@/data/posts'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { Post } from '@/types/blog'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

interface Category {
  slug: string
  name: string
  description?: string
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Simüle edilmiş async veri çekme
  const category = (await new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories.find((category) => category.slug === params.slug))
    }, 100)
  })) as Category | undefined

  if (!category) {
    notFound()
  }

  const categoryPosts = (await new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts.filter((post) => post.category.slug === params.slug))
    }, 100)
  })) as Post[]

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