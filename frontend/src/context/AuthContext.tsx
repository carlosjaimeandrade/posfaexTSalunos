import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { getToken as getStoredToken, setToken as setStoredToken, logout as clearStoredToken } from '../lib/auth'

const ADMIN_EMAIL = 'jaime_andrek@hotmail.com'

type User = { id: number; name: string; email: string }

type AuthContextType = {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (token: string, userPayload?: User | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getStoredToken())
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function load() {
      if (!token) {
        setUser(null)
        return
      }
      try {
        const me = await api<{ user: User }>('/me')
        setUser(me.user)
      } catch {
        // token inválido
        setUser(null)
      }
    }
    load()
  }, [token])

  const value = useMemo<AuthContextType>(() => ({
    token,
    user,
    isAuthenticated: !!token,
    isAdmin: user?.email === ADMIN_EMAIL,
    login: (tk: string, userPayload?: User | null) => {
      setStoredToken(tk)
      setToken(tk)
      if (userPayload) {
        setUser(userPayload)
      }
    },
    logout: () => {
      clearStoredToken()
      setUser(null)
      setToken(null)
    }
  }), [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
