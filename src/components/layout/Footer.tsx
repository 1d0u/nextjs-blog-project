'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const Footer = () => {
  const [year, setYear] = useState('')

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">About Us</h3>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              A modern and user-friendly blog platform. Share your thoughts, discuss, and discover.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/blog" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/contact" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-dark-800 pt-8">
          <p className="text-base text-gray-400 dark:text-gray-500 text-center">
            &copy; {year} Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 