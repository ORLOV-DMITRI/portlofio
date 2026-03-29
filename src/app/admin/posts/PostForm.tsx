'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { MarkdownContent } from '@/components/blog/MarkdownContent'

interface PostFormProps {
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
  initialData?: {
    id?: string
    title: string
    slug: string
    content: string
    excerpt: string
    published: boolean
  }
  updateAction?: (id: string, formData: FormData) => Promise<{ error?: string; success?: boolean }>
}

export function PostForm({ action, initialData, updateAction }: PostFormProps) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  
  const isEdit = !!initialData?.id

  const handleSubmit = async (formData: FormData) => {
    setError('')
    
    const result = isEdit && updateAction
      ? await updateAction(initialData.id!, formData)
      : await action(formData)
    
    if (result.error) {
      setError(result.error)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Введите заголовок"
              defaultValue={initialData?.title}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="my-first-post"
              defaultValue={initialData?.slug}
              required
            />
            <p className="text-xs text-muted-foreground">
              Латиница, цифры и дефисы. Например: my-awesome-post
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Краткое описание</Label>
            <Input
              id="excerpt"
              name="excerpt"
              placeholder="Краткое описание для превью"
              defaultValue={initialData?.excerpt}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              defaultChecked={initialData?.published}
              className="w-4 h-4 rounded border-border"
            />
            <Label htmlFor="published" className="cursor-pointer">
              Опубликовать сразу
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Превью Markdown</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Скрыть' : 'Показать'}
            </Button>
          </div>
          <Card className="p-4 h-64 overflow-auto">
            {showPreview ? (
              <div className="prose prose-invert max-w-none">
                <MarkdownContent content={`# Заголовок\n\nВаш контент здесь...\n\n\`\`\`javascript\n// Код\n\`\`\``} />
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Нажмите &quot;Показать&quot; для просмотра превью
              </p>
            )}
          </Card>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Контент (Markdown) *</Label>
        <textarea
          id="content"
          name="content"
          rows={20}
          className="w-full min-h-[400px] p-4 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
          defaultValue={initialData?.content}
          placeholder="# Заголовок&#10;&#10;Ваш контент в формате Markdown..."
          required
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700"
        >
          {isEdit ? 'Сохранить изменения' : 'Создать пост'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
