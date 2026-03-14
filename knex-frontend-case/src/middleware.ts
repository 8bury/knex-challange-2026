import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/', '/login', '/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route))

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

return NextResponse.next()
}

export const config = {
  // Skip Next internals and any static file (anything with a dot in the path).
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
