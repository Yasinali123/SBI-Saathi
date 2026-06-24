import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
// API removed for lightweight version
import Navbar from '../components/Navbar'
import {
  MessageSquare, ShieldAlert, FileText, BookOpen,
  TrendingUp, Award, Flame, Zap, ArrowRight,
  BarChart3, Shield, BookMarked, Brain
} from 'lucide-react'

interface DashboardSummary {
  stats: {
    total_chats: number
    total_fraud_checks: number
    threats_blocked: number
    badges_earned: number
    learning_streak: number
    completed_courses: number
  }
  last_chat_preview: string | null
  recent_badges: string[]
  user: { name: string; email: string }
}

const quickActions = [
  {
    icon: MessageSquare,
    label: 'Ask AI Assistant',
    desc: 'Get banking help in your language',
    href: '/chat',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: ShieldAlert,
    label: 'Check for Fraud',
    desc: 'Analyze SMS, email, or links',
    href: '/fraud',
    gradient: 'from-red-500 to-orange-400',
  },
  {
    icon: FileText,
    label: 'Explain Document',
    desc: 'Upload banking documents',
    href: '/documents',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    icon: BookOpen,
    label: 'Continue Learning',
    desc: 'Pick up where you left off',
    href: '/learn',
    gradient: 'from-green-500 to-emerald-400',
  },
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      // Mock stats for lightweight hackathon version
      const badges = JSON.parse(localStorage.getItem('earned_badges') || '[]')
      const coursesCompleted = Math.floor(badges.length / 2) // mock logic
      
      setSummary({
        stats: {
          total_chats: 12,
          total_fraud_checks: 5,
          threats_blocked: 2,
          badges_earned: badges.length,
          learning_streak: localStorage.getItem('isLoggedIn') ? 1 : 0,
          completed_courses: coursesCompleted,
        },
        last_chat_preview: "Hello! How can I help you with your banking needs today?",
        recent_badges: badges.slice(-3),
        user: { name: user?.name || 'User', email: user?.email || '' }
      })
      
      setSuggestions([
        { type: 'tip', title: 'Security Check', message: 'Remember to never share your UPI PIN.', action_label: 'Learn More', action_url: '/learn' },
        { type: 'feature', title: 'Try Document Explainer', message: 'Upload a bank statement to get an AI summary.', action_label: 'Try Now', action_url: '/documents' }
      ])
      
      setIsLoading(false)
    }
    loadDashboard()
  }, [user])

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const stats = summary?.stats

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="section-container py-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">{greeting()},</p>
                <h1 className="font-display font-bold text-3xl text-white">
                  {user?.name?.split(' ')[0]} 👋
                </h1>
                {stats?.learning_streak && stats.learning_streak > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-orange-400 font-medium">
                      {stats.learning_streak} day learning streak!
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {stats?.badges_earned && stats.badges_earned > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-xl">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">{stats.badges_earned} badges</span>
                  </div>
                )}
                <Link to="/chat" className="btn-primary text-sm px-4 py-2">
                  <Brain className="w-4 h-4" />
                  Ask AI
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: t('dashboard.stats.alerts'), value: stats?.total_chats ?? 0, icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { label: t('dashboard.stats.docs'), value: stats?.total_fraud_checks ?? 0, icon: Shield, color: 'text-green-400', bg: 'bg-green-500/10' },
              { label: t('dashboard.stats.score'), value: stats?.threats_blocked ?? 0, icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10' },
              { label: t('dashboard.stats.modules'), value: stats?.badges_earned ?? 0, icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="stat-card"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                    <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                  </div>
                  <p className="font-display font-bold text-2xl text-white">
                    {isLoading ? (
                      <span className="inline-block w-12 h-7 bg-navy-700 animate-pulse rounded" />
                    ) : (
                      s.value.toLocaleString()
                    )}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h2 className="font-display font-bold text-lg text-white mb-5">{t('dashboard.recentActivity')}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {quickActions.map((action, i) => {
                    const Icon = action.icon
                    return (
                      <Link
                        key={action.label}
                        to={action.href}
                        className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/5"
                        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.gradient} p-0.5 flex-shrink-0`}>
                          <div className="w-full h-full rounded-xl bg-navy-900 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white group-hover:text-electric-400 transition-colors">{action.label}</p>
                          <p className="text-xs text-gray-500 truncate">{action.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-electric-400 ml-auto flex-shrink-0 transition-all group-hover:translate-x-1" />
                      </Link>
                    )
                  })}
                </div>
              </motion.div>

              {/* Last AI Chat */}
              {summary?.last_chat_preview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-lg text-white">Recent AI Chat</h2>
                    <Link to="/chat" className="text-xs text-electric-400 hover:text-electric-300 flex items-center gap-1">
                      Continue <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-electric flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🤖</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                        {summary.last_chat_preview}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Learning Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-lg text-white">Learning Progress</h2>
                  <Link to="/learn" className="text-xs text-electric-400 hover:text-electric-300 flex items-center gap-1">
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="font-display font-bold text-3xl gradient-text">{stats?.completed_courses ?? 0}</p>
                    <p className="text-xs text-gray-500">Courses Done</p>
                  </div>
                  <div className="h-12 w-px bg-white/5" />
                  <div className="text-center">
                    <p className="font-display font-bold text-3xl text-orange-400">{stats?.learning_streak ?? 0}</p>
                    <p className="text-xs text-gray-500">Day Streak 🔥</p>
                  </div>
                  <div className="flex-1">
                    <Link to="/learn" className="btn-primary text-sm px-4 py-2 w-full justify-center">
                      <BookMarked className="w-4 h-4" />
                      Start Learning
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* AI Agent Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 h-fit"
              style={{ border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-cyan-accent/15 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-cyan-accent" />
                </div>
                <div>
                  <h2 className="font-semibold text-white text-sm">AI Agent</h2>
                  <div className="flex items-center gap-1">
                    <span className="glow-dot" />
                    <span className="text-xs text-green-400">Monitoring</span>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-navy-800 animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : suggestions.length > 0 ? (
                <div className="space-y-3">
                  {suggestions.map((s: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-lg">
                          {s.type === 'course_recommendation' ? '📚' :
                           s.type === 'fraud_warning' ? '⚠️' :
                           s.type === 'achievement' ? '🏆' : '💡'}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{s.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{s.message}</p>
                        </div>
                      </div>
                      <Link
                        to={s.action_url || '#'}
                        className="text-xs text-electric-400 hover:text-electric-300 flex items-center gap-1 font-medium"
                      >
                        {s.action_label} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Brain className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Start using SBI Saathi — the AI agent will generate personalized recommendations based on your activity.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
