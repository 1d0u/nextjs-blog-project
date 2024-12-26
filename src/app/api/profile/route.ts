import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse(
        JSON.stringify({ message: 'Authentication required' }),
        { status: 401 }
      )
    }

    const data = await request.json()
    const { name, bio, twitter, github } = data

    // Update user name
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name }
    })

    // Update or create profile
    await prisma.profile.upsert({
      where: { userId: session.user.id },
      create: {
        bio,
        twitter,
        github,
        userId: session.user.id
      },
      update: {
        bio,
        twitter,
        github
      }
    })

    return new NextResponse(
      JSON.stringify({ message: 'Profile updated successfully' }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Profile update error:', error)
    return new NextResponse(
      JSON.stringify({ message: 'An error occurred while updating profile' }),
      { status: 500 }
    )
  }
} 