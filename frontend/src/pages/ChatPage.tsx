import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { chatAPI } from '../api/services'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  Send, Mic, MicOff, Trash2, Plus, Zap, Globe, ChevronDown, MessageSquare, Menu, X, Play, Pause, Square, Volume2
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatSession {
  session_id: string;
  messages: Message[];
  created_at?: string;
  updated_at?: string;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' }
]

const suggestions = [
  'What is my UPI daily transaction limit?',
  'How do I lock my SBI debit card?',
  'Explain FD interest rates',
  'How to apply for SBI home loan?',
  'What are safe digital payment practices?',
  'Tell me about PM Jan Dhan Yojana',
]

const getVoiceLang = (code: string) => {
  const map: Record<string, string> = {
    'en': 'en-IN', 'hi': 'hi-IN', 'bn': 'bn-IN', 'ta': 'ta-IN', 'te': 'te-IN',
    'mr': 'mr-IN', 'gu': 'gu-IN', 'kn': 'kn-IN', 'ml': 'ml-IN', 'pa': 'pa-IN'
  }
  return map[code] || 'en-IN'
}

export default function ChatPage() {
  const { t, i18n } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([])
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // Voice State
  const [isListening, setIsListening] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  
  const [language, setLanguage] = useState(i18n.language || 'en')
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [historyLoaded, setHistoryLoaded] = useState(false)
  
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<any>(null)
  const silenceTimerRef = useRef<any>(null)
  const inputStateRef = useRef(input)

  useEffect(() => {
    inputStateRef.current = input
  }, [input])

  // Sync language with global i18n
  useEffect(() => {
    if (i18n.language !== language) {
      setLanguage(i18n.language)
    }
  }, [i18n.language])

  // Load chat history (disabled for lightweight version)
  const loadHistory = async () => {
    setHistoryLoaded(true)
  }

  useEffect(() => {
    loadHistory()
    // Pre-warm voices
    window.speechSynthesis.getVoices()
    return () => {
      window.speechSynthesis.cancel()
      recognitionRef.current?.stop()
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, interimTranscript])

  const speakText = (text: string, msgId: string) => {
    window.speechSynthesis.cancel()
    setIsPaused(false)
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = getVoiceLang(language)
    
    const voices = window.speechSynthesis.getVoices()
    const matchingVoice = voices.find(v => v.lang.includes(language) || v.lang.includes(getVoiceLang(language)))
    if (matchingVoice) utterance.voice = matchingVoice

    utterance.onstart = () => {
      setIsSpeaking(true)
      setSpeakingMsgId(msgId)
    }
    utterance.onend = () => {
      setIsSpeaking(false)
      setSpeakingMsgId(null)
      setIsPaused(false)
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      setSpeakingMsgId(null)
      setIsPaused(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setSpeakingMsgId(null)
    setIsPaused(false)
  }

  const pauseSpeaking = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
  }

  const resumeSpeaking = () => {
    window.speechSynthesis.resume()
    setIsPaused(false)
  }

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg || isLoading) return

    stopSpeaking()
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      clearTimeout(silenceTimerRef.current)
    }

    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: msg,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setInterimTranscript('')
    setIsLoading(true)

    try {
      const res = await chatAPI.sendMessage(msg, language, currentSessionId || undefined)
      const aiMsgId = Math.random().toString(36).substr(2, 9)
      const aiMsg: Message = {
        id: aiMsgId,
        role: 'assistant',
        content: res.data.response,
        timestamp: res.data.timestamp,
      }
      setMessages(prev => [...prev, aiMsg])
      
      if (!currentSessionId) {
        setCurrentSessionId(res.data.session_id)
      }
      
      // Auto-play AI response
      setTimeout(() => {
        speakText(res.data.response, aiMsgId)
      }, 100)

      // Refresh sidebar silently (disabled)
      setSessions([{
        session_id: currentSessionId || res.data.session_id,
        messages: [...messages, userMsg, aiMsg]
      }])

    } catch (err: any) {
      toast.error(t('chat.error') || 'Failed to get response. Please try again.')
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Keyboard shortcut for Voice (Ctrl + Space)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault()
        toggleVoice()
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isListening])

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser. Please use Chrome or Edge.')
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      clearTimeout(silenceTimerRef.current)
      setInterimTranscript('')
      return
    }

    // Stop TTS if playing
    stopSpeaking()

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = getVoiceLang(language)
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event: any) => {
      let finalTranscript = ''
      let tempInterim = ''

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          tempInterim += event.results[i][0].transcript
        }
      }

      if (finalTranscript) {
        setInput(prev => {
           const newVal = prev + (prev && !prev.endsWith(' ') ? ' ' : '') + finalTranscript
           return newVal
        })
      }
      setInterimTranscript(tempInterim)

      // Auto stop and send after 2.5s of silence
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = setTimeout(() => {
        recognition.stop()
        setIsListening(false)
        setInterimTranscript('')
        if (inputStateRef.current.trim()) {
           sendMessage(inputStateRef.current)
        }
      }, 2500)
    }

    recognition.onend = () => {
      setIsListening(false)
      setInterimTranscript('')
    }
    
    recognition.onerror = (e: any) => {
      if (e.error === 'not-allowed') {
        toast.error('Microphone access denied. Please allow permissions in your browser.')
      } else if (e.error !== 'no-speech') {
        toast.error('Microphone error: ' + e.error)
      }
      setIsListening(false)
      clearTimeout(silenceTimerRef.current)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  const clearHistory = async () => {
    setMessages([])
    setSessions([])
    setCurrentSessionId(null)
    toast.success('Chat history cleared')
  }

  const newSession = async () => {
    setMessages([])
    setCurrentSessionId(null)
    setIsSidebarOpen(false)
    stopSpeaking()
  }

  const selectSession = (session: ChatSession) => {
    const processedMessages = session.messages.map(m => ({ ...m, id: m.id || Math.random().toString(36).substr(2, 9) }))
    setMessages(processedMessages)
    setCurrentSessionId(session.session_id)
    setIsSidebarOpen(false)
    stopSpeaking()
  }

  const selectedLang = languages.find(l => l.code === language)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 pt-16 z-40 w-72 bg-[#0B1121] border-r border-white/5 transform transition-transform duration-300 md:relative md:pt-0 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          <div className="p-4 flex items-center justify-between">
            <button
              onClick={newSession}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-electric text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden ml-2 p-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
            {sessions.map((session) => {
              const firstMsg = session.messages.find(m => m.role === 'user')?.content || 'New Chat'
              const title = firstMsg.length > 35 ? firstMsg.substring(0, 35) + '...' : firstMsg
              const isActive = session.session_id === currentSessionId

              return (
                <button
                  key={session.session_id}
                  onClick={() => selectSession(session)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-electric-500/10 border border-electric-500/30 text-electric-400' 
                      : 'hover:bg-white/5 text-gray-400 hover:text-gray-200 border border-transparent'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{title}</p>
                  </div>
                </button>
              )
            })}
          </div>
          
          {sessions.length > 0 && (
            <div className="p-4 border-t border-white/5">
              <button
                onClick={clearHistory}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
            </div>
          )}
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Main Chat Area */}
        <div className="flex flex-col flex-1 w-full relative h-[calc(100vh-64px)]">
          <div className="section-container flex flex-col flex-1 py-4 max-w-4xl w-full mx-auto h-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-4 glass-card px-5 py-3 relative z-20 flex-shrink-0"
            >
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-xl bg-gradient-electric flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h1 className="font-display font-bold text-white text-sm">SBI Saathi AI</h1>
                  <div className="flex items-center gap-1">
                    <span className="glow-dot" />
                    <span className="text-xs text-green-400">Ready to help</span>
                  </div>
                </div>
              </div>
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-lg text-xs text-gray-300 hover:text-white transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  {selectedLang?.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-1 bg-navy-900 rounded-xl overflow-hidden z-50 min-w-[120px] shadow-2xl"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            i18n.changeLanguage(lang.code)
                            setShowLangMenu(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-white/5 transition-colors ${lang.code === language ? 'text-electric-400' : 'text-gray-300'}`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-0 relative px-1">
            {historyLoaded && messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center py-16"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-electric flex items-center justify-center mb-4">
                  <span className="text-4xl">🤖</span>
                </div>
                <h2 className="font-display font-bold text-xl text-white mb-2">SBI Saathi AI</h2>
                <p className="text-gray-400 text-sm mb-8 max-w-sm">
                  {t('chat.placeholder') || 'Your intelligent banking companion. Ask anything about banking, UPI, loans, or financial literacy.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                  {suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-left text-xs p-3 glass-card-hover rounded-xl text-gray-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-electric flex items-center justify-center flex-shrink-0 mt-1 relative">
                    <span className="text-lg">🤖</span>
                    {speakingMsgId === msg.id && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-electric-500"></span>
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex flex-col gap-1 max-w-[85%]">
                  <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    <p className="text-xs opacity-40 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {/* TTS Controls for AI responses */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-1 ml-1">
                      {speakingMsgId === msg.id ? (
                        <>
                          {isPaused ? (
                            <button onClick={resumeSpeaking} className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Resume">
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button onClick={pauseSpeaking} className="p-1.5 rounded-md hover:bg-white/10 text-electric-400 hover:text-electric-300 transition-colors" title="Pause">
                              <Pause className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button onClick={stopSpeaking} className="p-1.5 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors" title="Stop">
                            <Square className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex items-center gap-1 px-2 h-6 bg-white/5 rounded-full border border-white/10">
                            <Volume2 className="w-3 h-3 text-electric-400 animate-pulse" />
                            <span className="text-[10px] text-electric-400 font-medium">Speaking</span>
                          </div>
                        </>
                      ) : (
                        <button 
                          onClick={() => speakText(msg.content, msg.id)}
                          className="p-1.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
                          title="Listen"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Read Aloud</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-electric flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🤖</span>
                </div>
                <div className="chat-bubble-ai flex items-center gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 rounded-full bg-electric-400"
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 pt-2">
            {/* Listening Indicators */}
            <AnimatePresence>
              {isListening && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col items-center justify-center mb-3"
                >
                  <div className="flex items-center gap-1 h-8">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <motion.div
                        key={i}
                        animate={{ height: ['20%', '100%', '20%'] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-red-400 rounded-full"
                      />
                    ))}
                    <span className="text-xs text-red-400 ml-3 font-medium tracking-widest animate-pulse uppercase">Listening</span>
                  </div>
                  {interimTranscript && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-gray-400 italic mt-2 text-center max-w-2xl px-4"
                    >
                      "{interimTranscript}"
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-card p-3 transition-all duration-300 ${isListening ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-[rgba(30,144,255,0.15)]'}`}
            >
              <div className="flex items-end gap-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? "Listening to your voice..." : "Ask about banking, UPI, loans, fraud prevention..."}
                  className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm resize-none outline-none leading-relaxed"
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                  rows={1}
                />
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={toggleVoice}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isListening
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 animate-pulse'
                        : 'glass-card hover:border-electric-500/30 text-gray-400 hover:text-electric-400'
                    }`}
                    title="Toggle Microphone (Ctrl+Space)"
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #1E90FF, #00D4FF)' }}
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[10px] text-gray-600">Press Enter to send · Shift+Enter for new line</p>
                <p className="text-[10px] text-gray-600 hidden sm:block">Ctrl + Space to toggle microphone</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
