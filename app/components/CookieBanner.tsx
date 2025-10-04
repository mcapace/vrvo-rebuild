'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import Link from 'next/link';

// Extend Window interface for gtag and fbq
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allPreferences));
    setShowBanner(false);
    // Update Google Consent Mode v2
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
    }
    
    // Update Facebook Pixel consent
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('consent', 'grant');
    }
  };

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    // Update Google Consent Mode v2 based on preferences
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': preferences.marketing ? 'granted' : 'denied',
        'ad_user_data': preferences.marketing ? 'granted' : 'denied',
        'ad_personalization': preferences.marketing ? 'granted' : 'denied',
        'analytics_storage': preferences.analytics ? 'granted' : 'denied',
        'functionality_storage': preferences.functional ? 'granted' : 'denied',
        'personalization_storage': preferences.functional ? 'granted' : 'denied',
        'security_storage': 'granted'
      });
    }
    
    // Update Facebook Pixel consent based on marketing preference
    if (typeof window !== 'undefined' && window.fbq) {
      if (preferences.marketing) {
        window.fbq('consent', 'grant');
      } else {
        window.fbq('consent', 'revoke');
      }
    }
  };

  const rejectAll = () => {
    const minimalPreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false
    };
    localStorage.setItem('cookieConsent', JSON.stringify(minimalPreferences));
    setShowBanner(false);
    // Deny all non-essential cookies in Google Consent Mode v2
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
    }
    
    // Deny Facebook Pixel consent
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('consent', 'revoke');
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-deep-charcoal/10 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Cookie className="w-6 h-6 text-burnt-orange" />
                <div>
                  <h3 className="font-semibold text-deep-charcoal mb-1">We use cookies</h3>
                  <p className="text-sm text-deep-charcoal/80">
                    We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                    <Link href="/policy" className="text-rich-navy hover:text-rich-navy/80 underline ml-1">
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 px-4 py-2 text-deep-charcoal border border-deep-charcoal/20 rounded-sm hover:bg-deep-charcoal/5 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-deep-charcoal border border-deep-charcoal/20 rounded-sm hover:bg-deep-charcoal/5 transition-colors text-sm"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="bg-rich-navy text-white px-4 py-2 rounded-sm hover:bg-rich-navy/90 transition-colors text-sm"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-deep-charcoal">Cookie Preferences</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-deep-charcoal/60 hover:text-deep-charcoal transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-warm-linen/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-deep-charcoal">Essential Cookies</h4>
                    <p className="text-sm text-deep-charcoal/80">Required for the website to function properly</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-deep-charcoal/60">
                    <Check className="w-4 h-4" />
                    Always Active
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-deep-charcoal/10 rounded-lg">
                  <div>
                    <h4 className="font-medium text-deep-charcoal">Analytics Cookies</h4>
                    <p className="text-sm text-deep-charcoal/80">Help us understand how visitors interact with our website</p>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.analytics ? 'bg-rich-navy' : 'bg-deep-charcoal/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-deep-charcoal/10 rounded-lg">
                  <div>
                    <h4 className="font-medium text-deep-charcoal">Functional Cookies</h4>
                    <p className="text-sm text-deep-charcoal/80">Remember your preferences and settings</p>
                  </div>
                  <button
                    onClick={() => togglePreference('functional')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.functional ? 'bg-rich-navy' : 'bg-deep-charcoal/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.functional ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-deep-charcoal/10 rounded-lg">
                  <div>
                    <h4 className="font-medium text-deep-charcoal">Marketing Cookies</h4>
                    <p className="text-sm text-deep-charcoal/80">Used to deliver relevant advertisements</p>
                  </div>
                  <button
                    onClick={() => togglePreference('marketing')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.marketing ? 'bg-rich-navy' : 'bg-deep-charcoal/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-deep-charcoal/10">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-deep-charcoal border border-deep-charcoal/20 rounded-sm hover:bg-deep-charcoal/5 transition-colors text-sm"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptSelected}
                  className="bg-rich-navy text-white px-4 py-2 rounded-sm hover:bg-rich-navy/90 transition-colors text-sm"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
