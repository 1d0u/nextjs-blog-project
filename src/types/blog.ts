export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  author: {
    id: string;
    name: string;
    image?: string;
  };
  publishedAt: string;
  readingTime: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
} 