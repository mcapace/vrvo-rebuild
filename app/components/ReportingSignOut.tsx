'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ReportingSignOut() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function signOut() {
    setPending(true)
    try {
      await fetch('/api/reporting-auth', { method: 'DELETE' })
      router.replace('/reporting/login')
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void signOut()}
      disabled={pending}
      className="font-mono text-[10px] uppercase tracking-wider text-gray-500 underline-offset-2 hover:text-navy hover:underline disabled:opacity-50"
    >
      {pending ? 'Signing out…' : 'Sign out'}
    </button>
  )
}
