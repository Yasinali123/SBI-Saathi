import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
  updateProfile: (updatedData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem('sbi_token')
    localStorage.removeItem('sbi_user')
    localStorage.removeItem('isLoggedIn')
    setUser(null)
    setToken(null)
  }, [])

  const refreshUser = useCallback(async () => {
    const storedUser = localStorage.getItem('sbi_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      logout()
    }
  }, [logout])

  const updateProfile = useCallback((updatedData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem('sbi_user', JSON.stringify(newUser));
      return newUser;
    });
  }, []);

  // Initialize auth from storage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('sbi_token')
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      
      if (storedToken && isLoggedIn) {
        setToken(storedToken)
        await refreshUser()
      } else {
        logout()
      }
      setIsLoading(false)
    }
    initAuth()
  }, []) // eslint-disable-line

  const login = async (email: string, password: string) => {
    // Mock successful login
    const mockToken = "mock_token_" + Math.random().toString(36).substring(7)
    const mockUser: User = {
      id: "u" + Math.random().toString(36).substring(7),
      name: email.split('@')[0],
      email: email,
      role: "user"
    }
    
    localStorage.setItem('sbi_token', mockToken)
    localStorage.setItem('sbi_user', JSON.stringify(mockUser))
    localStorage.setItem('isLoggedIn', 'true')
    
    setToken(mockToken)
    setUser(mockUser)
  }

  const signup = async (name: string, email: string, password: string, phone?: string) => {
    // Mock successful signup
    const mockToken = "mock_token_" + Math.random().toString(36).substring(7)
    const mockUser: User = {
      id: "u" + Math.random().toString(36).substring(7),
      name: name,
      email: email,
      phone: phone,
      role: "user"
    }
    
    localStorage.setItem('sbi_token', mockToken)
    localStorage.setItem('sbi_user', JSON.stringify(mockUser))
    localStorage.setItem('isLoggedIn', 'true')
    
    setToken(mockToken)
    setUser(mockUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        signup,
        logout,
        refreshUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
