# 🚀 Деплой на Vercel

## Шаг 1: Подготовка

### 1.1. Проверь переменные окружения
Убедись, что в `.env.local` указаны правильные значения:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 1.2. Создай `.env.production` (опционально)
Для продакшена можно использовать отдельные ключи:

```bash
cp .env.local .env.production
```

---

## Шаг 2: Деплой через Vercel CLI

### 2.1. Установи Vercel CLI (если не установлен)

```bash
npm install -g vercel
```

### 2.2. Войди в аккаунт Vercel

```bash
vercel login
```

### 2.3. Задеплой проект

```bash
vercel
```

**Первый деплой:**
- Ответь `Y` на вопрос "Set up and deploy?"
- Выбери свой аккаунт
- Link to existing project → `N` (создаём новый)
- Введи имя проекта (например: `portfolio`)
- Root directory → `./` (оставить по умолчанию)
- Override settings → `N`

**Последующие деплои:**
```bash
vercel --prod
```

---

## Шаг 3: Деплой через GitHub (рекомендуется)

### 3.1. Запуш код в GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 3.2. Подключи репозиторий в Vercel

1. Открой https://vercel.com/new
2. Нажми **Import Git Repository**
3. Выбери свой репозиторий `portfolio`
4. Нажми **Import**

### 3.3. Настрой переменные окружения

В панели Vercel:
1. Project Settings → **Environment Variables**
2. Добавь переменные:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (только для Production)

### 3.4. Задеплой

Нажми **Deploy**

Vercel автоматически:
- Установит зависимости (`npm install`)
- Запустит сборку (`npm run build`)
- Задеплоит проект

---

## Шаг 4: Настройка домена (опционально)

### 4.1. Добавь домен в Vercel

1. Project Settings → **Domains**
2. Введи свой домен (например: `yourname.vercel.app` или кастомный)
3. Нажми **Add**

### 4.2. Настрой DNS (для кастомного домена)

Для домена типа `yourdomain.com`:
- **Type:** `A`
- **Name:** `@`
- **Value:** `76.76.21.21`

Для поддомена типа `www.yourdomain.com`:
- **Type:** `CNAME`
- **Name:** `www`
- **Value:** `cname.vercel.com`

---

## Шаг 5: Проверка

### 5.1. Проверь работу сайта

Открой ссылку которую предоставил Vercel:
```
https://your-project.vercel.app
```

### 5.2. Проверь админку

1. Открой `https://your-project.vercel.app/admin/login`
2. Войди под админом
3. Создай тестовый проект и пост
4. Проверь что они отображаются на главной

### 5.3. Проверь блог

1. Открой `https://your-project.vercel.app/blog`
2. Проверь что посты отображаются
3. Проверь что лайки работают

---

## 🔧 Полезные команды

### Деплой превью (для тестирования)
```bash
vercel
```

### Деплой в продакшен
```bash
vercel --prod
```

### Просмотр логов
```bash
vercel logs
```

### Логи в реальном времени
```bash
vercel logs --follow
```

### Открыть проект в браузере
```bash
vercel open
```

---

## ⚠️ Важные замечания

### 1. Supabase RLS политики
Убедись, что в Supabase настроены правильные RLS политики:
- ✅ Публичное чтение для `posts`, `projects`, `experience`
- ✅ Запись только для `admin` роли

### 2. Переменные окружения
- `NEXT_PUBLIC_*` — доступны на клиенте (публичные)
- `SUPABASE_SERVICE_ROLE_KEY` — **только на сервере** (секретный)

### 3. Пересборка при изменениях
Vercel автоматически пересобирает проект при:
- Push в ветку `main`
- Изменении переменных окружения
- Ручном триггере в панели Vercel

### 4. Кэширование
Для инвалидации кэша после деплоя:
```bash
vercel --prod --force
```

---

## 🎉 Готово!

Твой сайт доступен по адресу:
```
https://your-project.vercel.app
```

**Следующие шаги:**
- [ ] Настрой кастомный домен
- [ ] Добавь Google Analytics
- [ ] Настрой OG изображения для блога
- [ ] Добавь sitemap.xml
