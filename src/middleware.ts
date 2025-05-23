import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

async function isAdmin(request: NextRequest, response: NextResponse) {
  const supabase = createMiddlewareClient<Database>(
    { req: request, res: response },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return { success: false, session: null }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .maybeSingle()

  return { success: profile?.is_admin || false, session }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Проверка переменных окружения
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Supabase environment variables are missing.')
    return NextResponse.redirect(new URL('/error?error=configuration', request.url))
  }

  // Ограничение /admin для админов
  if (pathname.startsWith('/admin')) {
    const { success, session } = await isAdmin(request, response)
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (!success) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url))
    }
  }

  // Перенаправление с /login, если пользователь уже авторизован
  const { success, session } = await isAdmin(request, response)
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
