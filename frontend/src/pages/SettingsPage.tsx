import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { 
  Settings, Globe, Check, ArrowLeft, User, Volume2, 
  Bell, Shield, Cpu, HelpCircle, Save
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const languages = [
  { code: 'en', labelKey: 'settings.english' },
  { code: 'hi', labelKey: 'settings.hindi' },
  { code: 'bn', labelKey: 'settings.bengali' },
  { code: 'ta', labelKey: 'settings.tamil' },
  { code: 'te', labelKey: 'settings.telugu' },
  { code: 'mr', labelKey: 'settings.marathi' },
  { code: 'gu', labelKey: 'settings.gujarati' },
  { code: 'kn', labelKey: 'settings.kannada' },
  { code: 'ml', labelKey: 'settings.malayalam' },
  { code: 'pa', labelKey: 'settings.punjabi' }
]

const TABS = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'language', icon: Globe, label: 'Language' },
  { id: 'voice', icon: Volume2, label: 'Voice Settings' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'privacy', icon: Shield, label: 'Privacy & Security' },
  { id: 'ai', icon: Cpu, label: 'AI Preferences' },
  { id: 'help', icon: HelpCircle, label: 'Help & Support' }
]

export default function SettingsPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  
  const [activeTab, setActiveTab] = useState('profile')
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en')
  
  // Profile State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })

  // Settings State initialized from localStorage
  const [settings, setSettings] = useState({
    voiceEnabled: localStorage.getItem('sbi_voice_enabled') !== 'false',
    speechRate: localStorage.getItem('sbi_speech_rate') || '1',
    voiceGender: localStorage.getItem('sbi_voice_gender') || 'female',
    emailNotif: localStorage.getItem('sbi_notif_email') !== 'false',
    pushNotif: localStorage.getItem('sbi_notif_push') !== 'false',
    smsNotif: localStorage.getItem('sbi_notif_sms') === 'true',
    aiAlerts: localStorage.getItem('sbi_notif_ai') !== 'false',
    twoFactor: localStorage.getItem('sbi_2fa') === 'true',
    aiPersonality: localStorage.getItem('sbi_ai_personality') || 'friendly',
    agentProactiveness: localStorage.getItem('sbi_agent_proactiveness') || 'high'
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone || ''
      })
    }
  }, [user])

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setCurrentLang(langCode)
    localStorage.setItem('language', langCode)
    toast.success('Language updated successfully')
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(profileData)
    toast.success('Profile updated successfully')
  }

  const toggleSetting = (key: keyof typeof settings) => {
    const newValue = !settings[key]
    setSettings(prev => ({ ...prev, [key]: newValue }))
    
    // Map state keys to localStorage keys
    const storageKeys: Record<string, string> = {
      voiceEnabled: 'sbi_voice_enabled',
      emailNotif: 'sbi_notif_email',
      pushNotif: 'sbi_notif_push',
      smsNotif: 'sbi_notif_sms',
      aiAlerts: 'sbi_notif_ai',
      twoFactor: 'sbi_2fa'
    }
    
    if (storageKeys[key as string]) {
      localStorage.setItem(storageKeys[key as string], newValue.toString())
    }
    toast.success('Setting updated')
  }

  const handleSelectChange = (key: keyof typeof settings, value: string, storageKey: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    localStorage.setItem(storageKey, value)
    toast.success('Preference saved')
  }

  // --- Tab Renderers ---
  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Profile Information</h2>
        <p className="text-gray-400 text-sm">Update your personal details and contact information.</p>
      </div>
      <form onSubmit={handleProfileSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
          <input 
            type="text" 
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
          <input 
            type="email" 
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
          <input 
            type="tel" 
            value={profileData.phone}
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
            placeholder="+91 "
          />
        </div>
        <div className="pt-4">
          <button type="submit" className="flex items-center gap-2 bg-electric-600 hover:bg-electric-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )

  const renderLanguage = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">{t('settings.language') || 'Language'}</h2>
        <p className="text-gray-400 text-sm">{t('settings.languageDescription') || 'Choose your preferred language for the interface.'}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
              currentLang === lang.code
                ? 'bg-electric-500/20 border-electric-500/50 text-white'
                : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <span className="font-medium">{t(lang.labelKey) || lang.labelKey}</span>
            {currentLang === lang.code && <Check className="w-5 h-5 text-electric-400" />}
          </button>
        ))}
      </div>
    </div>
  )

  const renderVoiceSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Voice Settings</h2>
        <p className="text-gray-400 text-sm">Configure how the AI voice assistant interacts with you.</p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
          <div>
            <h3 className="text-white font-medium">Enable Voice Assistant</h3>
            <p className="text-sm text-gray-400">Allow AI to speak responses aloud</p>
          </div>
          <button 
            onClick={() => toggleSetting('voiceEnabled')}
            className={`w-12 h-6 rounded-full transition-colors relative ${settings.voiceEnabled ? 'bg-electric-500' : 'bg-gray-600'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.voiceEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Speech Rate (Speed)</label>
          <select 
            value={settings.speechRate}
            onChange={(e) => handleSelectChange('speechRate', e.target.value, 'sbi_speech_rate')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-500"
          >
            <option value="0.75" className="bg-navy-900">Slow</option>
            <option value="1" className="bg-navy-900">Normal</option>
            <option value="1.25" className="bg-navy-900">Fast</option>
            <option value="1.5" className="bg-navy-900">Very Fast</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Voice Gender Preference</label>
          <select 
            value={settings.voiceGender}
            onChange={(e) => handleSelectChange('voiceGender', e.target.value, 'sbi_voice_gender')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-500"
          >
            <option value="female" className="bg-navy-900">Female (Default)</option>
            <option value="male" className="bg-navy-900">Male</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Notifications</h2>
        <p className="text-gray-400 text-sm">Choose how you want to be alerted about account activity.</p>
      </div>
      <div className="space-y-4">
        {[
          { key: 'emailNotif', title: 'Email Notifications', desc: 'Receive daily summaries and alerts via email' },
          { key: 'pushNotif', title: 'Push Notifications', desc: 'Real-time alerts on your device' },
          { key: 'smsNotif', title: 'SMS Alerts', desc: 'Text messages for critical security events' },
          { key: 'aiAlerts', title: 'AI Proactive Alerts', desc: 'Let the Agentic AI notify you of saving opportunities' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <h3 className="text-white font-medium">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
            <button 
              onClick={() => toggleSetting(item.key as keyof typeof settings)}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings[item.key as keyof typeof settings] ? 'bg-electric-500' : 'bg-gray-600'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Privacy & Security</h2>
        <p className="text-gray-400 text-sm">Manage your security settings and data privacy.</p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
          <div>
            <h3 className="text-white font-medium">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-gray-400">Require an extra step during login</p>
          </div>
          <button 
            onClick={() => toggleSetting('twoFactor')}
            className={`w-12 h-6 rounded-full transition-colors relative ${settings.twoFactor ? 'bg-green-500' : 'bg-gray-600'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.twoFactor ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
          <h3 className="text-white font-medium">Change Password</h3>
          <div className="space-y-3">
            <input type="password" placeholder="Current Password" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none" />
            <input type="password" placeholder="New Password" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none" />
            <button 
              onClick={() => toast.success('Password updated successfully')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAIPreferences = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">AI Preferences</h2>
        <p className="text-gray-400 text-sm">Customize how the AI Agent behaves and assists you.</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Assistant Personality</label>
          <select 
            value={settings.aiPersonality}
            onChange={(e) => handleSelectChange('aiPersonality', e.target.value, 'sbi_ai_personality')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-500"
          >
            <option value="professional" className="bg-navy-900">Professional & Formal</option>
            <option value="friendly" className="bg-navy-900">Friendly & Casual (Default)</option>
            <option value="concise" className="bg-navy-900">Direct & Concise</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Agent Proactiveness</label>
          <select 
            value={settings.agentProactiveness}
            onChange={(e) => handleSelectChange('agentProactiveness', e.target.value, 'sbi_agent_proactiveness')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-500"
          >
            <option value="high" className="bg-navy-900">High - Frequent suggestions and tips</option>
            <option value="medium" className="bg-navy-900">Medium - Only important alerts</option>
            <option value="low" className="bg-navy-900">Low - Only respond when asked</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderHelp = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Help & Support</h2>
        <p className="text-gray-400 text-sm">Get assistance and find answers to common questions.</p>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
          <h3 className="text-white font-medium mb-1">Frequently Asked Questions</h3>
          <p className="text-sm text-gray-400">Browse answers to common queries about using SBI Saathi.</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
          <h3 className="text-white font-medium mb-1">Contact Customer Support</h3>
          <p className="text-sm text-gray-400">Reach out to our 24/7 support team via chat or email.</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
          <h3 className="text-white font-medium mb-1">Report an Issue</h3>
          <p className="text-sm text-gray-400">Found a bug or having trouble? Let us know.</p>
        </div>
      </div>
    </div>
  )

  const tabContent = {
    profile: renderProfile,
    language: renderLanguage,
    voice: renderVoiceSettings,
    notifications: renderNotifications,
    privacy: renderPrivacy,
    ai: renderAIPreferences,
    help: renderHelp
  }

  return (
    <div className="pt-24 pb-12 section-container min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-electric-500/20 flex items-center justify-center border border-electric-500/30">
            <Settings className="w-6 h-6 text-electric-400" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">
            {t('settings.title') || 'Settings'}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-electric-500 text-white shadow-electric' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="glass-card rounded-2xl p-6 md:p-8"
              >
                {tabContent[activeTab as keyof typeof tabContent]()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </div>
  )
}
