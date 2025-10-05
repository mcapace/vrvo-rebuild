'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 h-20 bg-white/90 backdrop-blur-xl border-b border-gray-200 hover:bg-white transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/vrvo_wordmark_black.svg"
            alt="Vrvo"
            width={140}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/services" 
            className={`transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group ${
              pathname === '/services' ? 'text-navy' : 'text-gray-600 hover:text-navy'
            }`}
          >
            Services
            <span className={`absolute bottom-0 left-0 h-0.5 bg-navy transition-all duration-300 ${
              pathname === '/services' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>
          <Link 
            href="/about" 
            className={`transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group ${
              pathname === '/about' ? 'text-navy' : 'text-gray-600 hover:text-navy'
            }`}
          >
            About
            <span className={`absolute bottom-0 left-0 h-0.5 bg-navy transition-all duration-300 ${
              pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>
          <Link 
            href="/case-studies" 
            className={`transition-all duration-300 uppercase text-xs tracking-[0.1em] relative group ${
              pathname === '/case-studies' ? 'text-navy' : 'text-gray-600 hover:text-navy'
            }`}
          >
            Case Studies
            <span className={`absolute bottom-0 left-0 h-0.5 bg-navy transition-all duration-300 ${
              pathname === '/case-studies' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>
          <Link 
            href="/contact" 
            className="bg-navy text-white px-6 py-3 rounded-sm hover:bg-navy-hover transition-all duration-300 uppercase text-xs tracking-[0.1em]"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}