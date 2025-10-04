"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';
import { 
  Target, 
  TrendingUp, 
  Lightbulb, 
  ChartLine,
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  Shield,
  Award
} from '@phosphor-icons/react';

// Import custom components
import { ScrambleText } from './components/ScrambleText';
import { MagneticCursor } from './components/MagneticCursor';
import { AnimatedNumber } from './components/AnimatedNumber';
import { ImageReveal } from './components/ImageReveal';
import { Marquee } from './components/Marquee';
import { ThreeScene } from './components/ThreeScene';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Magnetic Button Component
const MagneticButton = ({ children, className, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };
  
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

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
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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
        scrub: 1,
        snap: 1 / (cards.length - 1),
        end: () => '+=' + (document.querySelector('.scroll-container')?.offsetWidth || 0)
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-green to-copper origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 grain-texture pointer-events-none z-0" />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 h-20 bg-warm-linen/85 backdrop-blur-2xl border-b border-deep-charcoal/6"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logos/vrvo_logo.png"
              alt="Vrvo"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-deep-charcoal hover:text-forest-green transition-colors uppercase text-xs tracking-[0.1em]">Services</a>
            <a href="#methodology" className="text-deep-charcoal hover:text-forest-green transition-colors uppercase text-xs tracking-[0.1em]">Methodology</a>
            <a href="#proof" className="text-deep-charcoal hover:text-forest-green transition-colors uppercase text-xs tracking-[0.1em]">Proof</a>
            <MagneticButton className="bg-forest-green text-warm-linen px-6 py-3 rounded-sm hover:bg-copper transition-all duration-300 uppercase text-xs tracking-[0.1em]">
              Partner With Us
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D Scene */}
      <section className="h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - 3D Scene */}
            <div className="lg:col-span-7">
              <div className="h-96 lg:h-[500px] relative">
                <ThreeScene className="w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-copper text-sm uppercase tracking-widest"
                    >
                      Enterprise Marketing. SMB Accessibility.
                    </motion.div>
                    
                    <div className="space-y-2">
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
                        className="text-6xl lg:text-8xl font-display text-forest-green block"
                        speed={50}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Floating Metric Card */}
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
                  className="bg-white rounded-lg p-8 shadow-2xl border border-deep-charcoal/10"
                >
                  <div className="space-y-6">
                    <div className="text-sm uppercase tracking-widest text-deep-charcoal/60">
                      Real Client Growth
                    </div>
                    <div className="font-mono text-8xl font-bold text-forest-green">
                      <AnimatedNumber value={3.4} suffix="x" />
                    </div>
                    <div className="text-deep-charcoal/80">
                      Average revenue increase, Year 1
                    </div>
                    <div className="h-16 bg-gradient-to-r from-forest-green to-copper rounded opacity-20">
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
      <section id="services" className="py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-20"
          >
            <div className="text-copper text-sm uppercase tracking-widest mb-4">
              FULL-STACK CAPABILITIES
            </div>
            <h2 className="text-h2 font-display text-deep-charcoal mb-6">
              Three Pillars. One Unified Strategy.
            </h2>
            <p className="text-body text-deep-charcoal/80 max-w-3xl mx-auto">
              Most agencies do one thing. We architect complete growth systems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Card 1 - Programmatic */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ amount: 0.2 }}
              className="bg-white rounded-lg p-8 border-l-4 border-forest-green hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-copper text-9xl font-bold opacity-10 -mr-4 -mt-4">
                01
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-forest-green/10 rounded-lg flex items-center justify-center group-hover:bg-forest-green/20 transition-colors">
                  <Target className="w-6 h-6 text-forest-green" />
                </div>
                <div>
                  <h3 className="text-h3 font-display text-deep-charcoal mb-2">
                    Programmatic Advertising
                  </h3>
                  <p className="text-copper text-sm uppercase tracking-widest">
                    Precision at scale
                  </p>
                </div>
                <p className="text-deep-charcoal/80 leading-relaxed">
                  Enterprise DSP relationships and AI-powered bidding strategies that Fortune 500s use. Real-time optimization across display, video, native, and CTV.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-forest-green">$50M+ annual spend managed</div>
                  <div className="font-mono text-forest-green">2.8x average ROAS improvement</div>
                  <div className="font-mono text-forest-green">94% campaign success rate</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Strategic Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ amount: 0.2 }}
              className="bg-warm-linen rounded-lg p-8 border border-deep-charcoal/10 hover:shadow-xl transition-all duration-300 relative overflow-hidden group mt-8"
            >
              <div className="absolute top-0 right-0 text-copper text-9xl font-bold opacity-10 -mr-4 -mt-4">
                02
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-forest-green/10 rounded-lg flex items-center justify-center group-hover:bg-forest-green/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-forest-green" />
                </div>
                <div>
                  <h3 className="text-h3 font-display text-deep-charcoal mb-2">
                    Strategic Marketing
                  </h3>
                  <p className="text-copper text-sm uppercase tracking-widest">
                    Integrated execution
                  </p>
                </div>
                <p className="text-deep-charcoal/80 leading-relaxed">
                  Cross-channel orchestration that connects every touchpoint. From awareness to conversion, we build systems that work together.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-forest-green">360° campaign integration</div>
                  <div className="font-mono text-forest-green">Multi-touch attribution</div>
                  <div className="font-mono text-forest-green">Unified customer journey</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Transformation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ amount: 0.2 }}
              className="bg-deep-charcoal text-warm-linen rounded-lg p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group -mt-4"
            >
              <div className="absolute top-0 right-0 text-copper text-9xl font-bold opacity-10 -mr-4 -mt-4">
                03
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-copper/20 rounded-lg flex items-center justify-center group-hover:bg-copper/30 transition-colors">
                  <Lightbulb className="w-6 h-6 text-copper" />
                </div>
                <div>
                  <h3 className="text-h3 font-display text-warm-linen mb-2">
                    Business Transformation
                  </h3>
                  <p className="text-copper text-sm uppercase tracking-widest">
                    Infrastructure that scales
                  </p>
                </div>
                <p className="text-warm-linen/80 leading-relaxed">
                  Beyond campaigns. We architect the marketing infrastructure, processes, and team structure that supports sustainable growth.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-mono text-copper">Marketing automation setup</div>
                  <div className="font-mono text-copper">Team structure optimization</div>
                  <div className="font-mono text-copper">Process standardization</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Section with Timeline */}
      <section id="methodology" className="py-40 bg-warm-linen">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-20"
          >
            <h2 className="text-h2 font-display text-deep-charcoal mb-6">
              Our Methodology
            </h2>
            <p className="text-body text-deep-charcoal/80 max-w-3xl mx-auto">
              Most agencies start at #4. We start at #1.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-forest-green to-copper"></div>
            
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { number: "01", title: "Discovery & Audit", description: "Deep dive into your current state" },
                { number: "02", title: "Strategic Architecture", description: "Blueprint for growth" },
                { number: "03", title: "Infrastructure Build", description: "Systems and processes" },
                { number: "04", title: "Campaign Launch", description: "Go-to-market execution" },
                { number: "05", title: "Continuous Optimization", description: "Data-driven improvements" }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ amount: 0.2 }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-warm-linen font-bold text-lg">{phase.number}</span>
                  </div>
                  <h3 className="text-lg font-display text-deep-charcoal mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-deep-charcoal/70">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section with Animated Counters */}
      <section id="proof" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-20"
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
                <div className="font-mono text-6xl font-bold text-forest-green mb-4">
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

      {/* Horizontal Scroll Section */}
      <section className="scroll-container h-screen bg-gradient-to-r from-forest-green to-copper">
        <div className="flex h-full">
          {[
            { title: "Programmatic Excellence", description: "Enterprise DSP relationships" },
            { title: "Strategic Integration", description: "Cross-channel orchestration" },
            { title: "Business Transformation", description: "Infrastructure that scales" },
            { title: "Continuous Optimization", description: "Data-driven improvements" }
          ].map((capability, index) => (
            <div key={index} className="scroll-card w-screen h-screen flex-shrink-0 flex items-center justify-center text-warm-linen">
              <div className="text-center max-w-2xl mx-auto px-6">
                <h3 className="text-6xl font-display mb-6">{capability.title}</h3>
                <p className="text-xl">{capability.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="py-20 bg-warm-linen">
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
          className="py-8"
        />
      </section>

      {/* Differentiation Section */}
      <section className="py-40 bg-gradient-to-b from-deep-charcoal to-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-20"
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
                  <CheckCircle className="w-6 h-6 text-copper" />
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
      <section className="py-40 bg-warm-linen">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-20"
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
                    <div key={i} className="text-sm text-forest-green font-mono">
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
      <section className="py-40 bg-forest-green">
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
              <MagneticButton className="bg-warm-linen text-forest-green px-8 py-4 rounded-sm hover:bg-copper hover:text-warm-linen transition-all duration-300 font-medium">
                Schedule Strategy Call
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </MagneticButton>
              <MagneticButton className="border border-warm-linen text-warm-linen px-8 py-4 rounded-sm hover:bg-warm-linen hover:text-forest-green transition-all duration-300 font-medium">
                See Our Case Studies
              </MagneticButton>
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
                <li><a href="#" className="hover:text-copper transition-colors">Programmatic Advertising</a></li>
                <li><a href="#" className="hover:text-copper transition-colors">Strategic Marketing</a></li>
                <li><a href="#" className="hover:text-copper transition-colors">Business Transformation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-warm-linen/80">
                <li><a href="#" className="hover:text-copper transition-colors">About</a></li>
                <li><a href="#" className="hover:text-copper transition-colors">Approach</a></li>
                <li><a href="#" className="hover:text-copper transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-copper transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-warm-linen/80">
                <li><a href="#" className="hover:text-copper transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-copper transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-copper transition-colors">ROI Calculator</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-warm-linen/20 mt-12 pt-8 text-center text-warm-linen/60 text-sm">
            <p>&copy; 2024 Vrvo. All rights reserved.</p>
            <p className="mt-2">Enterprise marketing for ambitious businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}