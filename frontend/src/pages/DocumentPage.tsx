import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { documentAPI } from '../api/services'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import {
  FileText, Upload, X, CheckCircle, AlertTriangle,
  Loader2, Eye, Calendar, DollarSign, FileWarning
} from 'lucide-react'

interface DocumentResult {
  document_id: string
  filename: string
  summary: string
  key_points: string[]
  risk_clauses: string[]
  document_type: string
  extracted_text_preview: string
  important_dates?: string[]
  financial_obligations?: string[]
}

const docTypeIcons: Record<string, string> = {
  loan_agreement: '🏦',
  insurance_policy: '🛡️',
  kyc_form: '🪪',
  bank_statement: '📊',
  investment_document: '📈',
  other: '📄',
}

const docTypeLabels: Record<string, string> = {
  loan_agreement: 'Loan Agreement',
  insurance_policy: 'Insurance Policy',
  kyc_form: 'KYC Form',
  bank_statement: 'Bank Statement',
  investment_document: 'Investment Document',
  other: 'Banking Document',
}

export default function DocumentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<DocumentResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previewText, setPreviewText] = useState(false)

  const handleFile = (f: File) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowed.includes(f.type)) {
      toast.error('Please upload a PDF, JPG, or PNG file')
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10MB')
      return
    }
    setFile(f)
    setResult(null)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [])

  const analyze = async () => {
    if (!file) return
    setIsLoading(true)
    try {
      const res = await documentAPI.upload(file)
      setResult(res.data)
      toast.success('Document analyzed successfully!')
    } catch (err: any) {
      const msg = err?.response?.data?.detail || 'Analysis failed. Please try again.'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

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
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-white">Document Explainer</h1>
                <p className="text-gray-400 text-sm">AI extracts, simplifies and highlights banking documents</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {/* Drop Zone */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`glass-card p-8 border-2 border-dashed transition-all duration-300 cursor-pointer text-center ${
                  isDragging ? 'border-electric-500/60 bg-electric-500/5' : 'border-white/10 hover:border-electric-500/30'
                }`}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div
                      key="file"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-7 h-7 text-purple-400" />
                      </div>
                      <p className="font-semibold text-white mb-1 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      <button
                        onClick={e => { e.stopPropagation(); setFile(null); setResult(null) }}
                        className="mt-3 inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" /> Remove file
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-7 h-7 text-gray-500" />
                      </div>
                      <p className="text-white font-semibold mb-1">Drop your document here</p>
                      <p className="text-gray-500 text-sm mb-3">or click to browse</p>
                      <p className="text-xs text-gray-600">Supports PDF, JPG, PNG · Max 10MB</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Supported Documents */}
              <div className="glass-card p-5">
                <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">
                  Supported Document Types
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(docTypeIcons).map(([type, icon]) => (
                    <div key={type} className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{icon}</span>
                      <span className="text-xs">{docTypeLabels[type]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={analyze}
                disabled={!file || isLoading}
                className="btn-primary w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: (!file || isLoading) ? undefined : 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI Analyzing Document...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Analyze Document
                  </>
                )}
              </button>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <AnimatePresence mode="wait">
                {!result && !isLoading && (
                  <motion.div
                    key="empty"
                    className="glass-card p-8 flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                      <Eye className="w-8 h-8 text-purple-400/50" />
                    </div>
                    <h3 className="font-semibold text-gray-300 mb-2">Ready to Analyze</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                      Upload a banking document and our AI will extract text, summarize it, and highlight important clauses.
                    </p>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div
                    key="loading"
                    className="glass-card p-8 flex flex-col items-center justify-center h-full min-h-[400px]"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-500 mb-6"
                    />
                    <p className="text-white font-semibold mb-2">Processing Document...</p>
                    <p className="text-xs text-gray-500 text-center">
                      Extracting text, identifying clauses, and generating summary
                    </p>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Document Type */}
                    <div className="glass-card p-4 flex items-center gap-3"
                      style={{ border: '1px solid rgba(168,85,247,0.2)' }}>
                      <span className="text-3xl">{docTypeIcons[result.document_type] || '📄'}</span>
                      <div>
                        <p className="font-semibold text-white">{result.filename}</p>
                        <p className="text-xs text-purple-400">{docTypeLabels[result.document_type] || 'Document'}</p>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="glass-card p-5">
                      <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">AI Summary</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{result.summary}</p>
                    </div>

                    {/* Key Points */}
                    {result.key_points?.length > 0 && (
                      <div className="glass-card p-5">
                        <p className="text-xs font-semibold text-green-400 mb-3 uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Key Points
                        </p>
                        <ul className="space-y-2">
                          {result.key_points.map((pt, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                              <span className="text-electric-400 mt-0.5">▸</span>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Risk Clauses */}
                    {result.risk_clauses?.length > 0 && (
                      <div className="glass-card p-5" style={{ border: '1px solid rgba(234,179,8,0.2)' }}>
                        <p className="text-xs font-semibold text-yellow-400 mb-3 uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Clauses to Watch
                        </p>
                        <ul className="space-y-2">
                          {result.risk_clauses.map((clause, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                              <FileWarning className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                              {clause}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Financial Obligations */}
                    {result.financial_obligations && result.financial_obligations.length > 0 && (
                      <div className="glass-card p-5">
                        <p className="text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wider flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> Financial Obligations
                        </p>
                        <ul className="space-y-2">
                          {result.financial_obligations.map((ob, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                              <span className="text-orange-400 mt-0.5">•</span>
                              {ob}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Important Dates */}
                    {result.important_dates && result.important_dates.length > 0 && (
                      <div className="glass-card p-5">
                        <p className="text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wider flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Important Dates
                        </p>
                        <ul className="space-y-2">
                          {result.important_dates.map((d, i) => (
                            <li key={i} className="text-xs text-gray-300">• {d}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Extracted Text Preview */}
                    <button
                      onClick={() => setPreviewText(!previewText)}
                      className="btn-ghost text-xs w-full justify-center"
                    >
                      <Eye className="w-3 h-3" />
                      {previewText ? 'Hide' : 'Show'} Extracted Text Preview
                    </button>
                    <AnimatePresence>
                      {previewText && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="glass-card p-4"
                        >
                          <p className="text-xs text-gray-500 font-mono leading-relaxed whitespace-pre-wrap">
                            {result.extracted_text_preview}...
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
