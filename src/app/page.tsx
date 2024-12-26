import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import PostCard from '@/components/blog/PostCard'
import { posts } from '@/data/posts'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-gray-50 dark:bg-dark-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Latest Posts
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
              Read our latest articles and tutorials
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Features />
    </>
  )
}
