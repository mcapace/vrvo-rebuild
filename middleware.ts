import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { REPORTING_SESSION_COOKIE } from '@/lib/reportingSession.constants'

/**
 * Edge-safe gate: session tokens are `payload.signature` (base64url); reject missing/malformed
 * cookies before the response is cached. Cryptographic verification still runs on the server route.
 */
function looksLikeSessionToken(raw: string | undefined): boolean {
  if (!raw || raw.length < 32) return false
  const dot = raw.indexOf('.')
  if (dot <= 0 || dot === raw.length - 1) return false
  return true
}

/**
 * Enforces reporting auth at the edge so /reporting cannot be served from a cached
 * static shell without at least presenting a session cookie (full verify on the page + API).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isReportingLogin =
    pathname === '/reporting/login' || pathname.startsWith('/reporting/login/')
  if (isReportingLogin) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/reporting')) {
    const token = request.cookies.get(REPORTING_SESSION_COOKIE)?.value
    if (!looksLikeSessionToken(token)) {
      const url = request.nextUrl.clone()
      url.pathname = '/reporting/login'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/reporting', '/reporting/:path*'],
}
