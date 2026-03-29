import { createClient } from '@/lib/supabase/server'

export default async function TestDbPage() {
  const supabase = await createClient()
  
  // Тест подключения к БД
  const { data: tables, error } = await supabase
    .from('posts')
    .select('count')
    .limit(1)

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">🧪 Тест подключения к Supabase</h1>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Статус подключения:</h2>
          {error ? (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-destructive">❌ Ошибка подключения</p>
              <pre className="mt-2 text-sm opacity-80">{error.message}</pre>
            </div>
          ) : (
            <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
              <p className="text-green-500">✅ Подключение успешно!</p>
              <p className="text-sm opacity-80 mt-1">
                Таблица posts доступна для запросов
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Следующие шаги:</h2>
          <ol className="list-decimal list-inside space-y-1 opacity-80">
            <li>Применить миграцию из supabase/migrations/001_initial_schema.sql</li>
            <li>Создать админского пользователя</li>
            <li>Перейти к Этапу 3: Landing Page</li>
          </ol>
        </div>

        <div className="pt-4">
          <a 
            href="/" 
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            ← На главную
          </a>
        </div>
      </div>
    </div>
  )
}
