import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  BACKEND_URL,
  getStoredToken,
  setStoredToken,
  clearStoredToken,
} from '../../utils/authConfig'

interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
}

interface Organization {
  id?: string
  organization_id?: string
  name?: string
  organization_name?: string
}

const SelectOrganization = () => {
  const navigate = useNavigate()
  const { setAuthUser, clearAuthUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loadingOrgs, setLoadingOrgs] = useState(true)
  const [selectingId, setSelectingId] = useState<string | null>(null)
  const loadStartedRef = useRef(false)
  const navigatingAwayRef = useRef(false)

  useEffect(() => {
    if (loadStartedRef.current) return
    loadStartedRef.current = true

    const token = getStoredToken()
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    const load = async () => {
      try {
        const meRes = await fetch(`${BACKEND_URL}/api/v1/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!meRes.ok) {
          if (meRes.status === 401) {
            if (navigatingAwayRef.current) return
            clearStoredToken()
            clearAuthUser()
            navigate('/login', { replace: true })
            return
          }
          throw new Error('Failed to fetch profile')
        }
        const meResult = await meRes.json()
        const u = meResult.data
        setUser(u)

        const orgRes = await fetch(`${BACKEND_URL}/api/v1/users/me/organizations`, {
          headers: { 'X-User-Id': u.id },
        })
        if (!orgRes.ok) {
          setOrganizations([])
          setLoadingOrgs(false)
          return
        }
        const orgResult = await orgRes.json()
        const orgs = orgResult.data ?? orgResult.organizations ?? []
        setOrganizations(Array.isArray(orgs) ? orgs : [])
      } catch (err) {
        console.error(err)
        setOrganizations([])
      } finally {
        setLoadingOrgs(false)
      }
    }

    load()
  }, [navigate])

  const handleSelectOrg = async (orgId: string, orgName: string) => {
    if (!user) return
    setSelectingId(orgId)
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/org_scoped_token`, {
        method: 'POST',
        headers: {
          'X-User-Id': user.id,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ organization_id: orgId }),
      })
      const result = await response.json()

      if (result.status === 'success' && result.data?.access_token) {
        setStoredToken(result.data.access_token)
        setAuthUser({
          userId: user.id,
          userName: [user.first_name, user.last_name].filter(Boolean).join(' ').trim() || user.email,
          userEmail: user.email,
          orgId,
          orgName,
        })
        navigatingAwayRef.current = true
        navigate('/', { replace: true })
      } else if (response.ok) {
        setAuthUser({
          userId: user.id,
          userName: [user.first_name, user.last_name].filter(Boolean).join(' ').trim() || user.email,
          userEmail: user.email,
          orgId,
          orgName,
        })
        navigatingAwayRef.current = true
        navigate('/', { replace: true })
      } else {
        alert(result.message || 'Failed to get organization token.')
      }
    } catch (error) {
      console.error('Org scoped token error:', error)
      alert('Connection error. Please try again.')
    } finally {
      setSelectingId(null)
    }
  }

  if (!user) {
    return (
      <div className="auth-flow">
        <div className="auth-container">
          <div className="auth-loading-spinner" />
          <p style={{ marginTop: '1rem', color: '#94a3b8' }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-flow">
      <div className="auth-container">
        <h1 className="auth-title">Select Organization</h1>
        <p className="auth-subtitle">Choose an organization to continue.</p>

        <div className="auth-profile-card">
          <div className="auth-profile-row">
            <span className="auth-profile-label">Name</span>
            <span className="auth-profile-value">
              {[user.first_name, user.last_name].filter(Boolean).join(' ') || '—'}
            </span>
          </div>
          <div className="auth-profile-row">
            <span className="auth-profile-label">Email</span>
            <span className="auth-profile-value">{user.email}</span>
          </div>
          <div className="auth-profile-row">
            <span className="auth-profile-label">User ID</span>
            <span className="auth-profile-value">{user.id}</span>
          </div>
        </div>

        <div className="auth-organizations-section">
          <h2 className="auth-organizations-heading">Organizations</h2>
          {loadingOrgs ? (
            <p style={{ color: '#94a3b8' }}>Loading organizations...</p>
          ) : organizations.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>No organizations found.</p>
          ) : (
            <ul className="auth-organizations-list">
              {organizations.map((org) => {
                const id = org.organization_id ?? org.id ?? ''
                const name = org.name ?? org.organization_name ?? id
                const busy = selectingId === id
                return (
                  <li
                    key={id}
                    className="auth-org-item"
                    onClick={() => !busy && handleSelectOrg(id, String(name))}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !busy) handleSelectOrg(id, String(name))
                    }}
                    aria-disabled={busy}
                  >
                    <span className="auth-org-name">{String(name)}</span>
                    <span className="auth-org-id">{String(id)}</span>
                    {busy && <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>…</span>}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectOrganization
