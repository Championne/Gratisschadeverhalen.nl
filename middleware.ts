import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

/**
 * Check if user email is in the admin list
 * Duplicated here because middleware can't import from lib/ in Edge runtime
 */
function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false
  
  const adminEmailsEnv = process.env.ADMIN_EMAILS || ''
  const adminEmails = adminEmailsEnv
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(e => e.length > 0)
  
  // Fail secure: if no admins configured, deny all
  if (adminEmails.length === 0) {
    console.warn('⚠️ MIDDLEWARE: No ADMIN_EMAILS configured')
    return false
  }
  
  return adminEmails.includes(email.toLowerCase())
}

export async function middleware(request: NextRequest) {
  // OAuth callback handler: redirect to /auth/callback if code is present
  // This handles cases where OAuth provider redirects to homepage instead of callback URL
  if (request.nextUrl.pathname === '/' && request.nextUrl.searchParams.has('code')) {
    const code = request.nextUrl.searchParams.get('code')
    const callbackUrl = new URL('/auth/callback', request.url)
    callbackUrl.searchParams.set('code', code!)
    return NextResponse.redirect(callbackUrl)
  }

  // Early return voor publieke routes (excluding /api/admin which needs auth)
  const publicPaths = ['/', '/claim-indienen', '/privacy', '/algemene-voorwaarden', '/over-ons', '/contact']
  const publicApiPaths = ['/api/webhook', '/api/cron', '/api/ocr', '/api/health', '/api/claims', '/api/documents', '/api/agent']
  
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))
  const isPublicApi = publicApiPaths.some(path => request.nextUrl.pathname.startsWith(path))
  const isAdminApi = request.nextUrl.pathname.startsWith('/api/admin')
  
  // Allow public paths and non-admin API routes
  if ((isPublicPath || isPublicApi) && !isAdminApi) {
    const response = NextResponse.next()
    response.headers.set('x-pathname', request.nextUrl.pathname)
    return response
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Add pathname to headers for layout conditional rendering
  response.headers.set('x-pathname', request.nextUrl.pathname)

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

    // Bescherm /dashboard routes - require authentication
    if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 🔒 ADMIN PROTECTION: Block non-admins from /dashboard/admin/*
    if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      if (!isAdminEmail(user.email)) {
        console.log(`🚫 Admin access blocked for: ${user.email}`)
        // Redirect to regular dashboard with error message
        const redirectUrl = new URL('/dashboard', request.url)
        redirectUrl.searchParams.set('error', 'unauthorized')
        return NextResponse.redirect(redirectUrl)
      }
    }

    // 🔒 ADMIN API PROTECTION: Block non-admins from /api/admin/*
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      if (!user) {
        return NextResponse.json(
          { error: 'Unauthorized', message: 'Authentication required' },
          { status: 401 }
        )
      }
      
      if (!isAdminEmail(user.email)) {
        console.log(`🚫 Admin API blocked for: ${user.email}`)
        return NextResponse.json(
          { error: 'Forbidden', message: 'Admin access required' },
          { status: 403 }
        )
      }
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
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
