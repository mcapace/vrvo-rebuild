'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-warm-linen">
      {/* Magnetic Cursor */}
      <MagneticCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-warm-linen to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-6">
              GET STARTED
            </div>
            <h1 className="text-6xl md:text-7xl font-display text-deep-charcoal mb-8 leading-tight">
              Ready to Compete on Strategy?
            </h1>
            <p className="text-xl text-deep-charcoal/80 leading-relaxed mb-12">
              Let's discuss how our marketing infrastructure approach can transform your business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display text-deep-charcoal mb-6">
                  Schedule Your Strategy Call
                </h2>
                <p className="text-deep-charcoal/80 mb-8">
                  Tell us about your business and we'll prepare a custom growth strategy for our call.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-burnt-orange mx-auto mb-4" />
                    <h3 className="text-2xl font-display text-deep-charcoal mb-2">Thank You!</h3>
                    <p className="text-deep-charcoal/80">We'll be in touch within 24 hours to schedule your strategy call.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-deep-charcoal mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-deep-charcoal/20 rounded-lg focus:ring-2 focus:ring-rich-navy focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-deep-charcoal mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-deep-charcoal/20 rounded-lg focus:ring-2 focus:ring-rich-navy focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-deep-charcoal mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-deep-charcoal/20 rounded-lg focus:ring-2 focus:ring-rich-navy focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-deep-charcoal mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-deep-charcoal/20 rounded-lg focus:ring-2 focus:ring-rich-navy focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-deep-charcoal mb-2">
                          Monthly Marketing Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-deep-charcoal/20 rounded-lg focus:ring-2 focus:ring-rich-navy focus:border-transparent transition-colors"
                        >
                          <option value="">Select Budget Range</option>
                          <option value="10k-25k">$10K - $25K</option>
                          <option value="25k-50k">$25K - $50K</option>
                          <option value="50k-100k">$50K - $100K</option>
                          <option value="100k+">$100K+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-deep-charcoal mb-2">
                          Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-deep-charcoal/20 rounded-lg focus:ring-2 focus:ring-rich-navy focus:border-transparent transition-colors"
                        >
                          <option value="">Select Timeline</option>
                          <option value="immediate">Immediate (1-2 weeks)</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6months+">6+ months</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Tell us about your current marketing challenges *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-deep-charcoal/20 rounded-lg focus:ring-2 focus:ring-rich-navy focus:border-transparent transition-colors"
                        placeholder="What's your biggest marketing challenge right now?"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-rich-navy text-white px-8 py-4 rounded-lg font-medium hover:bg-rich-navy/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Schedule Strategy Call <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display text-deep-charcoal mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-deep-charcoal/80 mb-8">
                  Ready to transform your marketing? Let's discuss how our infrastructure approach can accelerate your growth.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rich-navy/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-rich-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-charcoal mb-1">Email</h3>
                    <p className="text-deep-charcoal/80">hello@vrvo.co</p>
                    <p className="text-sm text-deep-charcoal/60">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rich-navy/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-rich-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-charcoal mb-1">Phone</h3>
                    <p className="text-deep-charcoal/80">+1 (555) 123-4567</p>
                    <p className="text-sm text-deep-charcoal/60">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rich-navy/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-rich-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-charcoal mb-1">Office</h3>
                    <p className="text-deep-charcoal/80">123 Marketing Ave<br />New York, NY 10001</p>
                    <p className="text-sm text-deep-charcoal/60">By appointment only</p>
                  </div>
                </div>
              </div>

              <div className="bg-warm-linen rounded-lg p-6">
                <h3 className="font-semibold text-deep-charcoal mb-3">What to Expect</h3>
                <ul className="space-y-2 text-sm text-deep-charcoal/80">
                  <li>• 30-minute strategy assessment</li>
                  <li>• Custom growth recommendations</li>
                  <li>• No sales pitch, just value</li>
                  <li>• Follow-up with detailed proposal</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-warm-linen">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
              FREQUENTLY ASKED
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                question: "What makes Vrvo different from other marketing agencies?",
                answer: "Most agencies start with campaigns. We start with infrastructure. We build the complete marketing systems, processes, and team structures that Fortune 500s use—made accessible for SMBs."
              },
              {
                question: "What's your minimum engagement?",
                answer: "We work with businesses spending $10K-100K+ monthly on marketing. Our minimum engagement is typically 6 months to ensure proper infrastructure implementation."
              },
              {
                question: "How long does it take to see results?",
                answer: "Infrastructure improvements show results in 30-60 days. Full transformation typically takes 6-12 months. We provide detailed timelines during our strategy call."
              },
              {
                question: "Do you work with businesses outside the US?",
                answer: "Yes, we work with businesses globally. Our infrastructure approach works across markets, though we may recommend local partners for certain regions."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="bg-white rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-deep-charcoal mb-3">{faq.question}</h3>
                <p className="text-deep-charcoal/80">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
