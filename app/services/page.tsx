'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Lightbulb, ArrowRight, CheckCircle, BarChart3, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';
import { MagneticButton } from '../components/MagneticButton';
import Footer from '../components/Footer';

export default function Services() {
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
              FULL-STACK CAPABILITIES
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-deep-charcoal mb-6 md:mb-8 leading-tight">
              Three Pillars. One Unified Strategy.
            </h1>
            <p className="text-lg md:text-xl text-deep-charcoal/80 leading-relaxed mb-8 md:mb-12">
              Most agencies do one thing. We architect complete growth systems that transform your business infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {/* Programmatic Advertising */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ amount: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-lg p-8 border-l-4 border-rich-navy hover:shadow-xl hover:bg-white/90 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-burnt-orange text-9xl font-bold opacity-10 -mr-4 -mt-4">
                01
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-rich-navy/10 rounded-lg flex items-center justify-center group-hover:bg-rich-navy/20 transition-colors">
                  <Target className="w-6 h-6 text-rich-navy" />
                </div>
                <div>
                  <h3 className="text-3xl font-display text-deep-charcoal mb-2">
                    Programmatic Advertising
                  </h3>
                  <p className="text-burnt-orange text-sm uppercase tracking-widest">
                    Precision at scale
                  </p>
                </div>
                <p className="text-deep-charcoal/80 leading-relaxed">
                  Enterprise DSP relationships and AI-powered bidding strategies that Fortune 500s use. Real-time optimization across display, video, native, and CTV.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-rich-navy">$50M+ annual spend managed</div>
                  <div className="font-mono text-rich-navy">2.8x average ROAS improvement</div>
                  <div className="font-mono text-rich-navy">94% campaign success rate</div>
                </div>
                <div className="pt-4">
                  <button className="text-rich-navy font-medium hover:text-rich-navy/80 transition-colors flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Strategic Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ amount: 0.2 }}
              className="bg-warm-linen/80 backdrop-blur-xl rounded-lg p-8 border border-deep-charcoal/10 hover:shadow-xl hover:bg-warm-linen/90 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-burnt-orange text-9xl font-bold opacity-10 -mr-4 -mt-4">
                02
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-rich-navy/10 rounded-lg flex items-center justify-center group-hover:bg-rich-navy/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-rich-navy" />
                </div>
                <div>
                  <h3 className="text-3xl font-display text-deep-charcoal mb-2">
                    Strategic Marketing
                  </h3>
                  <p className="text-burnt-orange text-sm uppercase tracking-widest">
                    Integrated execution
                  </p>
                </div>
                <p className="text-deep-charcoal/80 leading-relaxed">
                  Cross-channel orchestration that connects every touchpoint. From awareness to conversion, we build systems that work together.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-rich-navy">360° campaign integration</div>
                  <div className="font-mono text-rich-navy">Multi-touch attribution</div>
                  <div className="font-mono text-rich-navy">Unified customer journey</div>
                </div>
                <div className="pt-4">
                  <button className="text-rich-navy font-medium hover:text-rich-navy/80 transition-colors flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Business Transformation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ amount: 0.2 }}
              className="bg-deep-charcoal/90 backdrop-blur-xl text-warm-linen rounded-lg p-8 hover:shadow-xl hover:bg-deep-charcoal hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-burnt-orange text-9xl font-bold opacity-10 -mr-4 -mt-4">
                03
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-copper/20 rounded-lg flex items-center justify-center group-hover:bg-burnt-orange/30 transition-colors">
                  <Lightbulb className="w-6 h-6 text-burnt-orange" />
                </div>
                <div>
                  <h3 className="text-3xl font-display text-warm-linen mb-2">
                    Business Transformation
                  </h3>
                  <p className="text-burnt-orange text-sm uppercase tracking-widest">
                    Infrastructure that scales
                  </p>
                </div>
                <p className="text-warm-linen/80 leading-relaxed">
                  Beyond campaigns. We architect the marketing infrastructure, processes, and team structure that supports sustainable growth.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-burnt-orange">Marketing automation setup</div>
                  <div className="font-mono text-burnt-orange">Team structure optimization</div>
                  <div className="font-mono text-burnt-orange">Process standardization</div>
                </div>
                <div className="pt-4">
                  <button className="text-burnt-orange font-medium hover:text-burnt-orange/80 transition-colors flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
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
              ADDITIONAL CAPABILITIES
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              Complete Marketing Infrastructure
            </h2>
            <p className="text-lg text-deep-charcoal/80 max-w-3xl mx-auto">
              Beyond our core services, we provide the complete marketing infrastructure your business needs to scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Analytics & Reporting",
                description: "Advanced attribution modeling and real-time performance dashboards"
              },
              {
                icon: Users,
                title: "Team Training",
                description: "Comprehensive training programs for your marketing team"
              },
              {
                icon: Zap,
                title: "Marketing Automation",
                description: "Complete automation setup and optimization"
              },
              {
                icon: Target,
                title: "A/B Testing",
                description: "Systematic testing and optimization across all channels"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-rich-navy/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-rich-navy" />
                </div>
                <h3 className="text-xl font-display text-deep-charcoal mb-3">{service.title}</h3>
                <p className="text-deep-charcoal/80 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
              OUR PROCESS
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              How We Transform Your Marketing
            </h2>
            <p className="text-lg text-deep-charcoal/80 max-w-3xl mx-auto">
              Our proven methodology ensures every project delivers measurable results and sustainable growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Audit",
                description: "Deep dive into your current marketing infrastructure, processes, and team structure."
              },
              {
                step: "02",
                title: "Strategic Architecture",
                description: "Develop a bespoke growth blueprint with technology, channels, and implementation plan."
              },
              {
                step: "03",
                title: "Infrastructure Build",
                description: "Implement MarTech stack, data pipelines, and automation tools for scale."
              },
              {
                step: "04",
                title: "Campaign Launch",
                description: "Execute programmatic campaigns with precision and real-time optimization."
              },
              {
                step: "05",
                title: "Continuous Optimization",
                description: "Ongoing monitoring, testing, and strategic adjustments for maximum ROI."
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-rich-navy text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="text-xl font-display text-deep-charcoal mb-3">{phase.title}</h3>
                <p className="text-deep-charcoal/80 text-sm">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rich-navy text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
          >
            <h2 className="text-5xl font-display text-warm-linen mb-6">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl text-warm-linen/90 mb-12 max-w-3xl mx-auto">
              Let's discuss how our full-stack approach can accelerate your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <MagneticButton className="bg-warm-linen text-rich-navy px-6 md:px-8 py-3 md:py-4 rounded-sm font-medium hover:bg-burnt-orange hover:text-warm-linen transition-all duration-300 uppercase text-xs tracking-[0.1em] w-full sm:w-auto">
                  Schedule Strategy Call
                </MagneticButton>
              </Link>
              <Link href="/about">
                <MagneticButton className="border border-warm-linen text-warm-linen px-6 md:px-8 py-3 md:py-4 rounded-sm font-medium hover:bg-warm-linen hover:text-rich-navy transition-all duration-300 uppercase text-xs tracking-[0.1em] w-full sm:w-auto">
                  Download Service Guide
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
