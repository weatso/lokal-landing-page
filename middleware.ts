import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? 'fallback-secret-change-me'
)

const PROTECTED_PATHS = ['/admin-pricing']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const token = request.cookies.get('lokal_admin_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin-login', request.url))
  }

  try {
    await jwtVerify(token, SECRET_KEY)
    return NextResponse.next()
  } catch {
    // Token invalid / expired
    const response = NextResponse.redirect(new URL('/admin-login', request.url))
    response.cookies.set('lokal_admin_token', '', { maxAge: 0, path: '/' })
    return response
  }
}

export const config = {
  matcher: ['/admin-pricing/:path*'],
}
