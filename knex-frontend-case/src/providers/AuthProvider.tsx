'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useSyncExternalStore } from 'react'

// Module-level listener set — lets any component trigger a re-read of the cookie
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((fn) => fn())

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

const getSnapshot = () => !!Cookies.get('token')
const getServerSnapshot = () => false // safe SSR default — no hydration mismatch

interface AuthContextValue {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isAuthenticated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function setAuthenticated(value: boolean) {
    if (!value) Cookies.remove('token')
    notify()
  }

  function logout() {
    Cookies.remove('token')
    notify()
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
