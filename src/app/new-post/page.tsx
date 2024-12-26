import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NewPost from '@/components/NewPost'
import { authOptions } from '@/lib/auth'

export default async function NewPostPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  return <NewPost />
} 