'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  const isAuthenticated = () => !!Cookies.get('token')

  const logout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  return { isAuthenticated, logout }
}
