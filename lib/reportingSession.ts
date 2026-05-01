import crypto from 'crypto'
import { REPORTING_SESSION_COOKIE } from './reportingSession.constants'

export { REPORTING_SESSION_COOKIE }

const DEFAULT_SESSION_MAX_AGE_S = 60 * 60 * 24 * 7 // 7 days

export function getReportingSessionMaxAge(): number {
  return DEFAULT_SESSION_MAX_AGE_S
}

function getSigningSecret(): string {
  return (
    process.env.REPORTING_SESSION_SECRET ||
    process.env.REPORTING_PASSWORD ||
    'vrvo-reporting-local-signing-secret'
  )
}

export function createReportingSessionToken(): string {
  const maxAgeMs = getReportingSessionMaxAge() * 1000
  const payload = Buffer.from(
    JSON.stringify({ v: 1 as const, exp: Date.now() + maxAgeMs }),
    'utf8',
  ).toString('base64url')
  const secret = getSigningSecret()
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyReportingSessionToken(token: string | undefined): boolean {
  if (!token) return false
  const dot = token.lastIndexOf('.')
  if (dot <= 0) return false
  const payload = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const secret = getSigningSecret()
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  try {
    if (!crypto.timingSafeEqual(a, b)) return false
  } catch {
    return false
  }
  try {
    const raw = Buffer.from(payload, 'base64url').toString('utf8')
    const data = JSON.parse(raw) as { exp?: number }
    if (typeof data.exp !== 'number' || data.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

export function getExpectedReportingPassword(): string {
  return process.env.REPORTING_PASSWORD ?? 'Duplex123!'
}
