'use client'

import { useState } from 'react'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'

type BookmarkButtonProps = {
  postId: string
}

export default function BookmarkButton({ postId }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-black/20 p-2 text-white/70 backdrop-blur-lg transition-colors hover:bg-black/30 hover:text-white"
    >
      {isBookmarked ? (
        <BookmarkIconSolid className="h-5 w-5" />
      ) : (
        <BookmarkIcon className="h-5 w-5" />
      )}
    </button>
  )
} 