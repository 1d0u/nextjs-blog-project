export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
    image?: string;
  };
  category: {
    name: string;
    slug: string;
  };
  publishedAt: string;
  readingTime: string;
} 