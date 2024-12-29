'use client'

import { useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
}

const styles = {
  success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  error: 'border-red-500/20 bg-red-500/10 text-red-500',
  info: 'border-blue-500/20 bg-blue-500/10 text-blue-500',
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm ${styles[type]} animate-slide-up`}
      role="alert"
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto rounded-lg p-1 transition-colors hover:bg-white/10"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  )
} 