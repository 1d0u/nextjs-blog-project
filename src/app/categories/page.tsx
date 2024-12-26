import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true }
      }
    }
  })

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Categories
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {category.description}
              </p>
            )}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {category._count.posts} {category._count.posts === 1 ? 'post' : 'posts'}
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No categories found.
        </p>
      )}
    </div>
  )
} 