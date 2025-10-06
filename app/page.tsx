"use client";

import { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { 
  Target, 
  TrendUp, 
  Lightbulb, 
  ArrowRight,
  CheckCircle
} from '@phosphor-icons/react';
import Link from 'next/link';

// Import custom components
import { ScrambleText } from './components/ScrambleText';
import { AnimatedNumber } from './components/AnimatedNumber';
import { Marquee } from './components/Marquee';
import { MagneticButton } from './components/MagneticButton';
import Footer from './components/Footer';


// Word Reveal Animation
const WordReveal = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };
  
  const child = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <motion.h1 variants={container} initial="hidden" animate="visible" className={className}>
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-white relative">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-navy origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 h-20 bg-white/95 border-b border-gray-200 hover:bg-white transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logos/vrvo_wordmark_black.svg"
              alt="Vrvo"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-600 hover:text-navy transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group hover:scale-105">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-navy transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-navy transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group hover:scale-105">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-navy transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/case-studies" className="text-gray-600 hover:text-navy transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group hover:scale-105">
              Case Studies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-navy transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="bg-navy text-white px-6 py-3 rounded-sm hover:bg-navy-hover hover:shadow-lg hover:scale-105 transition-all duration-300 uppercase text-xs tracking-[0.1em] font-medium">
              Partner With Us
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Advanced Interactions */}
      <section className="h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - 60% */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-navy text-sm uppercase tracking-widest font-medium"
                >
                  Enterprise Marketing. SMB Accessibility.
                </motion.div>
                
                <div className="space-y-2">
                  <ScrambleText 
                    text="Don't Compete" 
                    className="text-7xl md:text-8xl font-bold text-gray-900 block leading-[0.9] tracking-tighter"
                    speed={50}
                  />
                  <ScrambleText 
                    text="On Budget." 
                    className="text-7xl md:text-8xl font-bold text-gray-900 block leading-[0.9] tracking-tighter"
                    speed={50}
                  />
                  <ScrambleText 
                    text="Compete On Strategy." 
                    className="text-7xl md:text-8xl font-bold text-navy block leading-[0.9] tracking-tighter"
                    speed={50}
                  />
                </div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-lg text-gray-600 max-w-2xl leading-relaxed"
                >
                  Vrvo brings programmatic advertising, integrated marketing, and business transformation consulting—normally reserved for enterprise—to ambitious small and mid-sized businesses.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/contact">
                    <MagneticButton className="bg-navy text-white px-8 py-4 rounded-sm hover:bg-navy-hover hover:shadow-xl transition-all duration-300 font-medium shadow-lg">
                      See What's Possible
                    </MagneticButton>
                  </Link>
                  <Link href="/services">
                    <MagneticButton className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-sm hover:bg-gray-50 hover:shadow-xl transition-all duration-300 font-medium shadow-md">
                      View Our Approach
                    </MagneticButton>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right Column - 40% - Floating Metric Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="bg-white rounded-lg p-8 shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                  <div className="space-y-6 relative z-10">
                    <div className="text-sm uppercase tracking-widest text-gray-600 font-medium">
                      Real Client Growth
                    </div>
                    <div className="font-mono text-8xl font-bold text-gray-900">
                      <ScrambleText 
                        text="3.4x" 
                        className="font-mono text-8xl font-bold text-gray-900"
                        speed={30}
                      />
                    </div>
                    <div className="text-gray-600 font-medium">
                      Average revenue increase, Year 1
                    </div>
                    <div className="h-16 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 bg-gray-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Elements */}
      <section id="services" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <div className="text-navy text-sm uppercase tracking-widest mb-4 font-medium">
              FULL-STACK CAPABILITIES
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Three Pillars. One Unified Strategy.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Most agencies do one thing. We architect complete growth systems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 relative items-stretch">
            {/* Card 1 - Programmatic */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ amount: 0.2 }}
              className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-gray-300 text-[120px] font-bold opacity-20 -mr-4 -mt-4">
                01
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Target className="w-8 h-8 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Programmatic Advertising
                  </h3>
                  <p className="text-navy text-sm uppercase tracking-widest font-medium">
                    Precision at scale
                  </p>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Enterprise DSP relationships and AI-powered bidding strategies that Fortune 500s use. Real-time optimization across display, video, native, and CTV.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-navy font-semibold">$50M+ annual spend managed</div>
                  <div className="font-mono text-navy font-semibold">2.8x average ROAS improvement</div>
                  <div className="font-mono text-navy font-semibold">94% campaign success rate</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Strategic Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ amount: 0.2 }}
              className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-gray-300 text-[120px] font-bold opacity-20 -mr-4 -mt-4">
                02
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <TrendUp className="w-8 h-8 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Strategic Marketing
                  </h3>
                  <p className="text-navy text-sm uppercase tracking-widest font-medium">
                    Integrated execution
                  </p>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Cross-channel orchestration that connects every touchpoint. From awareness to conversion, we build systems that work together.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-navy font-semibold">360° campaign integration</div>
                  <div className="font-mono text-navy font-semibold">Multi-touch attribution</div>
                  <div className="font-mono text-navy font-semibold">Unified customer journey</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Transformation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ amount: 0.2 }}
              className="bg-gray-900 text-white rounded-lg p-8 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-gray-700 text-[120px] font-bold opacity-20 -mr-4 -mt-4">
                03
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Business Transformation
                  </h3>
                  <p className="text-navy text-sm uppercase tracking-widest font-medium">
                    Infrastructure that scales
                  </p>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Beyond campaigns. We architect the marketing infrastructure, processes, and team structure that supports sustainable growth.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-white/90">Marketing automation setup</div>
                  <div className="font-mono text-white/90">Team structure optimization</div>
                  <div className="font-mono text-white/90">Process standardization</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <div className="text-navy text-sm uppercase tracking-widest mb-4 font-medium">OUR APPROACH</div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              A Proven Path to Growth
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Most agencies start at #4. We start at #1, building a solid foundation for lasting success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { num: '01', title: 'Discovery & Audit', description: 'Deep dive into your current marketing, sales, and operational infrastructure to identify opportunities.' },
              { num: '02', title: 'Strategic Architecture', description: 'Develop a bespoke growth blueprint, outlining technology, channels, and a phased implementation plan.' },
              { num: '03', title: 'Infrastructure Build', description: 'Implement and integrate the necessary MarTech stack, data pipelines, and automation tools.' },
              { num: '04', title: 'Campaign Launch', description: 'Execute programmatic campaigns and integrated marketing initiatives with precision and real-time optimization.' },
              { num: '05', title: 'Continuous Optimization', description: 'Ongoing monitoring, A/B testing, and strategic adjustments to maximize ROI and adapt to market changes.' },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
              >
                <div className="text-6xl font-bold text-gray-300 mb-4">{phase.num}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  {phase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section with Animated Counters */}
      <section id="proof" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Built for Businesses That Think Bigger
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { value: 340, label: "Average ROI increase", suffix: "%" },
              { value: 94, label: "Client retention rate", suffix: "%" },
              { value: 12, label: "Month average engagement", suffix: " months" },
              { value: 2.4, label: "Average client revenue", suffix: "M" },
              { value: 200, label: "Campaigns optimized", suffix: "+" },
              { value: 8, label: "Figure ad spend managed", suffix: "-figure" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="text-center p-8 bg-white rounded-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 group"
              >
                <div className="font-mono text-6xl font-bold text-gray-900 mb-4 group-hover:text-navy transition-colors duration-300">
                  <ScrambleText 
                    text={`${stat.value}${stat.suffix}`}
                    className="font-mono text-6xl font-bold text-gray-900"
                    speed={40}
                  />
                </div>
                <div className="text-gray-600 font-medium text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Advanced Infinite Marquee */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Expertise</h3>
            <p className="text-gray-600">Comprehensive marketing solutions for ambitious businesses</p>
          </div>
          <Marquee 
            items={[
              "Programmatic Advertising",
              "Strategic Marketing", 
              "Business Transformation",
              "Data Analytics",
              "Marketing Automation",
              "Performance Optimization",
              "Cross-Channel Integration",
              "ROI Maximization",
              "Customer Journey Mapping",
              "Attribution Modeling",
              "Campaign Optimization",
              "Revenue Growth"
            ]}
            speed={30}
            direction="left"
            className="py-4"
          />
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Why Vrvo Works Differently
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "No Bullshit Metrics",
                description: "We track pipeline revenue, not vanity metrics. If it doesn't impact your bottom line, we don't report it."
              },
              {
                title: "Built to Scale",
                description: "Your $10K/month campaign gets the same strategic rigor as $100K/month. Infrastructure built for growth, not band-aids."
              },
              {
                title: "Transparent Economics",
                description: "See our markup. See our DSP fees. See exactly where every dollar goes. Zero hidden costs."
              },
              {
                title: "Strategic, Not Transactional",
                description: "Month-to-month partnerships. Stay because we deliver results, not because you're locked in."
              }
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-navy/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-navy" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {principle.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Enterprise Stack. SMB Accessibility.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These platforms have $50K+ minimums. We have enterprise agreements that let our clients access them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Paid Media",
                platforms: ["Trade Desk", "Google DV360", "Meta", "LinkedIn"],
                description: "Programmatic advertising at enterprise scale"
              },
              {
                title: "Marketing Infrastructure",
                platforms: ["HubSpot", "Salesforce", "Marketo", "Pardot"],
                description: "MarTech and CRM integration"
              },
              {
                title: "Analytics & Optimization",
                platforms: ["Google Analytics 4", "Adobe Analytics", "Mixpanel", "Amplitude"],
                description: "Data platforms for optimization"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <div className="space-y-2 mb-4">
                  {category.platforms.map((platform, i) => (
                    <div key={i} className="text-sm text-navy font-mono">
                      {platform}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Ready to Compete on Strategy?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              See how Vrvo can transform your marketing from cost center to growth engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <MagneticButton className="bg-navy text-white px-8 py-4 rounded-sm hover:bg-navy-hover hover:shadow-xl transition-all duration-300 font-medium">
                  Schedule Strategy Call
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </MagneticButton>
              </Link>
              <Link href="/case-studies">
                <MagneticButton className="border-2 border-white text-white px-8 py-4 rounded-sm hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium">
                  See Our Case Studies
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