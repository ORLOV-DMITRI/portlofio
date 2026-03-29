import { getPostBySlug, getRelatedPosts } from '@/lib/blog/actions'
import { Header } from '@/components/landing'
import { Footer } from '@/components/landing'
import { MarkdownContent } from '@/components/blog/MarkdownContent'
import { notFound } from 'next/navigation'
import { LikeButton } from './LikeButton'
import { BackButton } from './BackButton'
import type { Metadata } from 'next'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Пост не найден',
    }
  }

  return {
    title: `${post.title} | Блог`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.created_at,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  const related = await getRelatedPosts(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Навигация назад */}
          <div className="mb-8">
            <BackButton />
          </div>

          {/* Заголовок и мета */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>

              <div className="flex items-center gap-2">
                <LikeButton postId={post.id} initialCount={post.likes_count} />
              </div>
            </div>
          </header>

          {/* Контент */}
          <div className="prose prose-invert prose-violet max-w-none">
            <MarkdownContent content={post.content} />
          </div>

          {/* Навигация между постами */}
          {(related.prev || related.next) && (
            <nav className="mt-16 pt-8 border-t border-border">
              <div className="grid md:grid-cols-2 gap-4">
                {related.prev && (
                  <Link
                    href={`/blog/${related.prev.slug}`}
                    className="p-4 bg-card border border-border rounded-lg hover:border-cyan-500/50 transition-colors group block"
                  >
                    <div className="text-sm text-muted-foreground mb-1">← Предыдущая</div>
                    <div className="font-medium group-hover:text-cyan-400 transition-colors">
                      {related.prev.title}
                    </div>
                  </Link>
                )}

                {related.next && (
                  <Link
                    href={`/blog/${related.next.slug}`}
                    className="p-4 bg-card border border-border rounded-lg hover:border-cyan-500/50 transition-colors group block md:ml-auto"
                  >
                    <div className="text-sm text-muted-foreground mb-1">Следующая →</div>
                    <div className="font-medium group-hover:text-cyan-400 transition-colors">
                      {related.next.title}
                    </div>
                  </Link>
                )}
              </div>
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
