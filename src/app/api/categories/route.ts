import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import slugify from '@/lib/slugify'

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
    const { name, description, color } = json
    const slug = slugify(name)

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    // Slug'ın benzersiz olduğunu kontrol et
    const existingCategory = await prisma.category.findUnique({
      where: {
        slug,
      },
    })

    if (existingCategory) {
      return new NextResponse('A category with this name already exists', { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        color: color || '#FF5733', // Varsayılan renk
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORIES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 