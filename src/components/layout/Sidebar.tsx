import { Link, useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleGoToPlatform = () => {
    navigate('/')
  }

  const navItems = [
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
      path: '/test-match-service/intelligence',
      label: 'Intelligence',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
    },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">Deep Sync</h1>
      </div>
      <button className="platform-btn" onClick={handleGoToPlatform}>
        <span>Go to Platform</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 2L14 6L10 10M14 6H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Workflows</h3>
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
        </div>
      </nav>
      <div className="sidebar-footer">
        <button className="cookie-btn">
          Manage cookies or opt out
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
