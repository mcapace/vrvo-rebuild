'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, Eye, Lock, Users, Globe, Mail } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';

export default function Policy() {
  return (
    <div className="min-h-screen bg-warm-linen">
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
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
              LEGAL & PRIVACY
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-deep-charcoal mb-6 leading-tight">
              Privacy Policy & Legal Information
            </h1>
            <p className="text-lg text-deep-charcoal/80 leading-relaxed max-w-3xl mx-auto">
              Your privacy and trust are fundamental to our business. Here's how we protect your data and what you need to know about our services.
            </p>
          </motion.div>

          <div className="prose prose-lg max-w-none text-deep-charcoal/80 leading-relaxed space-y-12">
            
            {/* Privacy Policy */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Privacy Policy</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Information We Collect</h3>
                  <p className="mb-4">We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fill out contact forms or request consultations</li>
                    <li>Subscribe to our newsletter or blog</li>
                    <li>Engage with our services</li>
                    <li>Communicate with us via email or phone</li>
                  </ul>
                  <p className="mt-4">This may include your name, email address, phone number, company information, and any other information you choose to provide.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">How We Use Your Information</h3>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Develop new products and services</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Information Sharing</h3>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>With service providers who assist us in operating our website and conducting our business</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or acquisition</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Data Security</h3>
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
                </div>
              </div>
            </motion.section>

            {/* Terms of Service */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Terms of Service</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Service Description</h3>
                  <p>Vrvo provides marketing infrastructure consulting, programmatic advertising services, and business transformation consulting to small and mid-sized businesses. Our services are provided on a project basis with specific terms outlined in individual service agreements.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Client Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information necessary for service delivery</li>
                    <li>Timely payment of invoices as agreed</li>
                    <li>Reasonable cooperation and access to necessary systems and data</li>
                    <li>Compliance with applicable laws and regulations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Intellectual Property</h3>
                  <p>All work product, strategies, and methodologies developed by Vrvo remain the property of Vrvo unless otherwise specified in writing. Clients receive a license to use deliverables for their business operations.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Limitation of Liability</h3>
                  <p>Vrvo's liability is limited to the total amount paid for services in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.</p>
                </div>
              </div>
            </motion.section>

            {/* Cookie Policy */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Cookie Policy</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">What Are Cookies?</h3>
                  <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Types of Cookies We Use</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-deep-charcoal mb-2">Essential Cookies</h4>
                      <p>These cookies are necessary for the website to function properly. They cannot be disabled.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-charcoal mb-2">Analytics Cookies</h4>
                      <p>We use Google Analytics to understand how visitors interact with our website. This helps us improve our content and user experience.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-charcoal mb-2">Functional Cookies</h4>
                      <p>These cookies remember your preferences and settings to provide a personalized experience.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Managing Cookies</h3>
                  <p>You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.</p>
                </div>
              </div>
            </motion.section>

            {/* Data Protection */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Data Protection Rights</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Your Rights</h3>
                  <p className="mb-4">Under applicable data protection laws, you have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Data Retention</h3>
                  <p>We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When we no longer need your information, we will securely delete or anonymize it.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">International Transfers</h3>
                  <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable laws.</p>
                </div>
              </div>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-rich-navy text-white rounded-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-burnt-orange" />
                <h2 className="text-2xl font-display">Contact Us</h2>
              </div>
              
              <div className="space-y-4">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@vrvo.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Business Street, Suite 100, San Francisco, CA 94105</p>
                </div>
                <p className="text-white/80">We will respond to your inquiry within 30 days.</p>
              </div>
            </motion.section>

            {/* Updates */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-warm-linen/50 rounded-lg p-8 border border-deep-charcoal/10"
            >
              <h2 className="text-2xl font-display text-deep-charcoal mb-4">Policy Updates</h2>
              <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date below.</p>
              <p className="text-deep-charcoal/60"><strong>Last Updated:</strong> January 15, 2024</p>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
