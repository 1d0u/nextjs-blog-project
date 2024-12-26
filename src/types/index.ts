import { Prisma } from '@prisma/client'

export type Post = Prisma.PostGetPayload<{
  include: {
    author: true
    category: true
  }
}>

export type User = Prisma.UserGetPayload<{}>
export type Category = Prisma.CategoryGetPayload<{}>

export interface PostWithRelations extends Post {
  author: User
  category: Category
} 