import { getExperienceById, updateExperience } from '@/lib/admin/portfolio-actions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {ExperienceForm} from "@/app/admin/portfolio/experience/ExperienceForm";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = await params
  const experience = await getExperienceById(id)

  if (!experience) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Редактирование записи</h1>
          <Link href="/admin/portfolio">
            <Button variant="outline">Назад к списку</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Изменение опыта работы</CardTitle>
            <CardDescription>
              {experience.position} @ {experience.company}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExperienceForm
              action={async (formData: FormData) => {
                'use server'
                try {
                  await updateExperience(id, formData)
                  return { success: true }
                } catch (error) {
                  return { error: error instanceof Error ? error.message : 'Ошибка' }
                }
              }}
              initialData={experience}
              updateAction={updateExperience}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
