-- =====================================================
-- Portfolio Database Schema
-- Supabase PostgreSQL Migration
-- =====================================================

-- =====================================================
-- 1. TABLE: profiles (расширение auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- 2. TABLE: posts (Блог)
-- =====================================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  likes_count INTEGER DEFAULT 0,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policies for posts
CREATE POLICY "Published posts are viewable by everyone"
  ON posts FOR SELECT
  USING (published = true OR auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can insert posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can update posts"
  ON posts FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can delete posts"
  ON posts FOR DELETE
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

-- Index for slug lookup
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- =====================================================
-- 3. TABLE: projects (Портфолио)
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL,
  demo_url TEXT,
  repo_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects("order");

-- =====================================================
-- 4. TABLE: experience (Опыт работы)
-- =====================================================
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Policies for experience
CREATE POLICY "Experience is viewable by everyone"
  ON experience FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert experience"
  ON experience FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can update experience"
  ON experience FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can delete experience"
  ON experience FOR DELETE
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ));

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_experience_order ON experience("order");
CREATE INDEX IF NOT EXISTS idx_experience_dates ON experience(start_date DESC);

-- =====================================================
-- 5. TABLE: likes (Для защиты от накрутки)
-- =====================================================
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, ip_address)
);

-- Enable RLS
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Policies for likes
CREATE POLICY "Likes are viewable by everyone"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create likes"
  ON likes FOR INSERT
  WITH CHECK (true);

-- Index for post lookup
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);

-- =====================================================
-- 6. TRIGGER: Автоматическое создание профиля при регистрации
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 7. TRIGGER: Обновление updated_at при изменении записей
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 8. FUNCTION: Инкремент лайков
-- =====================================================
CREATE OR REPLACE FUNCTION public.increment_post_likes(post_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE posts
  SET likes_count = likes_count + 1
  WHERE id = post_uuid
  RETURNING likes_count INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 9. FUNCTION: decrement лайков (для админки)
-- =====================================================
CREATE OR REPLACE FUNCTION public.decrement_post_likes(post_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE posts
  SET likes_count = GREATEST(0, likes_count - 1)
  WHERE id = post_uuid
  RETURNING likes_count INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
