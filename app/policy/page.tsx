'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, Eye, Lock, Users, Globe, Mail } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';

export default function Policy() {
  return (
    <div className="min-h-screen bg-white">
      <MagneticCursor />
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-navy text-sm uppercase tracking-widest mb-4 font-medium">
              LEGAL & PRIVACY
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Privacy Policy & Legal Information
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your privacy and trust are fundamental to our business. Here's how we protect your data and what you need to know about our services.
            </p>
          </motion.div>

          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Service Agreement</h3>
              <p className="text-gray-600 mb-4">
                By engaging Vrvo's services, you agree to these terms. Our services include programmatic advertising management, strategic marketing consulting, and business transformation services.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Payment Terms</h3>
              <p className="text-gray-600 mb-4">
                All services are billed monthly. Payment is due within 30 days of invoice date. Late payments may result in service suspension.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Confidentiality</h3>
              <p className="text-gray-600 mb-4">
                We maintain strict confidentiality regarding your business information, marketing strategies, and performance data.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Service Level Agreement</h3>
              <p className="text-gray-600 mb-4">
                We commit to transparent reporting, regular communication, and performance optimization. Specific metrics and KPIs are outlined in individual service agreements.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Termination</h3>
              <p className="text-gray-600 mb-4">
                Either party may terminate services with 30 days written notice. Upon termination, all client data and assets will be returned or transferred as requested.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What Are Cookies?</h3>
              <p className="text-gray-600 mb-4">
                Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience and analyze website performance.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand website usage and performance</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used for targeted advertising and remarketing</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Managing Cookies</h3>
              <p className="text-gray-600 mb-4">
                You can control cookie settings through your browser preferences or our cookie consent banner. Note that disabling certain cookies may affect website functionality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">General Inquiries</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-navy mr-3" />
                      <span className="text-gray-600">hello@vrvo.co</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-navy mr-3" />
                      <span className="text-gray-600">vrvo.co</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Legal</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-navy mr-3" />
                      <span className="text-gray-600">privacy@vrvo.co</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-navy mr-3" />
                      <span className="text-gray-600">1580 N Logan St Ste 660, Denver, CO 80203-1994</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Last Updated:</strong> January 1, 2025
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  We reserve the right to update these terms and policies. Changes will be posted on this page with an updated revision date.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}