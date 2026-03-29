import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Middleware работает ТОЛЬКО для /admin/* роутов
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  
  if (!isAdminRoute) {
    // Публичные роуты пропускаем без проверки
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Если пользователь не авторизован
  if (!user) {
    // Разрешаем доступ только к странице логина
    if (!request.nextUrl.pathname.startsWith('/admin/login')) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // Пользователь авторизован — проверяем роль
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Если не админ — редирект на главную
  if (profile?.role !== 'admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Если админ пытается зайти на страницу логина — редирект в дашборд
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match only /admin/* routes
     */
    '/admin/:path*',
  ],
}
