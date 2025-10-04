"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Target, 
  Eye, 
  Zap, 
  ArrowRight, 
  BarChart3,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  Users,
  Globe,
  Shield,
  Award
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-cream relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="fixed inset-0 paper-texture pointer-events-none z-0" />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-warm-cream/80 backdrop-blur-sm border-b border-deep-charcoal/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logos/vrvo_wordmark_black.svg"
                alt="Vrvo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-deep-charcoal hover:text-burnished-gold transition-colors">Services</a>
              <a href="#capabilities" className="text-deep-charcoal hover:text-burnished-gold transition-colors">Capabilities</a>
              <a href="#about" className="text-deep-charcoal hover:text-burnished-gold transition-colors">About</a>
              <button className="bg-deep-charcoal text-warm-cream px-6 py-2 rounded-sm hover:bg-burnished-gold hover:text-deep-charcoal transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Asymmetric Layout */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* 65% width content */}
            <div className="lg:col-span-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.h1 
                  variants={fadeInUp}
                  className="text-5xl lg:text-7xl font-serif font-bold text-deep-charcoal leading-tight tracking-tighter"
                >
                  Digital Marketing
                  <br />
                  <span className="text-burnished-gold">Transformation</span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-xl text-deep-charcoal/80 leading-relaxed max-w-2xl"
                >
                  We help businesses grow through innovative strategies and cutting-edge technology. 
                  Our approach combines data-driven insights with creative excellence.
                </motion.p>
                
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="bg-deep-charcoal text-warm-cream px-8 py-4 rounded-sm hover:bg-burnished-gold hover:text-deep-charcoal transition-all duration-300 font-medium">
                    Start Your Journey
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </button>
                  <button className="border border-deep-charcoal text-deep-charcoal px-8 py-4 rounded-sm hover:bg-deep-charcoal hover:text-warm-cream transition-all duration-300 font-medium">
                    View Our Work
                  </button>
                </motion.div>
              </motion.div>
            </div>
            
            {/* 35% width visual */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-rich-navy rounded-lg p-8 text-warm-cream">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-burnished-gold rounded-full"></div>
                      <span className="text-sm font-medium">Active Campaigns</span>
                    </div>
                    <div className="text-3xl font-bold">127</div>
                    <div className="text-sm text-warm-cream/70">+23% this month</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - White Cards with Gold Numbers */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-deep-charcoal mb-6 tracking-tight">
              Our Services
            </h2>
            <p className="text-xl text-deep-charcoal/70 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Digital Strategy",
                description: "Data-driven marketing strategies that align with your business objectives and drive measurable results.",
                icon: Target
              },
              {
                number: "02", 
                title: "Brand Development",
                description: "Creating compelling brand identities that resonate with your target audience and differentiate you from competitors.",
                icon: Eye
              },
              {
                number: "03",
                title: "Performance Marketing",
                description: "Optimized campaigns across all channels to maximize ROI and accelerate business growth.",
                icon: TrendingUp
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="bg-white border border-deep-charcoal/10 rounded-lg p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-6xl font-serif font-bold text-burnished-gold">
                    {service.number}
                  </div>
                  <service.icon className="w-8 h-8 text-deep-charcoal group-hover:text-burnished-gold transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-deep-charcoal mb-4">
                  {service.title}
                </h3>
                <p className="text-deep-charcoal/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section - Navy Background */}
      <section id="capabilities" className="py-20 px-6 bg-rich-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-warm-cream mb-6 tracking-tight">
              Our Capabilities
            </h2>
            <p className="text-xl text-warm-cream/80 max-w-2xl mx-auto">
              Advanced tools and expertise to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BarChart3, title: "Analytics & Insights", description: "Advanced data analysis" },
              { icon: Globe, title: "Global Reach", description: "Worldwide campaign management" },
              { icon: Shield, title: "Security First", description: "Enterprise-grade security" },
              { icon: Award, title: "Proven Results", description: "Award-winning campaigns" }
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-burnished-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-burnished-gold/30 transition-colors">
                  <capability.icon className="w-8 h-8 text-burnished-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold text-warm-cream mb-2">
                  {capability.title}
                </h3>
                <p className="text-warm-cream/70">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vrvo Section - Magazine Style 2x2 Grid */}
      <section id="about" className="py-20 px-6 bg-warm-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-deep-charcoal mb-6 tracking-tight">
              Why Choose Vrvo
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ amount: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-burnished-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-deep-charcoal mb-2">
                    Proven Expertise
                  </h3>
                  <p className="text-deep-charcoal/70">
                    Over 10 years of experience helping businesses achieve their digital marketing goals.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-burnished-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-deep-charcoal mb-2">
                    Data-Driven Approach
                  </h3>
                  <p className="text-deep-charcoal/70">
                    Every decision is backed by comprehensive data analysis and market insights.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ amount: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-burnished-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-deep-charcoal mb-2">
                    Custom Solutions
                  </h3>
                  <p className="text-deep-charcoal/70">
                    Tailored strategies that fit your unique business needs and objectives.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-burnished-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-deep-charcoal mb-2">
                    Continuous Optimization
                  </h3>
                  <p className="text-deep-charcoal/70">
                    Ongoing monitoring and optimization to ensure maximum performance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-deep-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-warm-cream mb-6 tracking-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-warm-cream/80 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you achieve your digital marketing goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-burnished-gold text-deep-charcoal px-8 py-4 rounded-sm hover:bg-warm-cream transition-all duration-300 font-medium">
                Get Started Today
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
              <button className="border border-warm-cream text-warm-cream px-8 py-4 rounded-sm hover:bg-warm-cream hover:text-deep-charcoal transition-all duration-300 font-medium">
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Charcoal Blue */}
      <footer className="bg-charcoal-blue text-warm-cream py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <Image
                  src="/logos/vrvo_wordmark_white.svg"
                  alt="Vrvo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-warm-cream/80 mb-6 max-w-md">
                Digital marketing and business transformation company helping businesses grow through innovative strategies.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-warm-cream/80">
                <li><a href="#" className="hover:text-burnished-gold transition-colors">Digital Strategy</a></li>
                <li><a href="#" className="hover:text-burnished-gold transition-colors">Brand Development</a></li>
                <li><a href="#" className="hover:text-burnished-gold transition-colors">Performance Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-warm-cream/80">
                <li>hello@vrvo.com</li>
                <li>+1 (555) 123-4567</li>
                <li>New York, NY</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-warm-cream/20 mt-12 pt-8 text-center text-warm-cream/60">
            <p>&copy; 2024 Vrvo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
