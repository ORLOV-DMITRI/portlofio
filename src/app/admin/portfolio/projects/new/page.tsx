import { createProject } from '@/lib/admin/portfolio-actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {ProjectForm} from "@/app/admin/portfolio/projects/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Новый проект</h1>
          <Link href="/admin/portfolio">
            <Button variant="outline">Назад к списку</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Создание проекта</CardTitle>
            <CardDescription>
              Добавьте новый проект в портфолио
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectForm action={createProject} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
