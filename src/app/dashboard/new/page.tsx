import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import NewPostForm from '../../../components/post/NewPostForm'

export default async function NewPostPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/auth/signin')
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Create New Post</h1>
          <p className="mt-1 text-sm text-white/70">Write something awesome.</p>
        </div>

        <div className="card p-6">
          <NewPostForm categories={categories} />
        </div>
      </div>
    </main>
  )
} 