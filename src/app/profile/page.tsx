import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UserCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

async function getUserDetails(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: {
        orderBy: { createdAt: 'desc' },
        include: {
          category: true
        }
      },
      profile: true
    }
  })
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  const user = await getUserDetails(session.user.id)

  if (!user) {
    redirect('/signin')
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        {/* Profil Başlığı */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-emerald-500/10 ring-4 ring-white/10">
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={user.name || ''} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-16 w-16 text-emerald-500" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="mt-1 text-white/70">{user.email}</p>
            </div>
          </div>
          
          <Link
            href="/profile/edit"
            className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/10"
          >
            <PencilSquareIcon className="h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </div>

        {/* About */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-white">About</h2>
          <p className="mt-2 text-white/70">
            {user.profile?.bio || 'No biography added yet.'}
          </p>
        </div>

        {/* Social Media */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-white">Social Media</h2>
          <div className="mt-4 space-y-4">
            {user.profile?.twitter && (
              <a 
                href={`https://twitter.com/${user.profile.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span>@{user.profile.twitter}</span>
              </a>
            )}
            {user.profile?.github && (
              <a 
                href={`https://github.com/${user.profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>{user.profile.github}</span>
              </a>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-white">Posts</h2>
          <div className="mt-4 space-y-4">
            {user.posts.length > 0 ? (
              user.posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="block rounded-lg border border-white/[0.08] bg-white/5 p-4 transition-colors hover:bg-white/[0.07]"
                >
                  <h3 className="font-medium text-white">{post.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{post.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US')}</span>
                    <span>•</span>
                    <span>{post.category.name}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-white/70">No posts published yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 