import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'

const AUTH_USER_STORAGE_KEY = 'auth_user'

export interface AuthUser {
  userId: string
  userName: string
  userEmail: string
  orgId: string
  orgName: string
}

interface AuthContextValue {
  authUser: AuthUser | null
  setAuthUser: (user: AuthUser) => void
  clearAuthUser: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    if (
      typeof parsed.userId === 'string' &&
      typeof parsed.userName === 'string' &&
      typeof parsed.userEmail === 'string' &&
      typeof parsed.orgId === 'string' &&
      typeof parsed.orgName === 'string'
    ) {
      return parsed
    }
  } catch {
    // ignore
  }
  return null
}

function writeStoredAuthUser(user: AuthUser): void {
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user))
}

function clearStoredAuthUser(): void {
  localStorage.removeItem(AUTH_USER_STORAGE_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUserState] = useState<AuthUser | null>(() =>
    readStoredAuthUser()
  )

  const setAuthUser = useCallback((user: AuthUser) => {
    setAuthUserState(user)
    writeStoredAuthUser(user)
  }, [])

  const clearAuthUser = useCallback(() => {
    setAuthUserState(null)
    clearStoredAuthUser()
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, clearAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
