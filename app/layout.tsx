import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from './components/Analytics'
import StructuredData from './components/StructuredData'
import CookieBanner from "./components/CookieBanner";
import ConsentManager from "./components/ConsentManager";
import FacebookPixel from "./components/FacebookPixel";
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vrvo | Enterprise Programmatic Advertising for SMBs',
  description: 'Enterprise-grade programmatic advertising, digital marketing strategy, and business transformation consulting for ambitious small and medium-sized businesses. No long-term contracts, complete transparency.',
  keywords: [
    'programmatic advertising',
    'digital marketing agency',
    'business transformation consulting',
    'SMB marketing',
    'enterprise marketing for small business',
    'programmatic DSP',
    'marketing automation',
    'CRM implementation',
    'MarTech optimization',
    'digital advertising agency'
  ],
  authors: [{ name: 'Vrvo' }],
  creator: 'Vrvo',
  publisher: 'Vrvo',
  metadataBase: new URL('https://vrvo.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vrvo | Enterprise Marketing for Ambitious SMBs',
    description: 'Programmatic advertising and business transformation normally reserved for Fortune 500s, made accessible for growing businesses.',
    url: 'https://vrvo.co',
    siteName: 'Vrvo',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // You'll need to create this
        width: 1200,
        height: 630,
        alt: 'Vrvo - Enterprise Marketing for SMBs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vrvo | Enterprise Marketing for Ambitious SMBs',
    description: 'Programmatic advertising and business transformation for growing businesses',
    images: ['/twitter-image.jpg'], // You'll need to create this
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add when you get it from Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <StructuredData />
      </head>
      <body className={inter.className}>
        <ConsentManager />
        {children}
        <CookieBanner />
        <Analytics />
        <FacebookPixel />
        <VercelAnalytics />
      </body>
    </html>
  );
}
