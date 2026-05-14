import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
  const cookieStore = await cookies()
  const token = cookieStore.get(REPORTING_SESSION_COOKIE)?.value
  if (!verifyReportingSessionToken(token)) {
    redirect('/reporting/login?from=%2Freporting')
  }

  const generatedAt = new Date().toISOString()

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-transparent pb-16 pt-24">
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-3 py-2 sm:px-5 lg:px-8">
            <div className="flex min-w-0 flex-wrap items-center gap-4 sm:gap-6">
              <Link href="/" className="flex shrink-0 items-center" aria-label="Vrvo home">
                <Image
                  src="/logos/vrvo_wordmark_black.svg"
                  alt="Vrvo"
                  width={140}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
              <Link
                href="/reporting/scenario"
                className="text-xs font-semibold uppercase tracking-wide text-navy underline decoration-navy/25 underline-offset-2 hover:decoration-navy"
              >
                New reporting order — enter line item, save order, pull CSV
              </Link>
            </div>
            <ReportingSignOut />
          </div>
        </div>
        <CampaignDashboard campaign={bigSmokeMiamiCampaign} generatedAt={generatedAt} />
      </main>
      <Footer />
    </>
  )
}
