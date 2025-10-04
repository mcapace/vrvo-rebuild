'use client'

import { useEffect } from 'react'

// Extend Window interface for gtag and fbq
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export default function ConsentManager() {
  useEffect(() => {
    // Check for existing consent and apply it
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent && typeof window !== 'undefined' && window.gtag) {
      const preferences = JSON.parse(cookieConsent);
      
      // Apply stored consent preferences
      window.gtag('consent', 'update', {
        'ad_storage': preferences.marketing ? 'granted' : 'denied',
        'ad_user_data': preferences.marketing ? 'granted' : 'denied',
        'ad_personalization': preferences.marketing ? 'granted' : 'denied',
        'analytics_storage': preferences.analytics ? 'granted' : 'denied',
        'functionality_storage': preferences.functional ? 'granted' : 'denied',
        'personalization_storage': preferences.functional ? 'granted' : 'denied',
        'security_storage': 'granted'
      });
      
      // Apply Facebook Pixel consent
      if (window.fbq) {
        if (preferences.marketing) {
          window.fbq('consent', 'grant');
        } else {
          window.fbq('consent', 'revoke');
        }
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
