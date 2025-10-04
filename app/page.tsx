"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';
import { 
  Target, 
  TrendUp, 
  Lightbulb, 
  ArrowRight,
  CheckCircle,
  List,
  X
} from '@phosphor-icons/react';
import Link from 'next/link';

// Import custom components
import { ScrambleText } from './components/ScrambleText';
import { MagneticCursor } from './components/MagneticCursor';
import { AnimatedNumber } from './components/AnimatedNumber';
import { ImageReveal } from './components/ImageReveal';
import { Marquee } from './components/Marquee';
import { MagneticButton } from './components/MagneticButton';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


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
  
  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    // Horizontal scroll section
    const cards = gsap.utils.toArray('.scroll-card');
    
    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-container',
        pin: true,
        scrub: 2,
        snap: {
          snapTo: 1 / (cards.length - 1),
          duration: { min: 0.4, max: 1.0 },
          delay: 0.2,
          ease: 'power2.inOut'
        },
        end: () => '+=' + ((document.querySelector('.scroll-container') as HTMLElement)?.offsetWidth || 0) * 2
      }
    });

    // Text scramble on scroll
    gsap.utils.toArray('.scramble-trigger').forEach((trigger: any) => {
      gsap.fromTo(trigger, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trigger,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-warm-linen relative overflow-hidden">
      {/* Custom Cursor */}
      <MagneticCursor />
      
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rich-navy to-burnt-orange origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 grain-texture pointer-events-none z-0" />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 h-20 bg-warm-linen/80 backdrop-blur-2xl border-b border-deep-charcoal/6 hover:bg-warm-linen/90 transition-all duration-300"
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
            <Link href="/services" className="text-deep-charcoal hover:text-rich-navy transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rich-navy transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-deep-charcoal hover:text-rich-navy transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rich-navy transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/case-studies" className="text-deep-charcoal hover:text-rich-navy transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group">
              Case Studies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rich-navy transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="bg-rich-navy text-warm-linen px-6 py-3 rounded-sm hover:bg-burnt-orange transition-all duration-300 uppercase text-xs tracking-[0.1em]">
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
                  className="text-burnt-orange text-sm uppercase tracking-widest"
                >
                  Enterprise Marketing. SMB Accessibility.
                </motion.div>
                
                <div className="space-y-4">
                  <ScrambleText 
                    text="Don't Compete" 
                    className="text-6xl lg:text-8xl font-display text-deep-charcoal block"
                    speed={50}
                  />
                  <ScrambleText 
                    text="On Budget." 
                    className="text-6xl lg:text-8xl font-display text-deep-charcoal block"
                    speed={50}
                  />
                  <ScrambleText 
                    text="Compete On Strategy." 
                    className="text-6xl lg:text-8xl font-display text-rich-navy block"
                    speed={50}
                  />
                </div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-body text-deep-charcoal/80 max-w-2xl leading-relaxed"
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
                    <MagneticButton className="bg-rich-navy text-warm-linen px-8 py-4 rounded-sm hover:bg-burnt-orange transition-all duration-300 font-medium">
                      See What's Possible
                    </MagneticButton>
                  </Link>
                  <Link href="/services">
                    <MagneticButton className="border border-deep-charcoal text-deep-charcoal px-8 py-4 rounded-sm hover:bg-deep-charcoal hover:text-warm-linen transition-all duration-300 font-medium">
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
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/90 backdrop-blur-xl rounded-lg p-8 shadow-2xl border border-deep-charcoal/10 hover:shadow-3xl transition-all duration-300"
                >
                  <div className="space-y-6">
                    <div className="text-sm uppercase tracking-widest text-deep-charcoal/60">
                      Real Client Growth
                    </div>
                    <div className="font-mono text-8xl font-bold text-rich-navy">
                      <AnimatedNumber value={3.4} suffix="x" />
                    </div>
                    <div className="text-deep-charcoal/80">
                      Average revenue increase, Year 1
                    </div>
                    <div className="h-16 bg-gradient-to-r from-rich-navy to-burnt-orange rounded opacity-20">
                      {/* Mini sparkline chart placeholder */}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Elements */}
      <section id="services" className="py-8 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
              FULL-STACK CAPABILITIES
            </div>
            <h2 className="text-h2 font-display text-deep-charcoal mb-6">
              Three Pillars. One Unified Strategy.
            </h2>
            <p className="text-body text-deep-charcoal/80 max-w-3xl mx-auto">
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
                  <h3 className="text-h3 font-display text-deep-charcoal mb-2">
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
              </div>
            </motion.div>

            {/* Card 2 - Strategic Marketing */}
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
                  <TrendUp className="w-6 h-6 text-rich-navy" />
                </div>
                <div>
                  <h3 className="text-h3 font-display text-deep-charcoal mb-2">
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
              </div>
            </motion.div>

            {/* Card 3 - Transformation */}
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
                  <h3 className="text-h3 font-display text-warm-linen mb-2">
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Section with Horizontal Scroll */}
      <section id="methodology" className="py-8 bg-warm-linen">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">OUR APPROACH</div>
            <h2 className="text-h2 font-display text-deep-charcoal mb-6">
              A Proven Path to Growth
            </h2>
            <p className="text-body text-deep-charcoal/80 max-w-3xl mx-auto">
              Most agencies start at #4. We start at #1, building a solid foundation for lasting success.
            </p>
          </motion.div>
        </div>

        <div className="scroll-container relative w-full h-[600px] overflow-hidden">
          <div className="flex h-full">
            {[
              { num: '01', title: 'Discovery & Audit', description: 'Deep dive into your current marketing, sales, and operational infrastructure to identify opportunities.' },
              { num: '02', title: 'Strategic Architecture', description: 'Develop a bespoke growth blueprint, outlining technology, channels, and a phased implementation plan.' },
              { num: '03', title: 'Infrastructure Build', description: 'Implement and integrate the necessary MarTech stack, data pipelines, and automation tools.' },
              { num: '04', title: 'Campaign Launch', description: 'Execute programmatic campaigns and integrated marketing initiatives with precision and real-time optimization.' },
              { num: '05', title: 'Continuous Optimization', description: 'Ongoing monitoring, A/B testing, and strategic adjustments to maximize ROI and adapt to market changes.' },
            ].map((phase, i) => (
              <div key={i} className="scroll-card w-screen flex-shrink-0 flex items-center justify-center">
                <div className="relative max-w-md text-center">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[80px] font-display text-deep-charcoal opacity-15 leading-none">
                    {phase.num}
                  </span>
                  <h3 className="text-3xl font-display text-deep-charcoal mb-4 pt-24 uppercase tracking-wide">
                    {phase.title}
                  </h3>
                  <p className="text-lg text-deep-charcoal/80 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section with Animated Counters */}
      <section id="proof" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-display text-deep-charcoal mb-6">
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
                className="text-center p-8 bg-warm-linen/50 rounded-lg"
              >
                <div className="font-mono text-6xl font-bold text-rich-navy mb-4">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-deep-charcoal/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Infinite Marquee */}
      <section className="bg-warm-linen">
        <Marquee 
          items={[
            "Programmatic Advertising",
            "Strategic Marketing", 
            "Business Transformation",
            "Data Analytics",
            "Marketing Automation",
            "Performance Optimization",
            "Cross-Channel Integration",
            "ROI Maximization"
          ]}
          speed={25}
          className="py-1"
        />
      </section>

      {/* Differentiation Section */}
      <section className="py-16 bg-gradient-to-b from-deep-charcoal to-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-display text-warm-linen mb-6">
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
                <div className="w-12 h-12 bg-copper/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-burnt-orange" />
                </div>
                <h3 className="text-2xl font-display text-warm-linen">
                  {principle.title}
                </h3>
                <p className="text-warm-linen/80 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-warm-linen">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-display text-deep-charcoal mb-6">
              Enterprise Stack. SMB Accessibility.
            </h2>
            <p className="text-body text-deep-charcoal/80 max-w-3xl mx-auto">
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
                className="bg-white rounded-lg p-8 border border-deep-charcoal/10"
              >
                <h3 className="text-xl font-display text-deep-charcoal mb-4">
                  {category.title}
                </h3>
                <div className="space-y-2 mb-4">
                  {category.platforms.map((platform, i) => (
                    <div key={i} className="text-sm text-rich-navy font-mono">
                      {platform}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-deep-charcoal/70">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
              See how Vrvo can transform your marketing from cost center to growth engine.
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
                  See Our Case Studies
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-deep-charcoal text-warm-linen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="mb-4">
                <Image
                  src="/logos/vrvo_wordmark_white.svg"
                  alt="Vrvo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-warm-linen/80 text-sm">
                Enterprise marketing for ambitious businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-display font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-warm-linen/80">
                <li><Link href="/services" className="hover:text-burnt-orange transition-colors">Programmatic Advertising</Link></li>
                <li><Link href="/services" className="hover:text-burnt-orange transition-colors">Strategic Marketing</Link></li>
                <li><Link href="/services" className="hover:text-burnt-orange transition-colors">Business Transformation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-warm-linen/80">
                <li><Link href="/about" className="hover:text-burnt-orange transition-colors">About</Link></li>
                <li><Link href="/services" className="hover:text-burnt-orange transition-colors">Approach</Link></li>
                <li><Link href="/contact" className="hover:text-burnt-orange transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-burnt-orange transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-warm-linen/80">
                <li><Link href="/case-studies" className="hover:text-burnt-orange transition-colors">Case Studies</Link></li>
                <li><Link href="/blog" className="hover:text-burnt-orange transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-warm-linen/20 mt-12 pt-8 text-center text-warm-linen/60 text-sm">
            <p>&copy; 2025 Vrvo. All rights reserved.</p>
            <p className="mt-2">Enterprise marketing for ambitious businesses.</p>
            <div className="mt-4 flex justify-center gap-6">
              <Link href="/policy" className="hover:text-burnt-orange transition-colors">Privacy Policy</Link>
              <Link href="/policy" className="hover:text-burnt-orange transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}