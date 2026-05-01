'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ReportingLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const rawFrom = searchParams.get('from') || '/reporting'
  const redirectTo =
    rawFrom.startsWith('/') && !rawFrom.startsWith('//') ? rawFrom : '/reporting'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      const res = await fetch('/api/reporting-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Incorrect password. Try again.')
        setPending(false)
        return
      }
      router.replace(redirectTo.startsWith('/reporting') ? redirectTo : '/reporting')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-6">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/vrvo_wordmark_black.svg"
              alt="Vrvo"
              width={120}
              height={34}
              className="h-7 w-auto"
            />
          </Link>
          <Link href="/" className="font-mono text-xs uppercase tracking-wider text-gray-500 hover:text-navy">
            Exit
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md border border-gray-200 bg-white p-8 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
            Restricted · Campaign reporting
          </p>
          <h1 className="mt-3 text-2xl font-light tracking-tight text-gray-900">Sign in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the reporting password to view trade desk dashboards.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="reporting-password" className="sr-only">
                Password
              </label>
              <input
                id="reporting-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 font-mono text-sm outline-none ring-navy focus:border-navy focus:ring-1 focus:ring-navy"
                placeholder="Password"
                required
                disabled={pending}
              />
            </div>
            {error ? (
              <p className="font-mono text-xs text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-navy py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-navy-hover disabled:opacity-60"
            >
              {pending ? 'Signing in…' : 'Continue'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
