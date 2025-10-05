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
      icon: TrendingUp
    },
    {
      company: "GrowthCorp Manufacturing",
      industry: "B2B Manufacturing",
      challenge: "Limited brand awareness and lead generation in competitive market",
      solution: "Strategic multi-channel campaign with programmatic display and account-based marketing",
      results: {
        revenue: "180%",
        roas: "3.2x",
        efficiency: "45%",
        timeline: "8 months"
      },
      description: "GrowthCorp needed to establish market presence and generate qualified leads in a crowded B2B manufacturing space.",
      keyMetrics: [
        "180% increase in qualified leads",
        "3.2x ROAS improvement",
        "45% reduction in cost per lead",
        "New market expansion"
      ],
      icon: Target
    },
    {
      company: "DataVault Systems",
      industry: "Enterprise Software",
      challenge: "Complex sales cycle with long decision-making processes",
      solution: "Account-based marketing with programmatic advertising and sales enablement",
      results: {
        revenue: "250%",
        roas: "2.5x",
        efficiency: "35%",
        timeline: "10 months"
      },
      description: "DataVault faced long sales cycles and complex decision-making processes. We implemented a comprehensive ABM strategy.",
      keyMetrics: [
        "250% increase in enterprise deals",
        "2.5x ROAS improvement",
        "35% faster sales cycles",
        "Improved deal quality"
      ],
      icon: Users
    }
  ];

  const stats = [
    { label: "Average Revenue Increase", value: "250%", icon: DollarSign },
    { label: "Average ROAS Improvement", value: "2.8x", icon: TrendingUp },
    { label: "Average Efficiency Gain", value: "47%", icon: BarChart3 },
    { label: "Client Retention Rate", value: "94%", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Magnetic Cursor */}
      <MagneticCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-navy text-sm uppercase tracking-widest mb-6 font-medium">
              SUCCESS STORIES
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Real Results, Real Growth
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              See how we've helped ambitious businesses transform their marketing from cost center to growth engine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-navy text-sm uppercase tracking-widest mb-4 font-medium">
              CASE STUDIES
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Client Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Detailed breakdowns of how we've transformed marketing performance for our clients.
            </p>
          </motion.div>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ amount: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <study.icon className="w-6 h-6 text-navy" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{study.company}</h3>
                        <p className="text-gray-600">{study.industry}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                        <p className="text-gray-600">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Results</h4>
                        <ul className="space-y-2">
                          {study.keyMetrics.map((metric, metricIndex) => (
                            <li key={metricIndex} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-navy rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Results Summary</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-navy mb-1">{study.results.revenue}</div>
                          <div className="text-sm text-gray-600">Revenue Increase</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-navy mb-1">{study.results.roas}</div>
                          <div className="text-sm text-gray-600">ROAS Improvement</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-navy mb-1">{study.results.efficiency}</div>
                          <div className="text-sm text-gray-600">Efficiency Gain</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-navy mb-1">{study.results.timeline}</div>
                          <div className="text-sm text-gray-600">Timeline</div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{study.description}</p>
                    
                    <MagneticButton className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy-hover transition-all duration-300 font-medium">
                      Read Full Case Study
                      <ArrowRight className="inline-block ml-2 w-4 h-4" />
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Let's discuss how we can help transform your marketing performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <MagneticButton className="bg-navy text-white px-8 py-4 rounded-lg hover:bg-navy-hover transition-all duration-300 font-medium">
                  Schedule Consultation
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </MagneticButton>
              </Link>
              <Link href="/services">
                <MagneticButton className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium">
                  View Our Services
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