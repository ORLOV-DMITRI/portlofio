'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProjectFormProps {
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean; project?: any }>
  initialData?: {
    id?: string
    title: string
    description: string
    tech_stack: string[]
    image_url: string
    demo_url: string | null
    repo_url: string | null
    order: number
  }
  updateAction?: (id: string, formData: FormData) => Promise<{ error?: string; success?: boolean }>
}

export function ProjectForm({ action, initialData, updateAction }: ProjectFormProps) {
  const router = useRouter()
  
  const isEdit = !!initialData?.id

  const handleSubmit = async (formData: FormData) => {
    const result = isEdit && updateAction
      ? await updateAction(initialData.id!, formData)
      : await action(formData)

    if (result.error) {
      alert('Ошибка: ' + result.error)
    } else {
      router.push('/admin/portfolio')
      router.refresh()
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название проекта *</Label>
            <Input
              id="title"
              name="title"
              placeholder="My Awesome Project"
              defaultValue={initialData?.title}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание *</Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full p-3 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Краткое описание проекта..."
              defaultValue={initialData?.description}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack">Технологии (через запятую)</Label>
            <Input
              id="techStack"
              name="techStack"
              placeholder="React, Next.js, TypeScript"
              defaultValue={initialData?.tech_stack?.join(', ')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL изображения</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              placeholder="/projects/project-1.jpg"
              defaultValue={initialData?.image_url}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demoUrl">Demo URL</Label>
            <Input
              id="demoUrl"
              name="demoUrl"
              placeholder="https://..."
              defaultValue={initialData?.demo_url || ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repoUrl">GitHub URL</Label>
            <Input
              id="repoUrl"
              name="repoUrl"
              placeholder="https://github.com/..."
              defaultValue={initialData?.repo_url || ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Порядок отображения</Label>
            <Input
              id="order"
              name="order"
              type="number"
              defaultValue={initialData?.order || 0}
            />
          </div>
        </div>

        {/* Превью */}
        <div className="space-y-4">
          <Label>Превью карточки</Label>
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="h-40 bg-gradient-to-br from-cyan-600/20 to-teal-600/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">📁</span>
            </div>
            <h3 className="font-semibold mb-2">{initialData?.title || 'Название проекта'}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {initialData?.description || 'Описание проекта...'}
            </p>
            <div className="flex flex-wrap gap-2">
              {(initialData?.tech_stack || ['React', 'Next.js']).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-cyan-600/10 text-cyan-400 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700"
        >
          {isEdit ? 'Сохранить изменения' : 'Создать проект'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
