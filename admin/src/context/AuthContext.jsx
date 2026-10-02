import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/auth.js'

const AuthContext = createContext(null)

const TOKEN_KEY = 'adminToken'
const USER_KEY = 'adminUser'

const readStoredUser = () => {
  try {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(readStoredUser)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)))

  const persistSession = useCallback((nextToken, nextAdmin) => {
    localStorage.setItem(TOKEN_KEY, nextToken)
    localStorage.setItem(USER_KEY, JSON.stringify(nextAdmin))
    setToken(nextToken)
    setAdmin(nextAdmin)
  }, [])

  const clearSession = useCallback(() => {
    authService.logout()
    setToken(null)
    setAdmin(null)
  }, [])

  const signIn = useCallback(
    async ({ email, password }) => {
      const result = await authService.login({ email, password })
      const nextAdmin = result.admin
      const nextToken = result.token
      persistSession(nextToken, nextAdmin)
      return result
    },
    [persistSession],
  )

  const signOut = useCallback(() => {
    clearSession()
  }, [clearSession])

  // after the admin edits their own profile (Settings), so the header updates too
  const updateAdmin = useCallback((nextAdmin) => {
    localStorage.setItem(USER_KEY, JSON.stringify(nextAdmin))
    setAdmin(nextAdmin)
  }, [])

  // Validate the stored token once on load
  useEffect(() => {
    if (!token) {
      setLoading(false)
      return undefined
    }

    let active = true

    authService
      .getMe()
      .then((result) => {
        if (!active) return
        const nextAdmin = result.admin
        localStorage.setItem(USER_KEY, JSON.stringify(nextAdmin))
        setAdmin(nextAdmin)
      })
      .catch(() => {
        if (active) clearSession()
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [token, clearSession])

  const value = useMemo(
    () => ({
      admin,
      token,
      loading,
      isAuthenticated: Boolean(token),
      signIn,
      signOut,
      updateAdmin,
    }),
    [admin, token, loading, signIn, signOut, updateAdmin],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext