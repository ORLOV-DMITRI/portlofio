'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ExperienceFormProps {
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
  initialData?: {
    id?: string
    company: string
    position: string
    start_date: string
    end_date: string | null
    description: string
    order: number
  }
  updateAction?: (id: string, formData: FormData) => Promise<{ error?: string; success?: boolean }>
}

export function ExperienceForm({ action, initialData, updateAction }: ExperienceFormProps) {
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
            <Label htmlFor="company">Компания *</Label>
            <Input
              id="company"
              name="company"
              placeholder="Tech Company"
              defaultValue={initialData?.company}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Должность *</Label>
            <Input
              id="position"
              name="position"
              placeholder="Senior Frontend Developer"
              defaultValue={initialData?.position}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Дата начала *</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              defaultValue={initialData?.start_date}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Дата окончания (если применимо)</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              defaultValue={initialData?.end_date ?? ''}
            />
            <p className="text-xs text-muted-foreground">
              Оставьте пустым для текущего места работы
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание *</Label>
            <textarea
              id="description"
              name="description"
              rows={6}
              className="w-full p-3 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Описание ваших обязанностей и достижений..."
              defaultValue={initialData?.description}
              required
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
          <Label>Превью записи</Label>
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-cyan-600 rounded-full" />
              <div>
                <h3 className="font-semibold">{initialData?.position || 'Должность'}</h3>
                <p className="text-cyan-400 text-sm">{initialData?.company || 'Компания'}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {new Date(initialData?.start_date || Date.now()).toLocaleDateString('ru-RU')} — {initialData?.end_date ? new Date(initialData.end_date).toLocaleDateString('ru-RU') : 'Настоящее время'}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {initialData?.description || 'Описание обязанностей и достижений...'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700"
        >
          {isEdit ? 'Сохранить изменения' : 'Добавить запись'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
