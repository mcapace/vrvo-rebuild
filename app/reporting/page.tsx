import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { CampaignDashboard } from '../components/CampaignDashboard'
import { bigSmokeMiamiCampaign } from '@/lib/data/bigSmokeMiami'

export const metadata: Metadata = {
  title: 'Campaign reporting | Vrvo',
  description: 'Internal campaign performance and strategy overview.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReportingPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 pb-16 pt-24">
        <CampaignDashboard campaign={bigSmokeMiamiCampaign} />
      </main>
      <Footer />
    </>
  )
}
