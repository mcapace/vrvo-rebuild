'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* Navigation */}
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
            <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-navy">Services</Link>
            <Link href="/about" className="text-sm font-medium text-navy">About</Link>
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
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              We Level The Playing Field
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Enterprise-grade marketing shouldn't be exclusive to Fortune 500 companies. Vrvo brings sophisticated programmatic advertising and business transformation to ambitious SMBs ready to compete on strategy, not just budget.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-sm font-semibold text-navy uppercase tracking-wide mb-4">
                OUR MISSION
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Democratizing Enterprise Marketing
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                For too long, sophisticated digital marketing has been gatekept by high minimums, complex platforms, and agencies that treat SMBs like afterthoughts.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We built Vrvo to change that. Our enterprise DSP relationships, advanced technology stack, and strategic expertise are accessible to businesses investing $10K-$100K monthly in marketing—not just those with seven-figure budgets.
              </p>
            </div>
            <div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-navy mr-3 mt-1">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">No Bullshit</p>
                      <p className="text-gray-600">We track revenue impact, not vanity metrics</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-navy mr-3 mt-1">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Complete Transparency</p>
                      <p className="text-gray-600">See our fees, see platform costs, see everything</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-navy mr-3 mt-1">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Built to Scale</p>
                      <p className="text-gray-600">Infrastructure for growth, not band-aids</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-navy mr-3 mt-1">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Month-to-Month</p>
                      <p className="text-gray-600">Stay because we deliver, not contracts</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              By The Numbers
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-2">$50M+</div>
              <p className="text-gray-600">Annual ad spend managed</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-2">94%</div>
              <p className="text-gray-600">Client retention rate</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-2">200+</div>
              <p className="text-gray-600">Businesses partnered with</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Let's Talk Strategy
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            See how Vrvo can help you compete on strategy, not budget.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-10 py-4 bg-navy hover:bg-navy-hover text-white font-semibold rounded-lg text-lg transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
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