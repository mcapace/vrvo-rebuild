import type { ReactNode } from 'react'

/**
 * Entire /reporting tree stays dynamic and uncached so dashboard JS/HTML always matches latest deploy.
 */
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function ReportingSectionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200 via-slate-100 to-slate-200">
      {children}
    </div>
  )
}
