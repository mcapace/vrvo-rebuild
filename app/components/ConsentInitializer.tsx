'use client'

import { useEffect } from 'react'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function ConsentInitializer() {
  useEffect(() => {
    // Initialize consent immediately when component mounts
    if (typeof window !== 'undefined' && window.gtag) {
      // Check for existing consent
      const cookieConsent = localStorage.getItem('cookieConsent');
      
      if (cookieConsent) {
        const preferences = JSON.parse(cookieConsent);
        
        // Apply stored consent immediately
        window.gtag('consent', 'update', {
          'ad_storage': preferences.marketing ? 'granted' : 'denied',
          'ad_user_data': preferences.marketing ? 'granted' : 'denied',
          'ad_personalization': preferences.marketing ? 'granted' : 'denied',
          'analytics_storage': preferences.analytics ? 'granted' : 'denied',
          'functionality_storage': preferences.functional ? 'granted' : 'denied',
          'personalization_storage': preferences.functional ? 'granted' : 'denied',
          'security_storage': 'granted'
        });
      } else {
        // No consent yet, set default denied state
        window.gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied',
          'functionality_storage': 'denied',
          'personalization_storage': 'denied',
          'security_storage': 'granted'
        });
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
