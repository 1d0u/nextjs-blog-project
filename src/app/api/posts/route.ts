import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import slugify from '@/lib/slugify'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        category: true,
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('[POSTS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await request.json()
    const { title, content, excerpt, categoryId, featuredImage, published } = json

    if (!title) {
      return new NextResponse('Title is required', { status: 400 })
    }

    if (!content) {
      return new NextResponse('Content is required', { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse('Category is required', { status: 400 })
    }

    // Slug oluştur
    const slug = slugify(title)

    // Slug'ın benzersiz olduğunu kontrol et
    const existingPost = await prisma.post.findUnique({
      where: {
        slug,
      },
    })

    if (existingPost) {
      return new NextResponse('A post with this title already exists', { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        categoryId,
        featuredImage,
        published,
        authorId: user.id,
      },
      include: {
        author: true,
        category: true,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('[POSTS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 