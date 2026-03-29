'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function BackButton() {
  const router = useRouter()
  
  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/blog')}
      className="text-muted-foreground hover:text-cyan-400"
    >
      ← Назад к блогу
    </Button>
  )
}
