# Инструкция по настройке Supabase

## 1. Применение миграции БД

### Вариант A: Через SQL Editor в Supabase Dashboard

1. Открой https://supabase.com и выбери свой проект
2. Перейди в **SQL Editor** (в левом меню)
3. Нажми **New Query**
4. Скопируй содержимое файла `supabase/migrations/001_initial_schema.sql`
5. Вставь в SQL Editor и нажми **Run**

После выполнения будут созданы:
- ✅ Таблица `profiles` — профили пользователей
- ✅ Таблица `posts` — блог посты
- ✅ Таблица `projects` — проекты портфолио
- ✅ Таблица `experience` — опыт работы
- ✅ Таблица `likes` — лайки постов
- ✅ Триггеры и RLS политики

---

## 2. Создание админского пользователя

После применения миграции нужно создать первого админа.

### Шаг 2.1: Создай пользователя через Authentication

1. В Supabase Dashboard перейди в **Authentication** → **Users**
2. Нажми **Add User**
3. Введи:
   - Email: `admin@portfolio.local` (или твой email)
   - Password: `admin123` (или надёжный пароль)
4. Нажми **Add User**

### Шаг 2.2: Назначь роль admin

После создания пользователя, выполни SQL запрос:

```sql
-- Замени UUID на реальный ID созданного пользователя
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'UUID-ПОЛЬЗОВАТЕЛЯ-ИЗ-AUTH';
```

**Как узнать UUID:**
1. В **Authentication** → **Users** найди созданного пользователя
2. Скопируй его **User ID** (UUID формат)
3. Вставь в запрос выше

### Альтернативный способ (через SQL):

```sql
-- Создаём админа напрямую (если нужно)
INSERT INTO auth.users (
  instance_id, 
  id, 
  aud, 
  role, 
  email, 
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@portfolio.local',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"username":"admin","role":"admin"}',
  NOW(),
  NOW()
);
```

---

## 3. Проверка настроек

### Проверка таблиц

Выполни SQL запрос:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

Должны отобразиться: `profiles`, `posts`, `projects`, `experience`, `likes`

### Проверка админа

```sql
SELECT p.id, p.username, p.role, au.email
FROM profiles p
JOIN auth.users au ON p.id = au.id
WHERE p.role = 'admin';
```

---

## 4. Переменные окружения

Убедись, что в `.env.local` прописаны:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Где найти:**
- `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 
  - Project Settings → API
- `SUPABASE_SERVICE_ROLE_KEY`: 
  - Project Settings → API → Service Role Key (⚠️ не передавай на клиент!)

---

## 5. Тестирование подключения

После настройки проверь подключение:

1. Запусти проект: `npm run dev`
2. Открой консоль браузера
3. Проверь, что нет ошибок подключения к Supabase

Или создай тестовую страницу `/test-db` для проверки.
