import { getAllPosts, deletePost } from '@/lib/admin/posts-actions'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminDashboardPage() {
  const posts = await getAllPosts()
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, role')
    .eq('id', user?.id)
    .single()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Админ-панель</h1>
            <nav className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="ghost" size="sm">Дашборд</Button>
              </Link>
              <Link href="/admin/posts/new">
                <Button variant="ghost" size="sm">Посты</Button>
              </Link>
              <Link href="/admin/portfolio">
                <Button variant="ghost" size="sm">Портфолио</Button>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {profile?.username} ({profile?.role})
            </span>
            <form action="/auth/signout" method="POST">
              <Button type="submit" variant="outline" size="sm">
                Выйти
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Статистика */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Всего постов</CardTitle>
              <CardDescription>Опубликованные и черновики</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Опубликовано</CardTitle>
              <CardDescription>Видимые на сайте</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {posts.filter(p => p.published).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Черновики</CardTitle>
              <CardDescription>Не опубликованы</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {posts.filter(p => !p.published).length}
              </div>
            </CardContent>
          </Card>

          <Link href="/admin/portfolio">
            <Card className="cursor-pointer hover:border-cyan-500/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Портфолио</CardTitle>
                <CardDescription>Проекты и опыт</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">→</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Список постов */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Посты</CardTitle>
                <CardDescription>Управление статьями блога</CardDescription>
              </div>
              <Link href="/admin/posts/new">
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  + Новый пост
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Постов пока нет. Создайте первый!
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{post.title}</h3>
                        {post.published ? (
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">
                            Опубликовано
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-xs rounded-full">
                            Черновик
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Slug: {post.slug} • {new Date(post.created_at).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                      </Link>
                      <form action={deletePost.bind(null, post.id)}>
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
