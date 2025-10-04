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
        return <Tag className="w-4 h-4" />;
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: "Why Most SMBs Fail at Programmatic Advertising (And How to Succeed)",
      excerpt: "The hidden infrastructure requirements that separate successful programmatic campaigns from expensive failures.",
      readTime: "8 min read",
      category: "Programmatic Advertising",
      slug: "why-most-smbs-fail-programmatic-advertising",
      featured: true
    },
    {
      id: 2,
      title: "The Marketing Infrastructure Gap: What Fortune 500s Know That SMBs Don't",
      excerpt: "How enterprise marketing infrastructure principles can transform SMB growth when properly adapted.",
      readTime: "12 min read",
      category: "Strategy",
      slug: "marketing-infrastructure-gap-fortune-500s-know",
      featured: false
    },
    {
      id: 3,
      title: "Building Marketing Teams That Scale: Lessons from 200+ SMB Transformations",
      excerpt: "The organizational structures and processes that enable sustainable marketing growth.",
      readTime: "10 min read",
      category: "Business Transformation",
      slug: "building-marketing-teams-scale",
      featured: false
    },
    {
      id: 4,
      title: "ROI vs ROAS: Why Most Marketing Metrics Are Misleading SMBs",
      excerpt: "The critical difference between return metrics and how to build attribution that actually drives decisions.",
      readTime: "6 min read",
      category: "Analytics",
      slug: "roi-vs-roas-marketing-metrics-misleading",
      featured: false
    },
    {
      id: 5,
      title: "The $50M Marketing Infrastructure: What We Learned from Enterprise Clients",
      excerpt: "Key insights from managing massive marketing operations and how to apply them at SMB scale.",
      readTime: "15 min read",
      category: "Case Study",
      slug: "50m-marketing-infrastructure-enterprise-insights",
      featured: false
    },
    {
      id: 6,
      title: "Marketing Automation That Actually Works: Beyond Basic Email Sequences",
      excerpt: "Advanced automation strategies that create genuine business impact, not just email volume.",
      readTime: "9 min read",
      category: "Marketing Automation",
      slug: "marketing-automation-beyond-email-sequences",
      featured: false
    },
    {
      id: 7,
      title: "The Attribution Revolution: How Multi-Touch Attribution Transforms SMB Marketing",
      excerpt: "Why single-touch attribution is killing your marketing ROI and how to fix it with enterprise-grade attribution models.",
      readTime: "11 min read",
      category: "Analytics",
      slug: "attribution-revolution-multi-touch-smb-marketing",
      featured: false
    },
    {
      id: 8,
      title: "From $2M to $20M: The Complete Marketing Infrastructure Transformation",
      excerpt: "A detailed case study of how we transformed a SaaS company's marketing infrastructure to enable 10x growth.",
      readTime: "14 min read",
      category: "Case Study",
      slug: "2m-to-20m-marketing-infrastructure-transformation",
      featured: false
    },
    {
      id: 9,
      title: "The Creative Infrastructure: Building Systems That Scale Creative Production",
      excerpt: "How enterprise companies produce thousands of creative variations while maintaining brand consistency.",
      readTime: "8 min read",
      category: "Creative Strategy",
      slug: "creative-infrastructure-systems-scale-production",
      featured: false
    },
    {
      id: 10,
      title: "Data-Driven Marketing: Beyond Vanity Metrics to Business Impact",
      excerpt: "The metrics that actually matter for SMB growth and how to build systems that track them effectively.",
      readTime: "7 min read",
      category: "Analytics",
      slug: "data-driven-marketing-beyond-vanity-metrics",
      featured: false
    },
    {
      id: 11,
      title: "The MarTech Stack Revolution: How to Build Marketing Technology That Actually Works",
      excerpt: "Why most MarTech implementations fail and how to build technology stacks that drive real business results.",
      readTime: "13 min read",
      category: "Technology",
      slug: "martech-stack-revolution-technology-works",
      featured: false
    },
    {
      id: 12,
      title: "The Customer Journey Infrastructure: Building Systems That Convert",
      excerpt: "How to architect customer journeys that work across all touchpoints and drive consistent conversion rates.",
      readTime: "9 min read",
      category: "Customer Experience",
      slug: "customer-journey-infrastructure-systems-convert",
      featured: false
    }
  ];

  const categories = ["All", "Programmatic Advertising", "Strategy", "Business Transformation", "Analytics", "Case Study", "Marketing Automation"];

  return (
    <div className="min-h-screen bg-warm-linen">
      {/* Magnetic Cursor */}
      <MagneticCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-warm-linen to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-6">
              MARKETING INSIGHTS
            </div>
            <h1 className="text-6xl md:text-7xl font-display text-deep-charcoal mb-8 leading-tight">
              Marketing Infrastructure Intelligence
            </h1>
            <p className="text-xl text-deep-charcoal/80 leading-relaxed mb-12">
              Deep insights from our work transforming SMBs with enterprise-grade marketing infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="mb-16"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
              FEATURED ARTICLE
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              Latest Insights
            </h2>
          </motion.div>

          {blogPosts.filter(post => post.featured).map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.2 }}
              className="bg-gradient-to-br from-rich-navy to-deep-charcoal rounded-2xl p-8 text-white mb-16"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-burnt-orange text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-display text-white mb-6 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-end">
                    <Link href={`/blog/${post.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-burnt-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-burnt-orange/90 transition-colors flex items-center gap-2"
                      >
                        Read Article <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-8">
                  <div className="aspect-video bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {post.category === 'Programmatic Advertising' && '🎯'}
                        {post.category === 'Strategy' && '💡'}
                        {post.category === 'Business Transformation' && '👥'}
                        {post.category === 'Analytics' && '📊'}
                        {post.category === 'Case Study' && '📄'}
                        {post.category === 'Marketing Automation' && '⚡'}
                        {post.category === 'Creative Strategy' && '🎨'}
                        {post.category === 'Technology' && '🌐'}
                        {post.category === 'Customer Experience' && '📈'}
                      </div>
                      <div className="text-white/80 font-medium">{post.category}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-warm-linen">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-burnt-orange text-sm uppercase tracking-widest mb-4">
              ALL ARTICLES
            </div>
            <h2 className="text-5xl font-display text-deep-charcoal mb-6">
              Marketing Infrastructure Insights
            </h2>
            <p className="text-lg text-deep-charcoal/80 max-w-3xl mx-auto">
              Deep dives into the strategies, systems, and processes that transform SMB marketing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ amount: 0.2 }}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-rich-navy/10 to-burnt-orange/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {post.category === 'Programmatic Advertising' && '🎯'}
                      {post.category === 'Strategy' && '💡'}
                      {post.category === 'Business Transformation' && '👥'}
                      {post.category === 'Analytics' && '📊'}
                      {post.category === 'Case Study' && '📄'}
                      {post.category === 'Marketing Automation' && '⚡'}
                      {post.category === 'Creative Strategy' && '🎨'}
                      {post.category === 'Technology' && '🌐'}
                      {post.category === 'Customer Experience' && '📈'}
                    </div>
                    <div className="text-deep-charcoal/60 text-sm font-medium">{post.category}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-burnt-orange text-sm font-medium flex items-center gap-2">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display text-deep-charcoal mb-3 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-deep-charcoal/80 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-deep-charcoal/60 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-rich-navy font-medium hover:text-rich-navy/80 transition-colors flex items-center gap-2"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-rich-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.2 }}
          >
            <h2 className="text-5xl font-display text-warm-linen mb-6">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-warm-linen/90 mb-12 max-w-2xl mx-auto">
              Get our latest insights on marketing infrastructure, delivered weekly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-deep-charcoal focus:ring-2 focus:ring-burnt-orange focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-burnt-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-burnt-orange/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
