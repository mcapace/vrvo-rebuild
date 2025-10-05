'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
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
  );
}