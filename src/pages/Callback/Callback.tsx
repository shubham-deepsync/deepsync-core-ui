import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { BACKEND_URL, setStoredToken } from '../../utils/authConfig'

const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('Connecting to server...')
  const hasRunRef = useRef(false)

  useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true

    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      setStatus('Invalid callback parameters.')
      setTimeout(() => navigate('/login', { replace: true }), 2000)
      return
    }

    const run = async () => {
      try {
        setStatus('Exchanging code for credentials...')
        const response = await fetch(
          `${BACKEND_URL}/api/v1/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
        )
        const result = await response.json()

        if (result.status === 'success' && result.data?.access_token) {
          setStoredToken(result.data.access_token)
          setStatus('Success! Redirecting...')
          setTimeout(() => navigate('/auth/select-organization', { replace: true }), 1000)
        } else {
          setStatus('Authentication failed: ' + (result.message || 'Unknown error'))
          setTimeout(() => navigate('/login', { replace: true }), 3000)
        }
      } catch (error) {
        console.error('Callback error:', error)
        setStatus('Connection error. Please try again.')
        setTimeout(() => navigate('/login', { replace: true }), 3000)
      }
    }

    run()
  }, [searchParams, navigate])

  return (
    <div className="auth-flow">
      <div className="auth-container">
        <h1 className="auth-title">Authenticating</h1>
        <p className="auth-subtitle">Securely exchanging tokens with the identity gateway...</p>
        <div className="auth-loading-spinner" />
        <p style={{ marginTop: '1rem', color: '#94a3b8' }}>{status}</p>
      </div>
    </div>
  )
}

export default Callback
