import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import slugify from '@/lib/slugify'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('You must be logged in to perform this action', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user || user.role !== 'admin') {
      return new NextResponse('You do not have permission to perform this action', { status: 401 })
    }

    // İlgili kategorideki tüm postları ve kategoriyi sil
    await prisma.$transaction([
      // Önce kategoriye ait tüm postları sil
      prisma.post.deleteMany({
        where: {
          categoryId: params.id,
        },
      }),
      // Sonra kategoriyi sil
      prisma.category.delete({
        where: {
          id: params.id,
        },
      }),
    ])

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[CATEGORY_DELETE]', error)
    return new NextResponse('An error occurred while deleting the category', { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('You must be logged in to perform this action', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user || user.role !== 'admin') {
      return new NextResponse('You do not have permission to perform this action', { status: 401 })
    }

    const json = await request.json()
    const { name, description, color } = json
    const slug = slugify(name)

    if (!name) {
      return new NextResponse('Category name is required', { status: 400 })
    }

    // Slug'ın benzersiz olduğunu kontrol et (kendi ID'si hariç)
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug,
        NOT: {
          id: params.id,
        },
      },
    })

    if (existingCategory) {
      return new NextResponse('A category with this name already exists', { status: 400 })
    }

    const category = await prisma.category.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        slug,
        description,
        color,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_PUT]', error)
    return new NextResponse('An error occurred while updating the category', { status: 500 })
  }
} 