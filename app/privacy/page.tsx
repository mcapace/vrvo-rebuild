'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, Eye, Lock, Users, Globe, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';
import Footer from '../components/Footer';

export default function Privacy() {
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
              PRIVACY & DATA PROTECTION
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-deep-charcoal mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-deep-charcoal/80 leading-relaxed max-w-3xl mx-auto">
              Your privacy and trust are fundamental to our business. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center gap-2 text-deep-charcoal/60 text-sm mt-6">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: January 1, 2025</span>
            </div>
          </motion.div>

          <div className="prose prose-lg max-w-none text-deep-charcoal/80 leading-relaxed space-y-12">
            
            {/* Information We Collect */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Personal Information</h3>
                  <p className="mb-4">We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fill out contact forms or request consultations</li>
                    <li>Subscribe to our newsletter or blog</li>
                    <li>Engage with our services</li>
                    <li>Communicate with us via email or phone</li>
                    <li>Participate in surveys or feedback</li>
                  </ul>
                  <p className="mt-4">This may include your name, email address, phone number, company information, job title, and any other information you choose to provide.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Automatically Collected Information</h3>
                  <p className="mb-4">When you visit our website, we automatically collect certain information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Third-Party Information</h3>
                  <p>We may receive information about you from third parties, such as business partners, social media platforms, or publicly available sources.</p>
                </div>
              </div>
            </motion.section>

            {/* How We Use Information */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Service Delivery</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Respond to your comments and questions</li>
                    <li>Deliver customer support</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Communication</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Provide marketing communications (with your consent)</li>
                    <li>Send newsletters and blog updates</li>
                    <li>Respond to your inquiries</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Business Operations</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Develop new products and services</li>
                    <li>Monitor and analyze trends and usage</li>
                    <li>Improve website functionality and user experience</li>
                    <li>Conduct research and analytics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Legal Compliance</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Comply with legal obligations</li>
                    <li>Protect our rights and interests</li>
                    <li>Prevent fraud and abuse</li>
                    <li>Enforce our terms of service</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Information Sharing */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Information Sharing</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">We Do Not Sell Your Information</h3>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties for monetary consideration.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">When We Share Information</h3>
                  <p className="mb-4">We may share your information in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating our website and conducting our business</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>Consent:</strong> When you have given us explicit consent to share your information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Data Processing</h3>
                  <p>When we share information with service providers, we ensure they:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Only use the information for the purposes we specify</li>
                    <li>Maintain appropriate security measures</li>
                    <li>Comply with applicable privacy laws</li>
                    <li>Do not use the information for their own purposes</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Data Security */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Data Security</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Security Measures</h3>
                  <p className="mb-4">We implement appropriate security measures to protect your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication</li>
                    <li>Employee training on data protection</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Data Breach Response</h3>
                  <p>In the unlikely event of a data breach, we will:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Notify affected individuals within 72 hours</li>
                    <li>Report to relevant authorities as required</li>
                    <li>Take immediate steps to contain the breach</li>
                    <li>Conduct a thorough investigation</li>
                    <li>Implement additional security measures</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Limitations</h3>
                  <p>While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
                </div>
              </div>
            </motion.section>

            {/* Your Rights */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Your Rights</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Access and Control</h3>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                    <li><strong>Correction:</strong> Correct inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Receive your data in a structured format</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information</li>
                    <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Marketing Communications</h3>
                  <p>You can opt out of marketing communications at any time by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Clicking the unsubscribe link in our emails</li>
                    <li>Contacting us directly</li>
                    <li>Updating your preferences in your account</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Exercising Your Rights</h3>
                  <p>To exercise any of these rights, please contact us at privacy@vrvo.com. We will respond to your request within 30 days.</p>
                </div>
              </div>
            </motion.section>

            {/* Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Cookies and Tracking</h2>
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
                    <div>
                      <h4 className="font-semibold text-deep-charcoal mb-2">Marketing Cookies</h4>
                      <p>These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Managing Cookies</h3>
                  <p>You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.</p>
                </div>
              </div>
            </motion.section>

            {/* Data Retention */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-deep-charcoal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-rich-navy" />
                <h2 className="text-2xl font-display text-deep-charcoal">Data Retention</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Retention Periods</h3>
                  <p className="mb-4">We retain your personal information for as long as necessary to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide our services to you</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes and enforce agreements</li>
                    <li>Improve our services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-3">Deletion</h3>
                  <p>When we no longer need your information, we will securely delete or anonymize it. Some information may be retained for longer periods if required by law.</p>
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
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-rich-navy text-white rounded-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-burnt-orange" />
                <h2 className="text-2xl font-display">Contact Us</h2>
              </div>
              
              <div className="space-y-4">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@vrvo.co</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 1580 N Logan St Ste 660, Denver, CO 80203-1994</p>
                </div>
                <p className="text-white/80">We will respond to your inquiry within 30 days.</p>
              </div>
            </motion.section>

            {/* Updates */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-warm-linen/50 rounded-lg p-8 border border-deep-charcoal/10"
            >
              <h2 className="text-2xl font-display text-deep-charcoal mb-4">Policy Updates</h2>
              <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
              <p className="text-deep-charcoal/60"><strong>Last Updated:</strong> January 1, 2025</p>
            </motion.section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
