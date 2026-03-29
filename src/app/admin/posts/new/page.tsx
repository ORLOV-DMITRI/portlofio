import { createPost } from '@/lib/admin/posts-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import {PostForm} from "@/app/admin/posts/PostForm";

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Новый пост</h1>
          <Link href="/admin">
            <Button variant="outline">Назад к списку</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Создание поста</CardTitle>
            <CardDescription>
              Заполните информацию о новой статье
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PostForm action={createPost} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
