import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { authUser } = useAuth()

  const handleGoToPlatform = () => {
    navigate('/')
  }

  const navItems = [
    {
      path: '/test-match-service/connections',
      label: 'Connections',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M3 8H17M8 3V17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      path: '/test-match-service',
      label: 'Overview',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor"/>
          <rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor"/>
          <rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor"/>
          <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor"/>
        </svg>
      ),
    },
    {
      path: '/test-match-service/run',
      label: 'Run',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 4L14 10L6 16V4Z" fill="currentColor"/>
        </svg>
      ),
    },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo-title">Deep Sync Lab</h1>
        <p className="sidebar-logo-tagline">Sync Builder Alpha</p>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => {
            const isActive = item.path === '/test-match-service'
              ? location.pathname === '/test-match-service' || location.pathname === '/test-match-service/'
              : location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <button className="platform-btn platform-btn--outline" onClick={handleGoToPlatform}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 2L2 6L6 10M2 6H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Back to Platform</span>
      </button>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <span className="sidebar-user-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M4 18C4 14.686 6.686 12 10 12s6 2.686 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="sidebar-user-name">{authUser?.userName ?? 'User'}</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
