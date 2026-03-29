import { getPostById, updatePost } from '@/lib/admin/posts-actions'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {PostForm} from "@/app/admin/posts/PostForm";

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Редактирование поста</h1>
          <Link href="/admin">
            <Button variant="outline">Назад к списку</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PostForm
          action={async (formData: FormData) => {
            'use server'
            try {
              await updatePost(id, formData)
              return { success: true }
            } catch (error) {
              return { error: error instanceof Error ? error.message : 'Ошибка' }
            }
          }}
          initialData={post}
          updateAction={updatePost}
        />
      </main>
    </div>
  )
}
