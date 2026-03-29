// Database types based on Supabase schema

export interface Profile {
  id: string
  username: string
  role: 'admin' | 'user'
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
  likes_count: number
}

export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  image_url: string
  demo_url: string | null
  repo_url: string | null
  order: number
}

export interface Experience {
  id: string
  company: string
  position: string
  start_date: string
  end_date: string | null
  description: string
  order: number
}

export interface Like {
  id: string
  post_id: string
  ip_address: string
  created_at: string
}
