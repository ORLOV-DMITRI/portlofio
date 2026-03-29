'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Проверка что текущий пользователь — админ
 */
async function checkAdmin() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Необходима авторизация')
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    throw new Error('Требуется роль админа')
  }
  
  return { supabase, user }
}

/**
 * Получить все посты (включая черновики)
 */
export async function getAllPosts() {
  try {
    await checkAdmin()
  } catch {
    return []
  }
  
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  
  return data || []
}

/**
 * Создать новый пост
 */
export async function createPost(formData: FormData) {
  const { supabase } = await checkAdmin()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const published = formData.get('published') === 'on'
  
  if (!title || !slug || !content) {
    return { error: 'Заполните обязательные поля' }
  }
  
  const { data, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      content,
      excerpt,
      published,
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating post:', error)
    return { error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/blog')
  
  return { success: true, post: data }
}

/**
 * Обновить пост
 */
export async function updatePost(id: string, formData: FormData) {
  const { supabase } = await checkAdmin()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const published = formData.get('published') === 'on'
  
  if (!title || !slug || !content) {
    return { error: 'Заполните обязательные поля' }
  }
  
  const { data, error } = await supabase
    .from('posts')
    .update({
      title,
      slug,
      content,
      excerpt,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating post:', error)
    return { error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  
  return { success: true, post: data }
}

/**
 * Удалить пост
 */
export async function deletePost(id: string): Promise<void> {
  const { supabase } = await checkAdmin()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin')
  revalidatePath('/blog')
}

/**
 * Получить пост по ID для редактирования
 */
export async function getPostById(id: string) {
  await checkAdmin()
  
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching post:', error)
    return null
  }
  
  return data
}
