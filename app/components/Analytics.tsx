'use client'

import Script from 'next/script'

export default function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8ZK93TZL47"
        strategy="lazyOnload"
        onLoad={() => {
          // Initialize GA after script loads
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('js', new Date());
            window.gtag('config', 'G-8ZK93TZL47', {
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure'
            });
          }
        }}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Set default consent state with advertising signals
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted',
            'wait_for_update': 2000
          });
          
          // Check for existing consent and apply it immediately
          const cookieConsent = localStorage.getItem('cookieConsent');
          if (cookieConsent) {
            const preferences = JSON.parse(cookieConsent);
            gtag('consent', 'update', {
              'ad_storage': preferences.marketing ? 'granted' : 'denied',
              'ad_user_data': preferences.marketing ? 'granted' : 'denied',
              'ad_personalization': preferences.marketing ? 'granted' : 'denied',
              'analytics_storage': preferences.analytics ? 'granted' : 'denied',
              'functionality_storage': preferences.functional ? 'granted' : 'denied',
              'personalization_storage': preferences.functional ? 'granted' : 'denied',
              'security_storage': 'granted'
            });
          }
        `}
      </Script>
    </>
  )
}
