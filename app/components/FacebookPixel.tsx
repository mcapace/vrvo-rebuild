'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Extend Window interface for fbq
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function FacebookPixel() {
  useEffect(() => {
    // Initialize Facebook Pixel with consent
    if (typeof window !== 'undefined' && window.fbq) {
      // Check consent status
      const cookieConsent = localStorage.getItem('cookieConsent');
      if (cookieConsent) {
        const preferences = JSON.parse(cookieConsent);
        
        if (preferences.marketing) {
          // Grant Facebook Pixel consent
          window.fbq('consent', 'grant');
        } else {
          // Deny Facebook Pixel consent
          window.fbq('consent', 'revoke');
        }
      } else {
        // Default to denied consent
        window.fbq('consent', 'revoke');
      }
    }
  }, []);

  return (
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        // Set default consent to denied
        fbq('consent', 'revoke');
      `}
    </Script>
  )
}
