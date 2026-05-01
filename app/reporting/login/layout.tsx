import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reporting sign-in | Vrvo',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReportingLoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
