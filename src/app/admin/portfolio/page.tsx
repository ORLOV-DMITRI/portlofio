import { getAllProjects, getAllExperience, deleteProject, deleteExperience } from '@/lib/admin/portfolio-actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminPortfolioPage() {
  const [projects, experience] = await Promise.all([
    getAllProjects(),
    getAllExperience(),
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Портфолио</h1>
          <Link href="/admin">
            <Button variant="outline">Назад в дашборд</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Проекты */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Проекты</CardTitle>
                <CardDescription>Управление проектами портфолио</CardDescription>
              </div>
              <Link href="/admin/portfolio/projects/new">
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  + Новый проект
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Проектов пока нет. Добавьте первый!
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/portfolio/projects/${project.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                      </Link>
                      <form action={deleteProject.bind(null, project.id)}>
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          Удалить
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Опыт работы */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Опыт работы</CardTitle>
                <CardDescription>Управление местами работы</CardDescription>
              </div>
              <Link href="/admin/portfolio/experience/new">
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  + Новое место работы
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {experience.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Записей об опыте пока нет. Добавьте первую!
              </div>
            ) : (
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{exp.position}</h3>
                        <span className="text-muted-foreground">@ {exp.company}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exp.start_date).toLocaleDateString('ru-RU')} — {exp.end_date ? new Date(exp.end_date).toLocaleDateString('ru-RU') : 'Настоящее время'}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/portfolio/experience/${exp.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                      </Link>
                      <form action={deleteExperience.bind(null, exp.id)}>
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          Удалить
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
