import { getPublishedPosts } from '@/lib/blog/actions'
import Link from 'next/link'
import { Header } from '@/components/landing'
import { Footer } from '@/components/landing'

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Блог
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Статьи о frontend-разработке, технологиях и лучшем опыте
            </p>
          </div>

          {/* Список постов */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-muted-foreground text-lg">
                Постов пока нет. Загляните позже!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="h-full p-6 bg-card border border-border rounded-xl hover:border-cyan-500/50 transition-all duration-300">
                    {/* Обложка (плейсхолдер) */}
                    <div className="h-40 -mx-6 -mt-6 mb-4 bg-gradient-to-br from-cyan-600/20 to-teal-600/20 flex items-center justify-center">
                      <span className="text-5xl">📄</span>
                    </div>

                    {/* Мета-данные */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      {post.likes_count > 0 && (
                        <span className="flex items-center gap-1">
                          ❤️ {post.likes_count}
                        </span>
                      )}
                    </div>

                    {/* Заголовок */}
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Превью */}
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt || 'Читать далее...'}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
