export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featuredImage: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  author: {
    id: string
    name: string | null
    image: string | null
    email: string | null
  }
  category: {
    id: string
    name: string
    slug: string
  }
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
} 