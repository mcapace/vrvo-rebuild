'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Target, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react'

export default function Services() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* Navigation - Same as homepage */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <Image 
              src="/logos/vrvo_wordmark_black.svg" 
              alt="Vrvo" 
              width={140} 
              height={48}
              className="h-10 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-sm font-medium text-navy">Services</Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-navy">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-navy">Contact</Link>
            <button className="px-5 py-2 bg-navy hover:bg-navy-hover text-white text-sm font-semibold rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-navy uppercase tracking-wide mb-4">
              OUR SERVICES
            </p>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Full-Stack Digital Growth Solutions
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Three integrated capabilities designed to transform your marketing from cost center to growth engine. No long-term contracts. Complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: Programmatic */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Programmatic Advertising
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Enterprise DSP relationships and AI-powered bidding strategies that Fortune 500s use.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Direct access to Trade Desk, Google DV360, Amazon DSP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Real-time bid optimization across display, video, native, CTV</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Advanced audience segmentation and lookalike modeling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Cross-device attribution and conversion tracking</span>
                </li>
              </ul>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-gray-900 mb-2">Typical Results:</p>
                <p className="text-gray-600">2.8x average ROAS improvement, 47% reduction in cost per acquisition, $50M+ annual ad spend managed</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Access</h4>
                  <p className="text-gray-600">Enterprise agreements with major DSPs (typically $50K+ minimums) accessible at any budget level</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Strategic Management</h4>
                  <p className="text-gray-600">Dedicated campaign strategists managing daily optimization and performance</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Transparent Reporting</h4>
                  <p className="text-gray-600">Real-time dashboard showing spend, performance, and attribution by channel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Strategic Marketing */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Integrated Approach</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Multi-Channel Strategy</h4>
                    <p className="text-gray-600">Paid search, paid social, SEO, content, email working together</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Brand + Performance</h4>
                    <p className="text-gray-600">Build awareness while driving immediate conversions</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Continuous Optimization</h4>
                    <p className="text-gray-600">Monthly strategy reviews and tactical adjustments</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Strategic Marketing
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Integrated campaigns that build brands and drive revenue through coordinated multi-channel execution.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Brand positioning and messaging architecture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Search, social, display campaign management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Content strategy and SEO optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Email automation and lead nurturing</span>
                </li>
              </ul>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-gray-900 mb-2">Typical Results:</p>
                <p className="text-gray-600">340% average ROI increase, 3x qualified lead volume, 94% client retention rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Business Transformation */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Business Transformation
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Build the marketing infrastructure needed to scale efficiently and make data-driven decisions.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">MarTech stack audit and optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">CRM implementation (HubSpot, Salesforce, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Analytics and reporting infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-3">•</span>
                  <span className="text-gray-900">Process automation and team training</span>
                </li>
              </ul>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-gray-900 mb-2">Typical Timeline:</p>
                <p className="text-gray-600">3-6 month transformation projects with ongoing optimization and support</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Transformation Focus</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Infrastructure</h4>
                  <p className="text-gray-600">Platform selection, implementation, and integration across your marketing stack</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data & Analytics</h4>
                  <p className="text-gray-600">Unified reporting, attribution modeling, and performance dashboards</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Process & People</h4>
                  <p className="text-gray-600">Workflow design, team training, and ongoing strategic support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Schedule a consultation to discuss which services align with your growth goals.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-navy hover:bg-navy-hover text-white font-semibold rounded-lg text-lg transition-colors"
          >
            Schedule Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer - Same as homepage */}
      <footer className="bg-gray-900 text-gray-400 py-16">
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
              <p className="text-gray-400 text-sm mb-4">
                Enterprise marketing for ambitious businesses.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-navy rounded-full"></div>
                <span className="text-sm text-gray-400">Denver, CO</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/services" className="hover:text-white transition-colors">Programmatic Advertising</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Strategic Marketing</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Business Transformation</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Approach</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Vrvo. All rights reserved.</p>
            <p className="mt-2">Enterprise marketing for ambitious businesses.</p>
            <div className="mt-4 flex justify-center gap-6">
              <Link href="/policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/policy" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

    </main>
  )
}