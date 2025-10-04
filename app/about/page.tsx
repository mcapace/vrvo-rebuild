'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Target, Users, TrendingUp, Award, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';
import { MagneticButton } from '../components/MagneticButton';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-warm-linen">
      {/* Magnetic Cursor */}
      <MagneticCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-warm-linen to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4 md:mb-6">
              WHO WE ARE
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-deep-charcoal mb-6 md:mb-8 leading-tight">
              The Marketing Infrastructure Partner for Ambitious SMBs
            </h1>
            <p className="text-lg md:text-xl text-deep-charcoal/80 leading-relaxed mb-8 md:mb-12">
              We don't just run campaigns. We architect the complete marketing infrastructure that transforms $10K-100K/month businesses into market leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-rich-navy text-warm-linen px-6 md:px-8 py-3 md:py-4 rounded-sm font-medium hover:bg-burnt-orange transition-all duration-300 uppercase text-xs tracking-[0.1em] w-full sm:w-auto"
                >
                  Schedule Strategy Call
                </motion.button>
              </Link>
              <Link href="/case-studies">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-deep-charcoal text-deep-charcoal px-6 md:px-8 py-3 md:py-4 rounded-sm font-medium hover:bg-deep-charcoal hover:text-warm-linen transition-all duration-300 uppercase text-xs tracking-[0.1em] w-full sm:w-auto"
                >
                  View Our Case Studies
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.2 }}
            >
              <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
                OUR MISSION
              </div>
              <h2 className="text-3xl md:text-5xl font-display text-deep-charcoal mb-6 md:mb-8">
                Enterprise-Grade Marketing for SMBs
              </h2>
              <p className="text-lg text-deep-charcoal/80 leading-relaxed mb-8">
                Most agencies start with campaigns. We start with infrastructure. We build the marketing systems, processes, and team structures that Fortune 500s use—made accessible for ambitious SMBs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-burnt-orange" />
                  <span className="text-deep-charcoal">Enterprise DSP relationships</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-burnt-orange" />
                  <span className="text-deep-charcoal">AI-powered optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-burnt-orange" />
                  <span className="text-deep-charcoal">Complete MarTech integration</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.2 }}
              className="bg-gradient-to-br from-rich-navy to-deep-charcoal rounded-2xl p-8 text-white"
            >
              <div className="text-4xl font-display mb-6">Our Approach</div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-burnt-orange rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Discovery & Audit</h3>
                    <p className="text-white/80 text-sm">Deep dive into your current marketing infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-burnt-orange rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Strategic Architecture</h3>
                    <p className="text-white/80 text-sm">Build bespoke growth blueprint and implementation plan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-burnt-orange rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Infrastructure Build</h3>
                    <p className="text-white/80 text-sm">Implement MarTech stack and automation systems</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-warm-linen">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
              MEET THE TEAM
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              Built by Marketing Infrastructure Experts
            </h2>
            <p className="text-lg text-deep-charcoal/80 max-w-3xl mx-auto">
              Our team combines Fortune 500 marketing experience with SMB growth expertise to deliver enterprise-grade results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Founder & CEO",
                bio: "Former VP of Marketing at Fortune 500 tech company. 15+ years building marketing infrastructure for scale.",
                expertise: ["Programmatic Advertising", "Marketing Automation", "Team Building"]
              },
              {
                name: "Marcus Rodriguez",
                role: "Head of Strategy",
                bio: "Ex-McKinsey consultant specializing in SMB growth transformation. Led 50+ business infrastructure projects.",
                expertise: ["Strategic Planning", "Process Optimization", "Data Analytics"]
              },
              {
                name: "Dr. Emily Watson",
                role: "Head of Technology",
                bio: "Former Google Ads engineer. Built the MarTech stacks for 200+ companies scaling from $1M to $100M.",
                expertise: ["MarTech Integration", "AI Optimization", "Technical Architecture"]
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ amount: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-20 h-20 bg-rich-navy/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-rich-navy" />
                </div>
                <h3 className="text-2xl font-display text-deep-charcoal mb-2">{member.name}</h3>
                <p className="text-burnt-orange font-medium mb-4">{member.role}</p>
                <p className="text-deep-charcoal/80 mb-6">{member.bio}</p>
                <div className="space-y-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <div key={skillIndex} className="text-sm text-rich-navy font-medium">
                      • {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rich-navy">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-h2 font-display text-warm-linen">
              Ready to Compete on Strategy?
            </h2>
            <p className="text-xl text-warm-linen/90 max-w-2xl mx-auto">
              Stop competing on budget. Let's build the marketing infrastructure that transforms your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <MagneticButton className="bg-warm-linen text-rich-navy px-8 py-4 rounded-sm hover:bg-burnt-orange hover:text-warm-linen transition-all duration-300 font-medium">
                  Schedule Strategy Call
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </MagneticButton>
              </Link>
              <Link href="/services">
                <MagneticButton className="border border-warm-linen text-warm-linen px-8 py-4 rounded-sm hover:bg-warm-linen hover:text-rich-navy transition-all duration-300 font-medium">
                  Download Our Approach
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
