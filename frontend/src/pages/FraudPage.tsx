import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fraudAPI } from '../api/services'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import {
  ShieldAlert, Shield, AlertTriangle, XCircle, CheckCircle,
  Loader2, Clock, MessageSquare, Mail, Link as LinkIcon, BarChart3
} from 'lucide-react'

type ContentType = 'sms' | 'email' | 'link'
type RiskLevel = 'safe' | 'low' | 'medium' | 'high' | 'critical'

interface AnalysisResult {
  risk_score: number
  risk_level: RiskLevel
  threat_type: string | null
  explanation: string
  recommended_action: string
  red_flags: string[]
  report_id: string
}

const RISK_CONFIG: Record<RiskLevel, { color: string; bg: string; icon: typeof Shield; label: string; border: string }> = {
  safe: { color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle, label: 'Safe', border: 'border-green-500/30' },
  low: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: AlertTriangle, label: 'Low Risk', border: 'border-yellow-500/30' },
  medium: { color: 'text-orange-400', bg: 'bg-orange-500/10', icon: AlertTriangle, label: 'Medium Risk', border: 'border-orange-500/30' },
  high: { color: 'text-red-400', bg: 'bg-red-500/10', icon: ShieldAlert, label: 'High Risk', border: 'border-red-500/30' },
  critical: { color: 'text-red-300', bg: 'bg-red-700/20', icon: XCircle, label: '⚠️ CRITICAL', border: 'border-red-600/50' },
}

const contentTypes: { type: ContentType; label: string; icon: typeof MessageSquare; placeholder: string }[] = [
  { type: 'sms', label: 'SMS', icon: MessageSquare, placeholder: 'Paste the suspicious SMS message here...' },
  { type: 'email', label: 'Email', icon: Mail, placeholder: 'Paste the suspicious email content here...' },
  { type: 'link', label: 'Link / URL', icon: LinkIcon, placeholder: 'Paste the suspicious URL or link here...' },
]

export default function FraudPage() {
  const [content, setContent] = useState('')
  const [contentType, setContentType] = useState<ContentType>('sms')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const analyze = async () => {
    if (!content.trim()) {
      toast.error('Please paste some content to analyze')
      return
    }
    setIsLoading(true)
    setResult(null)
    try {
      const res = await fraudAPI.analyze(content, contentType)
      setResult(res.data)
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'Analysis failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadHistory = async () => {
    setShowHistory(true)
  }

  const riskPercent = result?.risk_score ?? 0
  const riskConfig = result ? RISK_CONFIG[result.risk_level] : null

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="section-container py-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-white">Fraud Detection Center</h1>
                <p className="text-gray-400 text-sm">AI-powered scam, phishing & fraud analysis</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              {/* Content Type Selector */}
              <div className="mb-5">
                <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">What are you checking?</p>
                <div className="grid grid-cols-3 gap-2">
                  {contentTypes.map(ct => {
                    const Icon = ct.icon
                    return (
                      <button
                        key={ct.type}
                        onClick={() => setContentType(ct.type)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                          contentType === ct.type
                            ? 'bg-electric-500/15 border-electric-500/40 text-electric-400'
                            : 'border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{ct.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Text Input */}
              <div className="mb-5">
                <label className="block text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">
                  Paste {contentType === 'link' ? 'URL' : contentType.toUpperCase()} Content
                </label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder={contentTypes.find(c => c.type === contentType)?.placeholder}
                  className="input-glass w-full h-48 resize-none text-sm leading-relaxed"
                  style={{ fontFamily: 'monospace' }}
                />
                <p className="text-xs text-gray-600 mt-1">{content.length} characters</p>
              </div>

              <button
                onClick={analyze}
                disabled={isLoading || !content.trim()}
                className="btn-primary w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: isLoading ? undefined : 'linear-gradient(135deg, #dc2626, #ef4444)' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    Analyze for Fraud
                  </>
                )}
              </button>

              <button
                onClick={loadHistory}
                className="btn-ghost w-full justify-center mt-3 text-sm"
              >
                <Clock className="w-4 h-4" />
                View Analysis History
              </button>
            </motion.div>

            {/* Result Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <AnimatePresence mode="wait">
                {!result && !isLoading && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-8 flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-red-400/50" />
                    </div>
                    <h3 className="font-semibold text-gray-300 mb-2">AI Analysis Ready</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                      Paste suspicious content on the left and click analyze to get instant AI-powered fraud detection.
                    </p>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-8 flex flex-col items-center justify-center h-full min-h-[400px]"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 rounded-full border-2 border-red-500/30 border-t-red-500 mb-6"
                    />
                    <p className="text-white font-semibold mb-2">AI Analyzing Content...</p>
                    <p className="text-xs text-gray-500 text-center">
                      Checking against fraud patterns, phishing databases, and scam signatures
                    </p>
                  </motion.div>
                )}

                {result && riskConfig && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Risk Score Card */}
                    <div className={`glass-card p-6 border ${riskConfig.border}`}>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl ${riskConfig.bg} flex items-center justify-center`}>
                            <riskConfig.icon className={`w-6 h-6 ${riskConfig.color}`} />
                          </div>
                          <div>
                            <p className={`font-display font-bold text-xl ${riskConfig.color}`}>
                              {riskConfig.label}
                            </p>
                            {result.threat_type && (
                              <p className="text-xs text-gray-400 capitalize">
                                {result.threat_type.replace(/_/g, ' ')}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-display font-bold text-4xl ${riskConfig.color}`}>
                            {riskPercent}
                          </p>
                          <p className="text-xs text-gray-500">Risk Score</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="h-3 bg-navy-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${riskPercent}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              result.risk_level === 'safe' ? 'bg-green-400' :
                              result.risk_level === 'low' ? 'bg-yellow-400' :
                              result.risk_level === 'medium' ? 'bg-orange-400' :
                              result.risk_level === 'high' ? 'bg-red-400' : 'bg-red-600'
                            }`}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>0 — Safe</span>
                          <span>100 — Critical</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 leading-relaxed">{result.explanation}</p>
                    </div>

                    {/* Recommended Action */}
                    <div className="glass-card p-4 border border-electric-500/15">
                      <p className="text-xs font-semibold text-electric-400 mb-2 uppercase tracking-wider">Recommended Action</p>
                      <p className="text-sm text-gray-300">{result.recommended_action}</p>
                    </div>

                    {/* Red Flags */}
                    {result.red_flags.length > 0 && (
                      <div className="glass-card p-4">
                        <p className="text-xs font-semibold text-red-400 mb-3 uppercase tracking-wider">
                          🚩 Red Flags Detected
                        </p>
                        <div className="space-y-2">
                          {result.red_flags.map((flag, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                              <p className="text-xs text-gray-400">{flag}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* History */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 glass-card p-6"
              >
                <h2 className="font-display font-bold text-lg text-white mb-4">Analysis History</h2>
                {history.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">No previous analyses found</p>
                ) : (
                  <div className="space-y-3">
                    {history.map((item: any) => {
                      const rc = RISK_CONFIG[item.risk_level as RiskLevel]
                      return (
                        <div key={item.report_id} className="flex items-center gap-4 p-3 rounded-xl"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div className={`w-8 h-8 rounded-lg ${rc?.bg} flex items-center justify-center flex-shrink-0`}>
                            <BarChart3 className={`w-4 h-4 ${rc?.color}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-300 truncate">{item.content}</p>
                            <p className="text-xs text-gray-600">{item.content_type} · {new Date(item.analyzed_at).toLocaleDateString('en-IN')}</p>
                          </div>
                          <span className={`badge ${item.risk_level === 'safe' ? 'badge-safe' : item.risk_level === 'low' ? 'badge-low' : item.risk_level === 'medium' ? 'badge-medium' : 'badge-high'} flex-shrink-0`}>
                            {rc?.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
