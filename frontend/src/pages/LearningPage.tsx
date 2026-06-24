import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import {
  BookOpen, CheckCircle, Award, Flame, ChevronRight,
  ChevronDown, Lock, Star, Trophy, Clock, Zap
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  duration: number
}

interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration_minutes: number
  icon: string
  badge: string
  lessons: Lesson[]
}

const difficultyConfig = {
  beginner: { color: 'text-green-400', bg: 'bg-green-500/10', label: 'Beginner' },
  intermediate: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Intermediate' },
  advanced: { color: 'text-orange-400', bg: 'bg-orange-500/10', label: 'Advanced' },
}

export default function LearningPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [badges, setBadges] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCourse, setActiveCourse] = useState<string | null>(null)

  const loadData = async () => {
    try {
      const res = await fetch('/data/learning.json')
      const data = await res.json()
      setCourses(data.courses)
      
      const savedLessons = JSON.parse(localStorage.getItem('completed_lessons') || '[]')
      const savedBadges = JSON.parse(localStorage.getItem('earned_badges') || '[]')
      setCompletedLessons(savedLessons)
      setBadges(savedBadges)
    } catch (err) {
      toast.error('Failed to load courses')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const toggleLesson = (course: Course, lessonId: string, currentlyCompleted: boolean) => {
    let newCompleted: string[] = []
    if (currentlyCompleted) {
      newCompleted = completedLessons.filter(id => id !== lessonId)
    } else {
      newCompleted = [...completedLessons, lessonId]
    }
    
    setCompletedLessons(newCompleted)
    localStorage.setItem('completed_lessons', JSON.stringify(newCompleted))
    
    // Check for course completion
    if (!currentlyCompleted) {
      const courseLessonIds = course.lessons.map(l => l.id)
      const isCourseComplete = courseLessonIds.every(id => newCompleted.includes(id))
      if (isCourseComplete && !badges.includes(course.badge)) {
        const newBadges = [...badges, course.badge]
        setBadges(newBadges)
        localStorage.setItem('earned_badges', JSON.stringify(newBadges))
        toast.success(`🏆 Badge earned: ${course.badge}!`, { duration: 5000 })
      } else {
        toast.success(`Progress updated!`)
      }
    }
  }

  const getCourseProgress = (course: Course) => {
    const total = course.lessons.length
    const completed = course.lessons.filter(l => completedLessons.includes(l.id)).length
    return Math.round((completed / total) * 100) || 0
  }

  const totalCompleted = courses.filter(c => getCourseProgress(c) >= 100).length
  const streakCount = localStorage.getItem('isLoggedIn') ? 1 : 0
  const badgesCount = badges.length

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="section-container py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-2xl text-white">Learning Hub</h1>
                  <p className="text-gray-400 text-sm">Master digital banking with AI-guided courses</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: '📚', label: 'Courses Available', value: courses.length, color: 'text-blue-400' },
                { icon: '✅', label: 'Completed', value: totalCompleted, color: 'text-green-400' },
                { icon: '🔥', label: 'Day Streak', value: streakCount, color: 'text-orange-400' },
                { icon: '🏆', label: 'Badges Earned', value: badgesCount, color: 'text-yellow-400' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="stat-card text-center"
                >
                  <span className="text-2xl mb-1 block">{s.icon}</span>
                  <p className={`font-display font-bold text-xl ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Badges Section */}
          {badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 mb-6"
            >
              <h2 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Your Badges
              </h2>
              <div className="flex flex-wrap gap-3">
                {badges.map((badge: string, i: number) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(234,179,8,0.05))',
                      border: '1px solid rgba(234,179,8,0.3)',
                    }}
                  >
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-300">{badge}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Courses Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="w-12 h-12 bg-navy-700 rounded-xl mb-4" />
                  <div className="h-5 bg-navy-700 rounded mb-2" />
                  <div className="h-4 bg-navy-700 rounded w-3/4 mb-4" />
                  <div className="h-2 bg-navy-700 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => {
                const diff = difficultyConfig[course.difficulty]
                const progressPct = getCourseProgress(course)
                const isOpen = activeCourse === course.id
                const isComplete = progressPct >= 100
                const hasBadge = badges.includes(course.badge)

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`glass-card overflow-hidden transition-all duration-300 ${
                      isComplete ? 'border-green-500/20' : ''
                    }`}
                    style={{ border: isComplete ? '1px solid rgba(34,197,94,0.2)' : undefined }}
                  >
                    {/* Course Header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{course.icon}</span>
                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-white text-sm leading-tight">
                              {course.title}
                            </h3>
                            <span className={`text-xs ${diff.color}`}>{diff.label}</span>
                          </div>
                        </div>
                        {isComplete && (
                          <div className="flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed mb-4">{course.description}</p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration_minutes} min
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {course.lessons.length} lessons
                        </span>
                        {hasBadge && (
                          <span className="flex items-center gap-1 text-yellow-400">
                            <Award className="w-3 h-3" />
                            {course.badge}
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className={`font-medium ${isComplete ? 'text-green-400' : 'text-electric-400'}`}>
                            {progressPct}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`h-full rounded-full ${isComplete ? 'bg-green-400' : 'bg-gradient-electric'}`}
                          />
                        </div>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => setActiveCourse(isOpen ? null : course.id)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isComplete
                            ? 'bg-green-500/10 text-green-400 hover:bg-green-500/15'
                            : 'bg-electric-500/10 text-electric-400 hover:bg-electric-500/15'
                        }`}
                      >
                        <span>{isComplete ? 'Review Lessons' : isOpen ? 'Close' : 'Start Learning'}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Lessons List */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-white/5 overflow-hidden"
                        >
                          <div className="p-4 space-y-2">
                            {course.lessons.map((lesson, li) => {
                              const completed = completedLessons.includes(lesson.id)

                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => toggleLesson(course, lesson.id, completed)}
                                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                                    completed
                                      ? 'bg-green-500/10 border border-green-500/20'
                                      : 'hover:bg-white/5 border border-transparent'
                                  }`}
                                >
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                                    completed
                                      ? 'bg-green-500 text-white'
                                      : 'bg-navy-700 text-gray-500'
                                  }`}>
                                    {completed ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      li + 1
                                    )}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className={`text-xs font-medium ${completed ? 'text-green-300' : 'text-gray-300'}`}>
                                      {lesson.title}
                                    </p>
                                    <p className="text-xs text-gray-600">{lesson.duration} min</p>
                                  </div>
                                  {completed && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />}
                                </button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
