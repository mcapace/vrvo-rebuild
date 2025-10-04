import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import CookieBanner from "./components/CookieBanner";

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
  title: "Vrvo - Digital Marketing & Business Transformation",
  description: "Vrvo is a digital marketing and business transformation company that helps businesses grow through innovative strategies and cutting-edge technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
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
      </body>
    </html>
  );
}
