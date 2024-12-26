import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TagIcon } from '@heroicons/react/24/outline'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!user) {
    redirect('/auth/signin')
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/categories"
              className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              <TagIcon className="h-4 w-4" />
              Categories
            </Link>
            <Link
              href="/dashboard/new"
              className="flex items-center gap-1 rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all duration-200 hover:bg-emerald-500"
            >
              New Post
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/70">You haven't created any posts yet.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="card">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-white">{post.title}</h2>
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${post.published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-white/70">{post.category.name}</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/dashboard/edit/${post.id}`}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        Edit
                      </a>
                      <span className="text-white/40">·</span>
                      <button
                        className="text-sm text-red-400 hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
} 