'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  FolderIcon, 
  PlusIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalPosts: number
  totalCategories: number
  publishedPosts: number
  draftPosts: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalCategories: 0,
    publishedPosts: 0,
    draftPosts: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      }
    }

    fetchStats()
  }, [])

  const quickActions = [
    {
      title: 'New Post',
      description: 'Create a new blog post',
      icon: PlusIcon,
      href: '/dashboard/new',
      iconColor: 'text-emerald-500'
    },
    {
      title: 'All Posts',
      description: 'Manage your blog posts',
      icon: DocumentTextIcon,
      href: '/dashboard/posts',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Categories',
      description: 'Manage post categories',
      icon: FolderIcon,
      href: '/dashboard/categories',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Profile',
      description: 'Update your profile',
      icon: UserIcon,
      href: '/dashboard/profile',
      iconColor: 'text-orange-500'
    },
    {
      title: 'Analytics',
      description: 'View blog statistics',
      icon: ChartBarIcon,
      href: '/dashboard/analytics',
      iconColor: 'text-pink-500'
    },
    {
      title: 'Settings',
      description: 'Configure your blog',
      icon: Cog6ToothIcon,
      href: '/dashboard/settings',
      iconColor: 'text-indigo-500'
    }
  ]

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-white/60">Manage your blog content and settings</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-white/[0.08] bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium text-white">Total Posts</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">{stats.totalPosts}</p>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <FolderIcon className="h-5 w-5 text-purple-500" />
            <h3 className="font-medium text-white">Categories</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">{stats.totalCategories}</p>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="h-5 w-5 text-emerald-500" />
            <h3 className="font-medium text-white">Published</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">{stats.publishedPosts}</p>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="h-5 w-5 text-orange-500" />
            <h3 className="font-medium text-white">Drafts</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">{stats.draftPosts}</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-start gap-4 rounded-lg border border-white/[0.08] bg-white/5 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.12] hover:scale-[1.02]"
            >
              <div className={`mt-1 rounded-lg bg-white/5 p-2 ring-1 ring-white/[0.08] ${action.iconColor}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white group-hover:text-white/90">{action.title}</h3>
                <p className="mt-1 text-sm text-white/60 group-hover:text-white/70">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 