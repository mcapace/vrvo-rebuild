import { NextResponse } from 'next/server'
import {
  REPORTING_SESSION_COOKIE,
  createReportingSessionToken,
  getExpectedReportingPassword,
  getReportingSessionMaxAge,
} from '@/lib/reportingSession'
import crypto from 'crypto'

function timingSafeEqualPassword(input: string, expected: string): boolean {
  const a = crypto.createHash('sha256').update(input, 'utf8').digest()
  const b = crypto.createHash('sha256').update(expected, 'utf8').digest()
  return crypto.timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const password = typeof body.password === 'string' ? body.password : ''
  const expected = getExpectedReportingPassword()

  if (!timingSafeEqualPassword(password, expected)) {
    return NextResponse.json({ ok: false, error: 'Incorrect password' }, { status: 401 })
  }

  const token = createReportingSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(REPORTING_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getReportingSessionMaxAge(),
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(REPORTING_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
