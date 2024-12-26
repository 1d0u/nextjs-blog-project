import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { PrismaClient } from '@prisma/client'

interface CreatePostData {
  title: string
  content: string
  excerpt?: string
  featuredImage?: string
  published: boolean
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')

    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: user.id,
        ...(published === 'true' ? { published: true } : published === 'false' ? { published: false } : {})
      },
      include: {
        author: true,
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Posts fetch error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const json = await request.json()
    const { title, content, excerpt, featuredImage, published } = json as CreatePostData

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Slug oluştur
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Transaction kullanarak işlemleri atomik yap
    const post = await prisma.$transaction(async (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>) => {
      // Önce varsayılan kategoriyi oluştur veya bul
      const defaultCategory = await tx.category.upsert({
        where: { slug: 'genel' },
        update: {},
        create: {
          name: 'General',
          slug: 'general',
          description: 'General category'
        }
      })

      const post = await tx.post.create({
        data: {
          title,
          content,
          excerpt,
          slug,
          featuredImage,
          published: Boolean(published),
          authorId: user.id,
          categoryId: defaultCategory.id
        },
        include: {
          author: true,
          category: true
        }
      })

      return post
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Post creation error:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 