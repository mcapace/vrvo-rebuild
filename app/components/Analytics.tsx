'use client'

import Script from 'next/script'

export default function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8ZK93TZL47"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Set default consent state
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
          
          gtag('js', new Date());
          gtag('config', 'G-8ZK93TZL47', {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  )
}
