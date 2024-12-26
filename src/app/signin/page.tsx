import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import SignInForm from '@/components/auth/SignInForm'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-md px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-sm text-white/70">Sign in to your account</p>
        </div>

        <div className="card p-6">
          <SignInForm />
        </div>
      </div>
    </main>
  )
} 