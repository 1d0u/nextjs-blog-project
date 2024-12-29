import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('You must be logged in to view dashboard statistics', { status: 401 })
    }

    const [totalPosts, totalCategories, publishedPosts, draftPosts] = await Promise.all([
      // Toplam post sayısı
      prisma.post.count(),
      
      // Toplam kategori sayısı
      prisma.category.count(),
      
      // Yayınlanmış post sayısı
      prisma.post.count({
        where: {
          published: true,
        },
      }),
      
      // Taslak post sayısı
      prisma.post.count({
        where: {
          published: false,
        },
      }),
    ])

    return NextResponse.json({
      totalPosts,
      totalCategories,
      publishedPosts,
      draftPosts,
    })
  } catch (error) {
    console.error('[DASHBOARD_STATS]', error)
    return new NextResponse('An error occurred while fetching dashboard statistics', { status: 500 })
  }
} 