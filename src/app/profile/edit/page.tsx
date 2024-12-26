import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import EditProfileForm from '@/components/profile/EditProfileForm'

async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true
    }
  })
}

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  const user = await getUserProfile(session.user.id)

  if (!user) {
    redirect('/signin')
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
          <p className="mt-1 text-white/70">Update your profile information</p>
        </div>

        <div className="card p-6">
          <EditProfileForm user={user} />
        </div>
      </div>
    </main>
  )
} 