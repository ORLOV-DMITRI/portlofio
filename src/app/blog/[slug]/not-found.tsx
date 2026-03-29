import { Header } from '@/components/landing'
import { Footer } from '@/components/landing'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="text-8xl mb-6">📭</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Пост не найден
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            К сожалению, статья по этому адресу не существует или была удалена.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={() => (window.location.href = '/blog')}
            >
              Вернуться к блогу
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = '/')}
            >
              На главную
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
