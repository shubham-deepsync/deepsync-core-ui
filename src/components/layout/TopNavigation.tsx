import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

interface TopNavigationProps {
  onMenuClick: () => void
}

function getInitials(userName: string): string {
  const parts = userName.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase().slice(0, 2)
  }
  return userName.slice(0, 2).toUpperCase() || '?'
}

const TopNavigation = ({ onMenuClick }: TopNavigationProps) => {
  const { authUser } = useAuth()
  const [logoError, setLogoError] = useState(false)
  const logoSrc = '/logo.svg'
  const userInitials = authUser?.userName ? getInitials(authUser.userName) : '?'

  useEffect(() => {
    // Check if logo exists by trying to load it
    const img = new Image()
    img.onerror = () => setLogoError(true)
    img.onload = () => setLogoError(false)
    img.src = logoSrc
  }, [logoSrc])

  return (
    <nav className="top-navigation">
      <div className="top-nav-left">
        <button className="menu-toggle-btn" onClick={onMenuClick} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor"/>
          </svg>
        </button>
        <div className="logo-container">
          {!logoError && (
            <img 
              src={logoSrc} 
              alt="Deep Sync Cloud Platform" 
              className="logo-image"
              onError={() => setLogoError(true)}
            />
          )}
          {logoError && (
            <span className="logo-text">Deep Sync Cloud Platform</span>
          )}
        </div>
      </div>
      <div className="top-nav-right">
        <button className="nav-icon-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M15 15L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="nav-icon-btn notification-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C8.9 2 8 2.9 8 4V5.5C6.2 6.1 5 7.7 5 9.5V13L3 15V16H17V15L15 13V9.5C15 7.7 13.8 6.1 12 5.5V4C12 2.9 11.1 2 10 2Z" fill="currentColor"/>
          </svg>
          <span className="notification-badge">1</span>
        </button>
        <button className="nav-icon-btn" aria-label="Help">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M10 7V10M10 13H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="user-avatar-btn" aria-label="User menu">
          <span className="user-initials">{userInitials}</span>
        </button>
      </div>
    </nav>
  )
}

export default TopNavigation
