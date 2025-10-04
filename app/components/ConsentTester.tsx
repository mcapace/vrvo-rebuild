'use client'

import { useState } from 'react'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function ConsentTester() {
  const [isVisible, setIsVisible] = useState(false)

  const grantAllConsent = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted',
        'security_storage': 'granted'
      });
      
      // Also update localStorage
      localStorage.setItem('cookieConsent', JSON.stringify({
        essential: true,
        analytics: true,
        functional: true,
        marketing: true
      }));
      
      console.log('All consent granted for testing');
    }
  }

  const denyAllConsent = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied',
        'security_storage': 'granted'
      });
      
      console.log('All consent denied for testing');
    }
  }

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-red-500 text-white px-3 py-2 rounded text-sm"
      >
        Consent Tester
      </button>
      
      {isVisible && (
        <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-lg p-4 space-y-2">
          <button
            onClick={grantAllConsent}
            className="block w-full bg-green-500 text-white px-3 py-2 rounded text-sm"
          >
            Grant All Consent
          </button>
          <button
            onClick={denyAllConsent}
            className="block w-full bg-red-500 text-white px-3 py-2 rounded text-sm"
          >
            Deny All Consent
          </button>
        </div>
      )}
    </div>
  )
}
