import { getProjectById, updateProject } from '@/lib/admin/portfolio-actions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {ProjectForm} from "@/app/admin/portfolio/projects/ProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Редактирование проекта</h1>
          <Link href="/admin/portfolio">
            <Button variant="outline">Назад к списку</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Изменение проекта</CardTitle>
            <CardDescription>
              {project.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectForm
              action={async (formData: FormData) => {
                'use server'
                try {
                  await updateProject(id, formData)
                  return { success: true }
                } catch (error) {
                  return { error: error instanceof Error ? error.message : 'Ошибка' }
                }
              }}
              initialData={project}
              updateAction={updateProject}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
