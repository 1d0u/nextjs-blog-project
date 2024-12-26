import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import CategoryForm from './CategoryForm'

export default async function CategoriesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/auth/signin')
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
      </div>

      {/* Mevcut Kategoriler */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Existing Categories</h2>
        <div className="grid gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-white truncate">{category.name}</h3>
                <p className="mt-0.5 text-sm text-white/70 line-clamp-1">{category.description}</p>
                <div className="mt-1 text-xs text-white/50">Slug: {category.slug}</div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="text-sm text-white/70 hover:text-white">Edit</button>
                <span className="text-white/40">·</span>
                <button className="text-sm text-red-400 hover:text-red-500">Delete</button>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="rounded-lg border border-white/[0.08] bg-white/5 p-4 text-center text-sm text-white/70">
              No categories found
            </div>
          )}
        </div>
      </div>

      {/* Yeni Kategori Formu */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Create New Category</h2>
        <CategoryForm />
      </div>
    </div>
  )
} 