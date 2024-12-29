import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Örnek bir admin kullanıcısı oluştur
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hash('password123', 12),
      role: 'admin',
    },
  })

  // Yazılım kategorisi oluştur
  const softwareCategory = await prisma.category.create({
    data: {
      name: 'Software Development',
      slug: 'software-development',
      description: 'Articles about software development and programming',
      color: '#3B82F6'
    },
  })

  // Örnek makaleler
  const articles = [
    {
      title: 'The Future of Artificial Intelligence in Software Development',
      slug: 'future-of-ai-in-software-development',
      content: `# The Future of Artificial Intelligence in Software Development

Artificial Intelligence (AI) is revolutionizing the way we develop software. From automated testing to intelligent code completion, AI is becoming an integral part of the development process.

![AI Programming](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## Key Areas of AI in Software Development

1. Automated Code Generation
2. Intelligent Testing
3. Bug Detection and Prevention
4. Performance Optimization
5. Development Process Automation

The integration of AI in software development is not just a trend but a fundamental shift in how we approach programming...`,
      excerpt: 'Exploring how AI is transforming the software development landscape',
      featuredImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      published: true,
    },
    {
      title: 'Clean Code Principles Every Developer Should Know',
      slug: 'clean-code-principles',
      content: `# Clean Code Principles Every Developer Should Know

Writing clean code is an essential skill for any software developer. It's not just about making the code work; it's about making it maintainable and readable.

![Clean Code](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## Key Principles

1. Keep It Simple
2. Write Meaningful Names
3. Functions Should Do One Thing
4. Comment Only When Necessary
5. Proper Error Handling

Clean code is not just about following rules; it's about creating a codebase that others can understand and maintain...`,
      excerpt: 'Essential principles for writing maintainable and clean code',
      featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      published: true,
    },
    {
      title: 'Modern Web Development with Next.js',
      slug: 'modern-web-development-nextjs',
      content: `# Modern Web Development with Next.js

Next.js has become one of the most popular frameworks for building modern web applications. Let's explore why it's gaining such traction.

![Next.js](https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## Benefits of Next.js

1. Server-Side Rendering
2. Static Site Generation
3. API Routes
4. Automatic Code Splitting
5. Built-in CSS Support

Next.js provides developers with the tools they need to build fast, scalable web applications...`,
      excerpt: 'A comprehensive guide to building modern web applications with Next.js',
      featuredImage: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      published: true,
    },
    {
      title: 'Understanding Docker Containers',
      slug: 'understanding-docker-containers',
      content: `# Understanding Docker Containers

Docker has revolutionized how we deploy and manage applications. Let's dive deep into container technology.

![Docker](https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## Key Concepts

1. Containers vs VMs
2. Docker Architecture
3. Dockerfile Basics
4. Container Orchestration
5. Best Practices

Docker containers provide a consistent environment across different stages of development...`,
      excerpt: 'A comprehensive guide to Docker containers and containerization',
      featuredImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      published: true,
    },
    {
      title: 'Mastering Git Version Control',
      slug: 'mastering-git-version-control',
      content: `# Mastering Git Version Control

Git is essential for modern software development. Learn how to use it effectively in your projects.

![Git](https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## Essential Git Concepts

1. Branching Strategies
2. Commit Best Practices
3. Merge vs Rebase
4. Git Workflow
5. Collaboration Tips

Understanding Git is crucial for working in team environments and managing code effectively...`,
      excerpt: 'Essential Git concepts and best practices for developers',
      featuredImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      published: true,
    },
  ]

  // Makaleleri veritabanına ekle
  for (const article of articles) {
    await prisma.post.create({
      data: {
        ...article,
        categoryId: softwareCategory.id,
        authorId: adminUser.id,
      },
    })
  }

  console.log('Seed data has been added successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 