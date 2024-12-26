import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const [session, params] = await Promise.all([
      getServerSession(authOptions),
      context.params
    ])
    
    if (!session) {
      return new NextResponse('Permission denied', { status: 401 })
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: { authorId: true }
    })

    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    if (post.authorId !== session.user.id) {
      return new NextResponse('Permission denied', { status: 403 })
    }

    await prisma.post.delete({
      where: { id: params.id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Post delete error:', error)
    return new NextResponse('Server error', { status: 500 })
  }
} 