'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag, Target, TrendingUp, Lightbulb, BarChart3, Users, Zap, FileText, Settings, Globe } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { MagneticCursor } from '../components/MagneticCursor';
import Footer from '../components/Footer';

export default function Blog() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programmatic Advertising':
        return <Target className="w-4 h-4" />;
      case 'Strategy':
        return <Lightbulb className="w-4 h-4" />;
      case 'Business Transformation':
        return <Users className="w-4 h-4" />;
      case 'Analytics':
        return <BarChart3 className="w-4 h-4" />;
      case 'Case Study':
        return <FileText className="w-4 h-4" />;
      case 'Marketing Automation':
        return <Zap className="w-4 h-4" />;
      case 'Creative Strategy':
        return <Settings className="w-4 h-4" />;
      case 'Technology':
        return <Globe className="w-4 h-4" />;
      case 'Customer Experience':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const blogPosts = [
    {
      title: "The Programmatic Advertising Playbook for SMBs",
      excerpt: "How to leverage enterprise-grade programmatic advertising without the enterprise budget. A complete guide to DSPs, bidding strategies, and attribution modeling.",
      category: "Programmatic Advertising",
      readTime: "8 min read",
      slug: "programmatic-advertising-playbook-smb"
    },
    {
      title: "Why Your Marketing Attribution is Broken (And How to Fix It)",
      excerpt: "Most businesses are making decisions based on flawed attribution data. Learn how to implement proper attribution modeling that actually drives growth.",
      category: "Analytics",
      readTime: "6 min read",
      slug: "marketing-attribution-broken-fix"
    },
    {
      title: "The MarTech Stack Audit: What You're Missing",
      excerpt: "A comprehensive audit framework to identify gaps in your marketing technology stack and optimize for scale.",
      category: "Business Transformation",
      readTime: "10 min read",
      slug: "martech-stack-audit-missing"
    },
    {
      title: "Account-Based Marketing for B2B Growth",
      excerpt: "How to implement ABM strategies that actually work, from account selection to personalized campaigns and sales alignment.",
      category: "Strategy",
      readTime: "7 min read",
      slug: "account-based-marketing-b2b-growth"
    },
    {
      title: "The Hidden Costs of Marketing Automation",
      excerpt: "Marketing automation promises efficiency, but poor implementation can cost you more than it saves. Here's how to avoid common pitfalls.",
      category: "Marketing Automation",
      readTime: "5 min read",
      slug: "hidden-costs-marketing-automation"
    },
    {
      title: "Building a Data-Driven Marketing Culture",
      excerpt: "Transforming your marketing team from gut-feeling decisions to data-driven strategies that consistently deliver results.",
      category: "Business Transformation",
      readTime: "9 min read",
      slug: "data-driven-marketing-culture"
    },
    {
      title: "Programmatic vs. Traditional Display: The Real ROI",
      excerpt: "A data-driven comparison of programmatic vs. traditional display advertising, with real client results and cost analysis.",
      category: "Programmatic Advertising",
      readTime: "6 min read",
      slug: "programmatic-vs-traditional-display-roi"
    },
    {
      title: "The Future of Marketing Attribution",
      excerpt: "How privacy changes and cookie deprecation are reshaping attribution modeling, and what it means for your marketing strategy.",
      category: "Technology",
      readTime: "8 min read",
      slug: "future-marketing-attribution"
    },
    {
      title: "Scaling Marketing Operations: A Framework",
      excerpt: "A systematic approach to scaling your marketing operations as you grow, from team structure to process optimization.",
      category: "Business Transformation",
      readTime: "12 min read",
      slug: "scaling-marketing-operations-framework"
    },
    {
      title: "Creative Strategy for Programmatic Campaigns",
      excerpt: "How to develop creative strategies that work across programmatic channels, with testing frameworks and optimization tactics.",
      category: "Creative Strategy",
      readTime: "7 min read",
      slug: "creative-strategy-programmatic-campaigns"
    },
    {
      title: "The Psychology of B2B Buying Decisions",
      excerpt: "Understanding the emotional and rational factors that drive B2B purchasing decisions, and how to leverage them in your marketing.",
      category: "Customer Experience",
      readTime: "6 min read",
      slug: "psychology-b2b-buying-decisions"
    },
    {
      title: "Case Study: $2M to $8M ARR in 12 Months",
      excerpt: "A detailed breakdown of how we helped a SaaS company 4x their revenue through strategic marketing infrastructure and programmatic advertising.",
      category: "Case Study",
      readTime: "15 min read",
      slug: "case-study-2m-8m-arr-12-months"
    }
  ];

  const categories = [
    "All",
    "Programmatic Advertising",
    "Strategy",
    "Business Transformation",
    "Analytics",
    "Case Study",
    "Marketing Automation",
    "Creative Strategy",
    "Technology",
    "Customer Experience"
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
              INSIGHTS & STRATEGY
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Marketing Intelligence
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Deep insights into programmatic advertising, marketing infrastructure, and business transformation strategies that actually work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === "All" 
                    ? "bg-navy text-white" 
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    {getCategoryIcon(post.category)}
                  </div>
                  <span className="text-sm font-medium text-navy">{post.category}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-navy transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.readTime}
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-navy hover:text-navy-hover font-medium text-sm flex items-center group-hover:translate-x-1 transition-all duration-300"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Stay Ahead of the Curve
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the latest insights on programmatic advertising, marketing infrastructure, and business transformation delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <button className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy-hover transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500">
              No spam. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}