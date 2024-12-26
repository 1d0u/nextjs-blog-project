import Link from 'next/link'
import { categories } from '@/data/categories'

export default function CategoriesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Categories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {category.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {category.description}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{category.postCount} posts</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 