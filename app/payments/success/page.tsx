'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowLeft } from '@phosphor-icons/react';
import Footer from '../../components/Footer';

export default function Success() {
  const [sessionId, setSessionId] = useState<string>('');
  const isTestMode = sessionId.startsWith('cs_test_');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('session_id');
    if (id) {
      setSessionId(id);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <Image 
              src="/logos/vrvo_wordmark_black.svg" 
              alt="Vrvo" 
              width={140} 
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-navy">Services</Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-navy">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-navy">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Test Mode Banner */}
      {isTestMode && (
        <div className="bg-green-50 border-b-2 border-green-400">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    <strong>TEST MODE SUCCESS</strong> - This was a test transaction. No real money was charged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Content */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your payment. Your transaction has been completed successfully.
            </p>

            {/* Session ID (if available) */}
            {sessionId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Transaction ID:</strong> {sessionId}
                </p>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-navy/5 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• You'll receive a payment confirmation email</li>
                <li>• Our team will process your payment within 1 business day</li>
                <li>• Any deliverables will be sent to your email address</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-navy hover:bg-navy-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Homepage
              </Link>
              
              <Link 
                href="/contact"
                className="border-2 border-gray-300 hover:border-navy text-gray-700 hover:text-navy font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Contact Support
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Questions about your payment? Contact us at{' '}
                <a href="mailto:hello@vrvo.co" className="text-navy hover:underline">
                  hello@vrvo.co
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}



