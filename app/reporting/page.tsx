import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { ReportingSignOut } from '../components/ReportingSignOut'
import { CampaignDashboard } from '../components/CampaignDashboard'
import { bigSmokeMiamiCampaign } from '@/lib/data/bigSmokeMiami'
import { REPORTING_SESSION_COOKIE } from '@/lib/reportingSession.constants'
import { verifyReportingSessionToken } from '@/lib/reportingSession'

/** Always run auth on the server; avoid cached HTML without the cookie check. */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Campaign reporting | Vrvo',
  description: 'Internal campaign performance and strategy overview.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ReportingPage() {
  const token = cookies().get(REPORTING_SESSION_COOKIE)?.value
  if (!verifyReportingSessionToken(token)) {
    redirect('/reporting/login?from=%2Freporting')
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 pb-16 pt-24">
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-[1400px] items-center justify-end px-3 py-2 sm:px-5 lg:px-8">
            <ReportingSignOut />
          </div>
        </div>
        <CampaignDashboard campaign={bigSmokeMiamiCampaign} />
      </main>
      <Footer />
    </>
  )
}
