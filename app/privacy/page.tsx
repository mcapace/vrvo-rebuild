'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, Database, Mail, Phone, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';

export default function Privacy() {
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
              PRIVACY POLICY
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Your Privacy Matters
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We're committed to protecting your privacy and being transparent about how we collect, use, and safeguard your information.
            </p>
          </motion.div>

          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us, such as when you contact us, request a consultation, or engage our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Company information and job title</li>
                <li>Marketing budget and business goals</li>
                <li>Communication preferences</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4">
                When you visit our website, we automatically collect certain information:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website information</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Delivery</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Provide marketing consulting services</li>
                    <li>Manage programmatic advertising campaigns</li>
                    <li>Deliver business transformation solutions</li>
                    <li>Generate performance reports and analytics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Respond to your inquiries and requests</li>
                    <li>Send service-related communications</li>
                    <li>Provide updates on campaign performance</li>
                    <li>Share relevant marketing insights</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Protection & Security</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-navy" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Encryption</h3>
                  <p className="text-gray-600 text-sm">All data is encrypted in transit and at rest using industry-standard protocols.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-navy" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Access Controls</h3>
                  <p className="text-gray-600 text-sm">Strict access controls ensure only authorized personnel can access your data.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-navy" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure Storage</h3>
                  <p className="text-gray-600 text-sm">Data is stored on secure, compliant cloud infrastructure with regular backups.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights & Choices</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Access & Portability</h3>
                  <p className="text-gray-600">You have the right to access your personal information and request a copy of your data in a portable format.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Correction & Updates</h3>
                  <p className="text-gray-600">You can request corrections to inaccurate information or updates to your personal details.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Deletion</h3>
                  <p className="text-gray-600">You may request deletion of your personal information, subject to legal and contractual obligations.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Opt-Out</h3>
                  <p className="text-gray-600">You can opt out of marketing communications at any time using the unsubscribe link in our emails.</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Mail className="w-5 h-5 text-navy mr-3" />
                      <span className="text-gray-600">privacy@vrvo.co</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-navy mr-3" />
                      <span className="text-gray-600">(555) 123-4567</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-navy mr-3 mt-1" />
                      <span className="text-gray-600">1580 N Logan St Ste 660<br />Denver, CO 80203-1994</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Last Updated:</strong> January 1, 2025
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This privacy policy may be updated periodically. We will notify you of any material changes by posting the updated policy on our website.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}