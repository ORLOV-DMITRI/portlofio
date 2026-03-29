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

// ==================== PROJECTS ====================

/**
 * Получить все проекты
 */
export async function getAllProjects() {
  try {
    await checkAdmin()
  } catch {
    return []
  }
  
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
 * Создать проект
 */
export async function createProject(formData: FormData) {
  try {
    const { supabase } = await checkAdmin()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const techStack = formData.get('techStack') as string
    const imageUrl = formData.get('imageUrl') as string
    const demoUrl = formData.get('demoUrl') as string
    const repoUrl = formData.get('repoUrl') as string
    const order = parseInt(formData.get('order') as string) || 0

    console.log('Creating project:', { title, description, techStack, imageUrl, demoUrl, repoUrl, order })

    if (!title || !description) {
      return { error: 'Заполните обязательные поля' }
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({
        title,
        description,
        tech_stack: techStack.split(',').map(s => s.trim()).filter(Boolean),
        image_url: imageUrl,
        demo_url: demoUrl || null,
        repo_url: repoUrl || null,
        order,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      return { error: error.message }
    }

    console.log('Project created:', data)

    revalidatePath('/admin/portfolio')
    revalidatePath('/')

    return { success: true, project: data }
  } catch (err) {
    console.error('Unexpected error in createProject:', err)
    return { error: 'Произошла непредвиденная ошибка' }
  }
}

/**
 * Обновить проект
 */
export async function updateProject(id: string, formData: FormData) {
  const { supabase } = await checkAdmin()
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const techStack = formData.get('techStack') as string
  const imageUrl = formData.get('imageUrl') as string
  const demoUrl = formData.get('demoUrl') as string
  const repoUrl = formData.get('repoUrl') as string
  const order = parseInt(formData.get('order') as string) || 0
  
  if (!title || !description) {
    return { error: 'Заполните обязательные поля' }
  }
  
  const { data, error } = await supabase
    .from('projects')
    .update({
      title,
      description,
      tech_stack: techStack.split(',').map(s => s.trim()).filter(Boolean),
      image_url: imageUrl,
      demo_url: demoUrl || null,
      repo_url: repoUrl || null,
      order,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating project:', error)
    return { error: error.message }
  }
  
  revalidatePath('/admin/portfolio')
  revalidatePath('/')
  
  return { success: true, project: data }
}

/**
 * Удалить проект
 */
export async function deleteProject(id: string): Promise<void> {
  const { supabase } = await checkAdmin()

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin/portfolio')
  revalidatePath('/')
}

/**
 * Получить проект по ID
 */
export async function getProjectById(id: string) {
  await checkAdmin()
  
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching project:', error)
    return null
  }
  
  return data
}

// ==================== EXPERIENCE ====================

/**
 * Получить весь опыт
 */
export async function getAllExperience() {
  try {
    await checkAdmin()
  } catch {
    return []
  }
  
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

/**
 * Создать запись опыта
 */
export async function createExperience(formData: FormData) {
  const { supabase } = await checkAdmin()
  
  const company = formData.get('company') as string
  const position = formData.get('position') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string
  const description = formData.get('description') as string
  const order = parseInt(formData.get('order') as string) || 0
  
  if (!company || !position || !startDate || !description) {
    return { error: 'Заполните обязательные поля' }
  }
  
  const { data, error } = await supabase
    .from('experience')
    .insert({
      company,
      position,
      start_date: startDate,
      end_date: endDate || null,
      description,
      order,
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating experience:', error)
    return { error: error.message }
  }
  
  revalidatePath('/admin/portfolio')
  revalidatePath('/')
  
  return { success: true, experience: data }
}

/**
 * Обновить запись опыта
 */
export async function updateExperience(id: string, formData: FormData) {
  const { supabase } = await checkAdmin()
  
  const company = formData.get('company') as string
  const position = formData.get('position') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string
  const description = formData.get('description') as string
  const order = parseInt(formData.get('order') as string) || 0
  
  if (!company || !position || !startDate || !description) {
    return { error: 'Заполните обязательные поля' }
  }
  
  const { data, error } = await supabase
    .from('experience')
    .update({
      company,
      position,
      start_date: startDate,
      end_date: endDate || null,
      description,
      order,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating experience:', error)
    return { error: error.message }
  }
  
  revalidatePath('/admin/portfolio')
  revalidatePath('/')
  
  return { success: true, experience: data }
}

/**
 * Удалить запись опыта
 */
export async function deleteExperience(id: string): Promise<void> {
  const { supabase } = await checkAdmin()

  const { error } = await supabase
    .from('experience')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting experience:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin/portfolio')
  revalidatePath('/')
}

/**
 * Получить запись опыта по ID
 */
export async function getExperienceById(id: string) {
  await checkAdmin()
  
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching experience:', error)
    return null
  }
  
  return data
}
