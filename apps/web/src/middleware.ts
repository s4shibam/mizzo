import { NextResponse, type NextRequest } from 'next/server'

const redirectionRecords: Record<string, string> = {
  '/': '/home',
  '/library': '/library/my-playlists',
  '/studio': '/studio/dashboard',
  '/admin': '/admin/dashboard'
}

export const config = {
  matcher: ['/', '/library', '/studio', '/admin']
}

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  const targetPath = redirectionRecords[pathname] || undefined

  if (targetPath) {
    return NextResponse.redirect(new URL(targetPath, request.url))
  }

  return NextResponse.next()
}
