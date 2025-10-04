'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Target, Users, DollarSign, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';
import { MagneticButton } from '../components/MagneticButton';
import Footer from '../components/Footer';

export default function CaseStudies() {
  const caseStudies = [
    {
      company: "TechFlow Solutions",
      industry: "SaaS",
      challenge: "Struggling to scale beyond $2M ARR with inefficient marketing spend and poor attribution",
      solution: "Complete marketing infrastructure rebuild with programmatic advertising and automation",
      results: {
        revenue: "340%",
        roas: "2.8x",
        efficiency: "60%",
        timeline: "12 months"
      },
      description: "TechFlow was stuck at $2M ARR with 40% of their marketing budget wasted on inefficient channels. We rebuilt their entire marketing infrastructure from the ground up.",
      keyMetrics: [
        "$2M → $8.8M ARR in 12 months",
        "2.8x ROAS improvement",
        "60% reduction in CAC",
        "340% revenue increase"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      company: "MediCare Plus",
      industry: "Healthcare",
      challenge: "Needed to compete with larger healthcare providers while maintaining compliance",
      solution: "Strategic marketing transformation with HIPAA-compliant automation and targeted campaigns",
      results: {
        revenue: "280%",
        roas: "3.2x",
        efficiency: "45%",
        timeline: "18 months"
      },
      description: "MediCare Plus needed to scale patient acquisition while maintaining strict HIPAA compliance. We built a complete marketing system that delivered enterprise results.",
      keyMetrics: [
        "280% increase in patient acquisition",
        "3.2x ROAS across all channels",
        "45% reduction in cost per acquisition",
        "HIPAA-compliant automation"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      company: "EcoBuild Materials",
      industry: "Manufacturing",
      challenge: "B2B lead generation was inconsistent and expensive with no clear attribution",
      solution: "B2B programmatic advertising with account-based marketing and sales automation",
      results: {
        revenue: "420%",
        roas: "4.1x",
        efficiency: "70%",
        timeline: "15 months"
      },
      description: "EcoBuild was spending $200K/month on marketing with no clear ROI. We implemented a complete B2B marketing infrastructure that transformed their lead generation.",
      keyMetrics: [
        "420% increase in qualified leads",
        "4.1x ROAS improvement",
        "70% reduction in cost per lead",
        "Complete sales automation"
      ],
      image: "/api/placeholder/600/400"
    }
  ];

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
              PROVEN RESULTS
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-deep-charcoal mb-6 md:mb-8 leading-tight">
              Real Results for Real Businesses
            </h1>
            <p className="text-lg md:text-xl text-deep-charcoal/80 leading-relaxed mb-8 md:mb-12">
              See how we've transformed businesses across industries with our complete marketing infrastructure approach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ amount: 0.2 }}
              className={`mb-20 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} lg:flex gap-16 items-center`}
            >
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-rich-navy to-deep-charcoal rounded-2xl p-8 text-white mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-burnt-orange rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display">{study.company}</h3>
                      <p className="text-white/80">{study.industry}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-burnt-orange mb-1">{study.results.revenue}</div>
                      <div className="text-sm text-white/80">Revenue Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-burnt-orange mb-1">{study.results.roas}</div>
                      <div className="text-sm text-white/80">ROAS Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-burnt-orange mb-1">{study.results.efficiency}</div>
                      <div className="text-sm text-white/80">Efficiency Gain</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-burnt-orange mb-1">{study.results.timeline}</div>
                      <div className="text-sm text-white/80">Timeline</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="mb-6">
                  <h4 className="text-xl font-display text-deep-charcoal mb-4">The Challenge</h4>
                  <p className="text-deep-charcoal/80 mb-6">{study.challenge}</p>
                  
                  <h4 className="text-xl font-display text-deep-charcoal mb-4">Our Solution</h4>
                  <p className="text-deep-charcoal/80 mb-6">{study.solution}</p>
                  
                  <h4 className="text-xl font-display text-deep-charcoal mb-4">Key Results</h4>
                  <div className="space-y-2">
                    {study.keyMetrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-burnt-orange rounded-full"></div>
                        <span className="text-deep-charcoal">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-rich-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-rich-navy/90 transition-colors flex items-center gap-2"
                >
                  Read Full Case Study <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
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
              CUMULATIVE RESULTS
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              Built for Businesses That Think Bigger
            </h2>
            <p className="text-lg text-deep-charcoal/80 max-w-3xl mx-auto">
              Our clients don't just grow—they transform into market leaders.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, value: "340%", label: "Average ROI increase" },
              { icon: Users, value: "94%", label: "Client retention rate" },
              { icon: DollarSign, value: "12", label: "Month average engagement" },
              { icon: BarChart3, value: "2.4M", label: "Average client revenue" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-rich-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-rich-navy" />
                </div>
                <div className="text-4xl font-bold text-deep-charcoal mb-2">{stat.value}</div>
                <div className="text-deep-charcoal/80">{stat.label}</div>
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
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-warm-linen/90 max-w-2xl mx-auto">
              Let's discuss how we can transform your business with the same proven approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <MagneticButton className="bg-warm-linen text-rich-navy px-8 py-4 rounded-sm hover:bg-burnt-orange hover:text-warm-linen transition-all duration-300 font-medium">
                  Schedule Strategy Call
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </MagneticButton>
              </Link>
              <Link href="/case-studies">
                <MagneticButton className="border border-warm-linen text-warm-linen px-8 py-4 rounded-sm hover:bg-warm-linen hover:text-rich-navy transition-all duration-300 font-medium">
                  Download Case Studies
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
