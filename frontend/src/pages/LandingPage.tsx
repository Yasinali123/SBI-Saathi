import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  MessageSquare, ShieldAlert, FileText, BookOpen,
  ArrowRight, Star, CheckCircle, Zap, Globe2, Lock, TrendingUp,
  ChevronRight, Sparkles, Users, BarChart3
} from 'lucide-react'
import { SbiLogo } from '../components/SbiLogo'


const features = [
  {
    icon: MessageSquare,
    title: 'AI Banking Assistant',
    description: 'Get instant answers to banking queries, UPI guidance, loan info, and financial advice in your language.',
    gradient: 'from-blue-500 to-cyan-400',
    href: '/chat',
  },
  {
    icon: ShieldAlert,
    title: 'Fraud Detection Center',
    description: 'Paste any SMS, email, or link to instantly detect scams, phishing, and financial fraud with AI.',
    gradient: 'from-red-500 to-orange-400',
    href: '/fraud',
  },
  {
    icon: FileText,
    title: 'Document Explainer',
    description: 'Upload loan agreements, insurance policies, and bank forms to get plain-language AI summaries.',
    gradient: 'from-purple-500 to-pink-400',
    href: '/documents',
  },
  {
    icon: BookOpen,
    title: 'Learning Hub',
    description: 'Master digital banking with guided courses, track your progress, earn badges and certificates.',
    gradient: 'from-green-500 to-emerald-400',
    href: '/learn',
  },
]

const stats = [
  { value: '10M+', label: 'Banking Customers Protected' },
  { value: '99.7%', label: 'Fraud Detection Accuracy' },
  { value: '15+', label: 'Indian Languages Supported' },
  { value: '4.9★', label: 'Customer Satisfaction' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Small Business Owner, Mumbai',
    avatar: 'PS',
    content: 'SBI Saathi helped me detect a KYC fraud attempt that could have cost me ₹2 lakhs. The AI explained exactly what was suspicious. Incredible!',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Retired Teacher, Patna',
    avatar: 'RK',
    content: 'As someone new to digital banking, the Learning Hub explained UPI to me in Hindi. Now I use it every day with full confidence.',
    rating: 5,
  },
  {
    name: 'Anjali Nair',
    role: 'Software Engineer, Bangalore',
    avatar: 'AN',
    content: 'The Document Explainer saved hours of reading my home loan agreement. It flagged a hidden penalty clause my bank never mentioned!',
    rating: 5,
  },
]

const trustBadges = [
  { icon: Lock, label: '256-bit SSL Encryption' },
  { icon: ShieldAlert, label: 'RBI Compliant Security' },
  { icon: CheckCircle, label: 'ISO 27001 Certified' },
  { icon: Globe2, label: '24/7 AI Protection' },
]

export default function LandingPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #020B18 0%, #0A1628 100%)' }}>
      {/* Landing Navbar */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(2, 11, 24, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="section-container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-electric-500/20">
              <SbiLogo className="w-7 h-7 text-[#16d]" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="gradient-text">SBI</span>
              <span className="text-white ml-1">Saathi</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
            <Link to="/signup" className="btn-primary text-sm px-5 py-2.5">
              Get Started Free
            </Link>
          </div>
          <Link to="/signup" className="md:hidden btn-primary text-sm px-4 py-2">
            Start Free
          </Link>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(30,144,255,0.08) 0%, transparent 70%)',
            }} />
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(30,144,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,144,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-20">
              {/* Left — Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                    style={{
                      background: 'rgba(30,144,255,0.15)',
                      border: '1px solid rgba(30,144,255,0.3)',
                      color: '#4DA8FF',
                    }}>
                    <Sparkles className="w-3 h-3" />
                    Powered by Gemini AI & SBI
                  </div>

                  <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                    Your Intelligent{' '}
                    <span className="gradient-text text-shadow-glow">Banking Companion</span>{' '}
                    for a Smarter Financial Future
                  </h1>

                  <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                    AI-powered banking assistance, fraud protection, financial coaching, and digital literacy — all in one secure platform trusted by millions.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-10">
                    <Link to="/signup" className="btn-primary text-base px-7 py-3.5">
                      <Sparkles className="w-5 h-5" />
                      Start Free
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/signup" className="btn-secondary text-base px-7 py-3.5">
                      <MessageSquare className="w-5 h-5" />
                      Try AI Assistant
                    </Link>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap gap-6">
                    {[
                      { icon: '🔒', text: 'Bank-grade security' },
                      { icon: '🇮🇳', text: 'Made for India' },
                      { icon: '🤖', text: 'Gemini AI powered' },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right — Floating Dashboard Preview */}
              <div className="relative hidden lg:block">
                <div className="relative w-full h-[550px]">
                  {/* Main Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="absolute inset-0 glass-card p-6"
                    style={{ border: '1px solid rgba(30,144,255,0.2)' }}
                  >
                    {/* Mock AI Chat */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-electric flex items-center justify-center shadow-md">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">SBI Saathi AI</p>
                        <div className="flex items-center gap-1">
                          <span className="glow-dot w-1.5 h-1.5" />
                          <p className="text-xs text-green-400">Online</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-end">
                        <div className="chat-bubble-user text-xs">What is my UPI transaction limit?</div>
                      </div>
                      <div className="flex justify-start">
                        <div className="chat-bubble-ai text-xs max-w-[85%]">
                          Your daily UPI transaction limit is ₹1 lakh per day. For BHIM SBI Pay, you can make up to 20 transactions daily. Need help increasing your limit? 💳
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="chat-bubble-user text-xs">How to detect a fraud SMS?</div>
                      </div>
                      <div className="flex gap-2">
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Protected', value: '12.4K', icon: '🛡️' },
                        { label: 'Queries', value: '89.2K', icon: '💬' },
                        { label: 'Accuracy', value: '99.7%', icon: '🎯' },
                      ].map(s => (
                        <div key={s.label} className="text-center p-2 rounded-xl"
                          style={{ background: 'rgba(30,144,255,0.08)' }}>
                          <p className="text-lg">{s.icon}</p>
                          <p className="text-sm font-bold text-white">{s.value}</p>
                          <p className="text-xs text-gray-500">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>


                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-electric-500/50" />
          <ChevronRight className="w-4 h-4 text-electric-500 rotate-90" />
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 border-y border-white/5"
        style={{ background: 'rgba(30,144,255,0.03)' }}>
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display font-bold text-3xl lg:text-4xl gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(30,144,255,0.1)', border: '1px solid rgba(30,144,255,0.2)', color: '#4DA8FF' }}>
              <Sparkles className="w-3 h-3" />
              Complete AI Banking Suite
            </div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Bank Smarter</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Four powerful AI modules working together to protect, educate, and empower every Indian banking customer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to="/signup" className="glass-card-hover p-8 block group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-5`}>
                      <div className="w-full h-full rounded-2xl bg-navy-900 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                    <div className="flex items-center gap-2 text-electric-400 text-sm font-medium group-hover:gap-3 transition-all">
                      Explore feature <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20" style={{ background: 'rgba(30,144,255,0.03)' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              <span className="gradient-text">Enterprise-Grade Security</span>{' '}
              You Can Trust
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Built with the same security standards used by India's largest banks and financial institutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {trustBadges.map((badge, i) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-5 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-electric-500/15 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-electric-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-300">{badge.label}</p>
                </motion.div>
              )
            })}
          </div>

          {/* AI Agent highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 lg:p-12"
            style={{ border: '1px solid rgba(30,144,255,0.2)' }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>
                  <Zap className="w-3 h-3" />
                  Agentic AI System
                </div>
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-4">
                  An AI That Works{' '}
                  <span className="gradient-text">For You Proactively</span>
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Unlike traditional banking apps, SBI Saathi's AI doesn't wait for you to ask. It monitors your activity, detects unusual patterns, suggests personalized learning, and warns you before threats escalate.
                </p>
                <div className="space-y-3">
                  {[
                    'Proactive fraud pattern warnings',
                    'Personalized course recommendations',
                    'Smart banking action suggestions',
                    'Achievement & streak tracking',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-cyan-accent flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: '📚', title: 'Course Suggested', desc: 'You asked UPI questions 3 times — try UPI Basics course!', priority: 'medium' },
                  { icon: '⚠️', title: 'Scam Pattern Detected', desc: 'The SMS you analyzed matches a known KYC fraud pattern.', priority: 'high' },
                  { icon: '🏆', title: 'Achievement Unlocked!', desc: 'You completed Banking Security — Fraud Fighter badge earned!', priority: 'low' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="glass-card p-4 flex items-start gap-3"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Trusted by{' '}
              <span className="gradient-text">Millions of Indians</span>
            </h2>
            <p className="text-gray-400">Real stories from real customers across India</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-electric flex items-center justify-center text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass-card text-center py-20 px-8 overflow-hidden"
            style={{ border: '1px solid rgba(30,144,255,0.2)' }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(30,144,255,0.1) 0%, transparent 70%)' }} />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ background: 'rgba(30,144,255,0.15)', border: '1px solid rgba(30,144,255,0.3)', color: '#4DA8FF' }}>
                <Users className="w-4 h-4" />
                Join 10 Million+ Indians Already Banking Smarter
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-5xl mb-6">
                Start Your AI Banking Journey{' '}
                <span className="gradient-text">Today — Free</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                No credit card required. No hidden fees. Just powerful AI banking tools that keep you safe and financially empowered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                  <Sparkles className="w-5 h-5" />
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Sign In to Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5" style={{ background: 'rgba(2,11,24,0.9)' }}>
        <div className="section-container py-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-electric-500/20">
                  <SbiLogo className="w-7 h-7 text-[#16d]" />
                </div>
                <span className="font-display font-bold text-xl">
                  <span className="gradient-text">SBI</span>
                  <span className="text-white ml-1">Saathi</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                India's most intelligent AI-powered banking companion. Protecting and empowering every Indian customer.
              </p>
              <div className="flex gap-3 mt-5">
                {['🏦', '🤖', '🔐', '🇮🇳'].map(e => (
                  <span key={e} className="text-xl">{e}</span>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Platform',
                links: ['AI Assistant', 'Fraud Detection', 'Document Explainer', 'Learning Hub'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'Contact Us', 'Community', 'Status'],
              },
              {
                title: 'Legal',
                links: ['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'],
              },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-semibold text-white text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              © 2024 SBI Saathi. A project powered by SBI & Gemini AI. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Lock className="w-3 h-3" />
              256-bit SSL secured
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
