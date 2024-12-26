import { prisma } from '@/lib/prisma'
import HomeClient from '@/components/home/HomeClient'

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const category = searchParams.category

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(category && { category: { slug: category } }),
    },
    include: {
      author: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const categories = await prisma.category.findMany()

  return <HomeClient posts={posts} categories={categories} />
}
