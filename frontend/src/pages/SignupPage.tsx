import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Phone, CheckCircle } from 'lucide-react'
import { SbiLogo } from '../components/SbiLogo'

const passwordStrength = (p: string) => {
  if (p.length < 6) return { score: 0, label: 'Too short', color: 'bg-red-500' }
  if (p.length < 8) return { score: 1, label: 'Weak', color: 'bg-orange-500' }
  if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { score: 3, label: 'Strong', color: 'bg-green-500' }
  return { score: 2, label: 'Good', color: 'bg-yellow-500' }
}

export default function SignupPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const strength = passwordStrength(form.password)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name || form.name.length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password || form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    try {
      await signup(form.name, form.email, form.password, form.phone || undefined)
      toast.success('Account created! Welcome to SBI Saathi 🎉')
      navigate('/dashboard')
    } catch (err: any) {
      const msg = err?.response?.data?.detail || 'Signup failed. Please try again.'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const perks = [
    'AI Banking Assistant in 15+ languages',
    'Real-time fraud detection & protection',
    'Document analysis & explainer',
    'Learning hub with certificates',
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #020B18 0%, #0A1628 60%, #071220 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — Perks */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-electric-500/20">
              <SbiLogo className="w-9 h-9 text-[#16d]" />
            </div>
            <span className="font-display font-bold text-2xl">
              <span className="gradient-text">SBI</span>
              <span className="text-white ml-1">Saathi</span>
            </span>
          </Link>

          <h2 className="font-display font-bold text-4xl text-white mb-4 leading-tight">
            Your AI-Powered<br />
            <span className="gradient-text">Banking Future</span><br />
            Starts Here
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Join millions of Indians who trust SBI Saathi to protect, educate, and empower their banking journey.
          </p>

          <div className="space-y-4">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-accent/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-accent" />
                </div>
                <span className="text-gray-300 text-sm">{perk}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 glass-card p-5" style={{ border: '1px solid rgba(0,212,255,0.15)' }}>
            <p className="text-xs text-gray-400 mb-1">🔒 Security First</p>
            <p className="text-sm text-gray-300">Your data is encrypted end-to-end and never shared with third parties.</p>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-electric-500/20">
                <SbiLogo className="w-7 h-7 text-[#16d]" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="gradient-text">SBI</span>
                <span className="text-white ml-1">Saathi</span>
              </span>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="font-display font-bold text-2xl text-white mb-1">Create your account</h1>
            <p className="text-gray-400 text-sm">Free forever. No credit card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-7 space-y-4"
            style={{ border: '1px solid rgba(30,144,255,0.15)' }}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Rajesh Kumar"
                  className={`input-glass pl-10 ${errors.name ? 'border-red-500/50' : ''}`}
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  className={`input-glass pl-10 ${errors.email ? 'border-red-500/50' : ''}`}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Mobile Number <span className="text-gray-600 text-xs">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="input-glass pl-10"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="At least 8 characters"
                  className={`input-glass pl-10 pr-10 ${errors.password ? 'border-red-500/50' : ''}`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < strength.score ? strength.color : 'bg-navy-700'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{strength.label}</span>
                </div>
              )}
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                  placeholder="Repeat your password"
                  className={`input-glass pl-10 ${errors.confirm ? 'border-red-500/50' : ''}`}
                  autoComplete="new-password"
                />
              </div>
              {errors.confirm && <p className="text-xs text-red-400 mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-3.5 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                />
              ) : (
                <>
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-electric-400 hover:text-electric-300 font-medium">
                {t('auth.login')}
              </Link>
            </p>
          </form>

          <p className="text-center text-xs text-gray-600 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  )
}
