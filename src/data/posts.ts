import { Post } from '@/types/blog'

export const posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js and TypeScript',
    slug: 'getting-started-with-nextjs-and-typescript',
    excerpt: 'Learn how to build modern web applications with Next.js and TypeScript. We\'ll cover the basics and best practices.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    author: {
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    category: {
      name: 'Development',
      slug: 'development',
    },
    publishedAt: '2024-01-10T10:00:00Z',
    readingTime: '5 min read',
  },
  {
    id: '2',
    title: 'Building a Blog with MongoDB and Next.js',
    slug: 'building-a-blog-with-mongodb-and-nextjs',
    excerpt: 'Step by step guide to create a full-featured blog using MongoDB as the database and Next.js for the frontend.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    author: {
      name: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    category: {
      name: 'Tutorial',
      slug: 'tutorial',
    },
    publishedAt: '2024-01-09T15:30:00Z',
    readingTime: '8 min read',
  },
  {
    id: '3',
    title: 'Modern CSS Techniques You Should Know',
    slug: 'modern-css-techniques-you-should-know',
    excerpt: 'Explore the latest CSS features and techniques that will improve your web development workflow.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2',
    author: {
      name: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    category: {
      name: 'CSS',
      slug: 'css',
    },
    publishedAt: '2024-01-08T09:15:00Z',
    readingTime: '6 min read',
  },
] 