import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // OAuth callback handler: redirect to /auth/callback if code is present
  // This handles cases where OAuth provider redirects to homepage instead of callback URL
  if (request.nextUrl.pathname === '/' && request.nextUrl.searchParams.has('code')) {
    const code = request.nextUrl.searchParams.get('code')
    const callbackUrl = new URL('/auth/callback', request.url)
    callbackUrl.searchParams.set('code', code!)
    return NextResponse.redirect(callbackUrl)
  }

  // Early return voor publieke routes
  const publicPaths = ['/', '/claim-indienen', '/privacy', '/algemene-voorwaarden', '/over-ons', '/contact', '/api']
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    const { data: { user }, error } = await supabase.auth.getUser()

    // Log error maar continue
    if (error) {
      console.error('Middleware auth error:', error)
    }

    // Bescherm /dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirect naar dashboard als al ingelogd en proberen in te loggen
    if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/registreren') && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    // Bij error, allow access (fail open)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/registreren',
  ],
}
