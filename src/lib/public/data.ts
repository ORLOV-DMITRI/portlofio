import { createClient } from '@/lib/supabase/server'

/**
 * Получить все опубликованные проекты (публичный доступ)
 */
export async function getPublicProjects() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
}

/**
 * Получить весь опыт работы (публичный доступ)
 */
export async function getPublicExperience() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching experience:', error)
    return []
  }

  return data || []
}
