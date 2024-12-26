import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Technology',
    slug: 'technology',
    description: 'Latest news and articles about software, hardware, and technology.',
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Content about healthy living, personal development, and lifestyle.',
  },
  {
    name: 'Travel',
    slug: 'travel',
    description: 'Travel guides, recommendations, and experiences from around the world.',
  },
]

async function main() {
  try {
    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: category,
        create: category,
      })
    }
    console.log('Seed completed!')
  } catch (error) {
    console.error('Seed error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 