'use client';

import { motion } from 'framer-motion';
import { Users, MapPin, Clock, ArrowRight, CheckCircle, Star, Heart, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';
import { MagneticButton } from '../components/MagneticButton';
import Footer from '../components/Footer';

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Programmatic Strategist",
      location: "Remote / New York",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead programmatic advertising strategies for enterprise clients, managing $50M+ annual ad spend.",
      requirements: [
        "5+ years programmatic advertising experience",
        "DSP platform expertise (Trade Desk, DV360, etc.)",
        "Advanced analytics and attribution modeling",
        "Client management and team leadership"
      ],
      benefits: ["Competitive salary", "Equity", "Unlimited PTO", "Health/Dental/Vision"]
    },
    {
      title: "Marketing Infrastructure Consultant",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "4+ years",
      description: "Design and implement complete marketing technology stacks for SMB clients scaling to enterprise.",
      requirements: [
        "4+ years MarTech implementation experience",
        "HubSpot, Salesforce, Marketo expertise",
        "Marketing automation and data integration",
        "SMB to enterprise scaling experience"
      ],
      benefits: ["Competitive salary", "Equity", "Unlimited PTO", "Health/Dental/Vision"]
    },
    {
      title: "Business Transformation Manager",
      location: "Remote / Austin",
      type: "Full-time",
      experience: "6+ years",
      description: "Lead organizational transformation projects, building marketing teams and processes for rapid growth.",
      requirements: [
        "6+ years business transformation experience",
        "Team building and organizational design",
        "Process optimization and standardization",
        "Change management and training"
      ],
      benefits: ["Competitive salary", "Equity", "Unlimited PTO", "Health/Dental/Vision"]
    }
  ];

  const values = [
    {
      icon: Star,
      title: "Excellence",
      description: "We deliver enterprise-grade results for every client, regardless of size."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Transparent communication and honest assessment drive all our relationships."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in marketing infrastructure."
    }
  ];

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
              JOIN OUR TEAM
            </div>
            <h1 className="text-6xl md:text-7xl font-display text-deep-charcoal mb-8 leading-tight">
              Build the Future of Marketing Infrastructure
            </h1>
            <p className="text-xl text-deep-charcoal/80 leading-relaxed mb-12">
              Join a team of marketing infrastructure experts transforming how SMBs compete with enterprise-grade systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Culture */}
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
              OUR CULTURE
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              Why Work at Vrvo?
            </h2>
            <p className="text-lg text-deep-charcoal/80 max-w-3xl mx-auto">
              We're building the marketing infrastructure that levels the playing field for ambitious SMBs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-rich-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-rich-navy" />
                </div>
                <h3 className="text-xl font-display text-deep-charcoal mb-3">{value.title}</h3>
                <p className="text-deep-charcoal/80">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.2 }}
            >
              <h3 className="text-3xl font-display text-deep-charcoal mb-6">
                What We Offer
              </h3>
              <div className="space-y-4">
                {[
                  "Competitive salary and equity participation",
                  "Unlimited PTO and flexible work arrangements",
                  "Comprehensive health, dental, and vision coverage",
                  "Professional development and conference budgets",
                  "Top-tier equipment and home office setup",
                  "Annual team retreats and company events"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-burnt-orange" />
                    <span className="text-deep-charcoal">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.2 }}
              className="bg-gradient-to-br from-rich-navy to-deep-charcoal rounded-2xl p-8 text-white"
            >
              <h4 className="text-2xl font-display mb-6">Our Mission</h4>
              <p className="text-white/80 leading-relaxed mb-6">
                We're democratizing enterprise-grade marketing infrastructure for ambitious SMBs. 
                Every day, we help businesses compete on strategy, not just budget.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-burnt-orange mb-1">50+</div>
                  <div className="text-sm text-white/80">Clients Transformed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-burnt-orange mb-1">340%</div>
                  <div className="text-sm text-white/80">Average ROI Increase</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
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
              OPEN POSITIONS
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              Join Our Team
            </h2>
            <p className="text-lg text-deep-charcoal/80 max-w-3xl mx-auto">
              We're looking for marketing infrastructure experts who want to transform how SMBs compete.
            </p>
          </motion.div>

          <div className="space-y-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-display text-deep-charcoal mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-deep-charcoal/80">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {position.experience}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-rich-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-rich-navy/90 transition-colors flex items-center gap-2 mt-4 lg:mt-0"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <p className="text-deep-charcoal/80 mb-6">{position.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-deep-charcoal mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start gap-2 text-sm text-deep-charcoal/80">
                          <div className="w-1.5 h-1.5 bg-burnt-orange rounded-full mt-2 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-charcoal mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {position.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 text-sm text-deep-charcoal/80">
                          <div className="w-1.5 h-1.5 bg-burnt-orange rounded-full mt-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
              APPLICATION PROCESS
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              How to Apply
            </h2>
            <p className="text-lg text-deep-charcoal/80 max-w-3xl mx-auto">
              We've designed our application process to be thorough but respectful of your time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Application",
                description: "Submit your resume and cover letter through our application form."
              },
              {
                step: "02",
                title: "Initial Screen",
                description: "30-minute video call to discuss your background and interest."
              },
              {
                step: "03",
                title: "Technical Interview",
                description: "Deep dive into your technical skills and problem-solving approach."
              },
              {
                step: "04",
                title: "Final Interview",
                description: "Meet the team and discuss culture fit and growth opportunities."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-rich-navy text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-display text-deep-charcoal mb-3">{step.title}</h3>
                <p className="text-deep-charcoal/80 text-sm">{step.description}</p>
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
              Ready to Transform Marketing?
            </h2>
            <p className="text-xl text-warm-linen/90 max-w-2xl mx-auto">
              Join us in building the marketing infrastructure that levels the playing field for ambitious SMBs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton className="bg-warm-linen text-rich-navy px-8 py-4 rounded-sm hover:bg-burnt-orange hover:text-warm-linen transition-all duration-300 font-medium">
                View All Positions <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </MagneticButton>
              <MagneticButton className="border border-warm-linen text-warm-linen px-8 py-4 rounded-sm hover:bg-warm-linen hover:text-rich-navy transition-all duration-300 font-medium">
                Learn About Our Culture
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
