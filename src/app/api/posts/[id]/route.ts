import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import slugify from '@/lib/slugify'

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return new NextResponse('Permission denied', { status: 401 })
    }

    const post = await prisma.post.findUnique({
      where: { id: context.params.id },
      include: {
        author: true,
        category: true,
      }
    })

    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    const json = await request.json()
    const { title, content, excerpt, categoryId, featuredImage, published } = json

    // Slug'ı güncelle
    const slug = slugify(title)

    // Slug'ın benzersiz olduğunu kontrol et (kendi ID'si hariç)
    const existingPost = await prisma.post.findFirst({
      where: {
        slug,
        NOT: {
          id: context.params.id
        }
      }
    })

    if (existingPost) {
      return new NextResponse('A post with this title already exists', { status: 400 })
    }

    const updatedPost = await prisma.post.update({
      where: { id: context.params.id },
      data: {
        title,
        slug,
        content,
        excerpt,
        categoryId,
        featuredImage,
        published,
      },
      include: {
        author: true,
        category: true,
      }
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Post update error:', error)
    return new NextResponse('Server error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return new NextResponse('Permission denied', { status: 401 })
    }

    const post = await prisma.post.findUnique({
      where: { id: context.params.id },
      select: { authorId: true }
    })

    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    await prisma.post.delete({
      where: { id: context.params.id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Post delete error:', error)
    return new NextResponse('Server error', { status: 500 })
  }
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: context.params.id },
      include: {
        author: true,
        category: true,
      }
    })

    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Post get error:', error)
    return new NextResponse('Server error', { status: 500 })
  }
} 