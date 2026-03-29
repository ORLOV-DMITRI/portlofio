import { createExperience } from '@/lib/admin/portfolio-actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {ExperienceForm} from "@/app/admin/portfolio/experience/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Новое место работы</h1>
          <Link href="/admin/portfolio">
            <Button variant="outline">Назад к списку</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Добавление опыта работы</CardTitle>
            <CardDescription>
              Добавьте новую запись об опыте работы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExperienceForm action={createExperience} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
