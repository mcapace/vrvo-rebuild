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
      description: "Design and implement marketing technology stacks for growing businesses.",
      requirements: [
        "4+ years MarTech implementation experience",
        "HubSpot, Salesforce, or similar platform expertise",
        "Process automation and workflow design",
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
              JOIN OUR TEAM
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Build the Future of Marketing Infrastructure
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Join a team of marketing infrastructure experts transforming how SMBs compete with enterprise-grade systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-navy text-sm uppercase tracking-widest mb-4 font-medium">
              OUR CULTURE
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why Work at Vrvo?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-navy" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
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
              <h3 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-navy mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Competitive Compensation</p>
                    <p className="text-gray-600">Salary + equity for all team members</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-navy mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Flexible Work</p>
                    <p className="text-gray-600">Remote-first with flexible hours</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-navy mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Growth Opportunities</p>
                    <p className="text-gray-600">Learning budget and career development</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-navy mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Health & Wellness</p>
                    <p className="text-gray-600">Comprehensive health, dental, and vision coverage</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.2 }}
              className="bg-white border border-gray-200 rounded-2xl p-8"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h4>
              <p className="text-gray-600 mb-6">
                We're democratizing enterprise-grade marketing infrastructure for ambitious SMBs. 
                Every team member plays a crucial role in leveling the playing field.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-navy rounded-full mr-3"></div>
                  <span className="text-gray-600">Work with cutting-edge marketing technology</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-navy rounded-full mr-3"></div>
                  <span className="text-gray-600">Impact real business growth</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-navy rounded-full mr-3"></div>
                  <span className="text-gray-600">Collaborate with industry experts</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
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
              OPEN POSITIONS
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Current Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our team and help build the future of marketing infrastructure.
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
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {position.type}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {position.experience}
                      </div>
                    </div>
                  </div>
                  <MagneticButton className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy-hover transition-all duration-300 font-medium">
                    Apply Now
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </MagneticButton>
                </div>
                
                <p className="text-gray-600 mb-6">{position.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-navy rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {position.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-navy rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{benefit}</span>
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
              Don't See Your Role?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              We're always looking for exceptional talent. Send us your resume and tell us how you can help level the playing field.
            </p>
            <MagneticButton className="bg-navy text-white px-8 py-4 rounded-lg hover:bg-navy-hover transition-all duration-300 font-medium">
              Send Resume
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}