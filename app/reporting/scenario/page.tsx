import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { ReportingSignOut } from '../../components/ReportingSignOut'
import { ReportingScenarioLab } from '../../components/ReportingScenarioLab'
import { REPORTING_SESSION_COOKIE } from '@/lib/reportingSession.constants'
import { verifyReportingSessionToken } from '@/lib/reportingSession'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'New reporting order | Reporting | Vrvo',
  description: 'Save browser-side orders, pull synthetic pacing dashboards, and export CSV.',
  robots: { index: false, follow: false },
}

export default async function ReportingScenarioPage() {
  const token = cookies().get(REPORTING_SESSION_COOKIE)?.value
  if (!verifyReportingSessionToken(token)) {
    redirect('/reporting/login?from=%2Freporting%2Fscenario')
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-100/60 pb-16 pt-24">
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-[1400px] items-center justify-end px-3 py-2 sm:px-5 lg:px-8">
            <ReportingSignOut />
          </div>
        </div>
        <ReportingScenarioLab />
      </main>
      <Footer />
    </>
  )
}
