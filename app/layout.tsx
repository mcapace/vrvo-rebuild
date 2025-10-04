import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import CookieBanner from "./components/CookieBanner";
import { Analytics } from '@vercel/analytics/react';
import StructuredData from "./components/StructuredData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
  metadataBase: new URL('https://vrvo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vrvo | Enterprise Marketing for Ambitious SMBs',
    description: 'Programmatic advertising and business transformation normally reserved for Fortune 500s, made accessible for growing businesses.',
    url: 'https://vrvo.com',
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-8ZK93TZL47`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8ZK93TZL47');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
