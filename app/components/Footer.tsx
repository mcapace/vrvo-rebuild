'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
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
            <Link href="/privacy" className="hover:text-burnt-orange transition-colors">Privacy Policy</Link>
            <Link href="/policy" className="hover:text-burnt-orange transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}