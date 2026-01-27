import { useState } from 'react'
import { BACKEND_URL } from '../../utils/authConfig'

const Login = () => {
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
      })
      const result = await response.json()

      if (result.status === 'success' && result.data?.redirect_to) {
        window.location.href = result.data.redirect_to
        return
      }
      alert('Failed to initiate login')
    } catch (error) {
      console.error('Login error:', error)
      alert('Connection error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-flow">
      <div className="auth-container">
        <h1 className="auth-title">Deep Sync</h1>
        <p className="auth-subtitle">Next-generation enterprise identity management.</p>
        <button
          type="button"
          className="btn-auth btn-auth-primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Redirecting...' : 'Login to Deep Sync'}
        </button>
      </div>
    </div>
  )
}

export default Login
