'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Получить все опубликованные посты
 */
export async function getPublishedPosts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  
  return data || []
}

/**
 * Получить пост по slug
 */
export async function getPostBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error) {
    console.error('Error fetching post:', error)
    return null
  }
  
  return data
}

/**
 * Поставить лайк посту
 */
export async function likePost(postId: string, ipAddress: string) {
  const supabase = await createClient()
  
  // Проверка, не лайкал ли уже этот IP
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('ip_address', ipAddress)
    .single()
  
  if (existingLike) {
    return { error: 'Вы уже лайкали этот пост' }
  }
  
  // Создаём лайк
  const { error: likeError } = await supabase
    .from('likes')
    .insert({ post_id: postId, ip_address: ipAddress })
  
  if (likeError) {
    console.error('Error creating like:', likeError)
    return { error: 'Ошибка при создании лайка' }
  }
  
  // Инкремент счётчика
  const { data: newCount } = await supabase.rpc('increment_post_likes', {
    post_uuid: postId
  })
  
  revalidatePath(`/blog`)
  revalidatePath(`/blog/${postId}`)
  
  return { success: true, count: newCount }
}

/**
 * Получить следующие и предыдущие посты
 */
export async function getRelatedPosts(currentSlug: string) {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, title')
    .eq('published', true)
    .order('created_at', { ascending: false })
  
  if (!posts) return { prev: null, next: null }
  
  const currentIndex = posts.findIndex(p => p.slug === currentSlug)
  
  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  }
}
