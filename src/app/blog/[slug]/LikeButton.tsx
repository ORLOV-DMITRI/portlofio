'use client'

import { useState, useOptimistic } from 'react'
import { Button } from '@/components/ui/button'
import { likePost } from '@/lib/blog/actions'

interface LikeButtonProps {
  postId: string
  initialCount: number
}

export function LikeButton({ postId, initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount)
  const [hasLiked, setHasLiked] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleLike = async () => {
    if (hasLiked || isPending) return

    setIsPending(true)
    setHasLiked(true)
    setCount((prev) => prev + 1)

    // Получаем IP (в реальности лучше использовать серверный IP)
    const ipAddress = await getIPAddress()

    const result = await likePost(postId, ipAddress)

    if (result.error) {
      setHasLiked(false)
      setCount((prev) => prev - 1)
      alert(result.error)
    }

    setIsPending(false)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      disabled={hasLiked || isPending}
      className={`gap-2 transition-all ${
        hasLiked
          ? 'bg-cyan-600 border-cyan-600 text-white'
          : 'border-border hover:border-cyan-500 hover:text-cyan-400'
      }`}
    >
      <span className={hasLiked ? 'animate-pulse' : ''}>
        {hasLiked ? '❤️' : '🤍'}
      </span>
      <span>{count}</span>
    </Button>
  )
}

async function getIPAddress(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch {
    // Fallback: используем случайный ID
    return `unknown-${Math.random().toString(36).substring(7)}`
  }
}
