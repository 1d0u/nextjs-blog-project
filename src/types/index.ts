import { Prisma } from '@prisma/client'

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  published: boolean
  featuredImage: string | null
  categoryId: string
  authorId: string
  createdAt: Date
  updatedAt: Date
}

export interface PostWithRelations extends Post {
  category: Category
  author: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  } | null
} 