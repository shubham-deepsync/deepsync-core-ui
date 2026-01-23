import { Link, useLocation } from 'react-router-dom'

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
}

const SidePanel = ({ isOpen, onClose }: SidePanelProps) => {
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H8V12H12V19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V7L10 2Z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      path: '/test-match-service',
      label: 'Test Match Service',
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
      path: '/core-platforms',
      label: 'Core Platforms',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M3 8H17M8 3V17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {isOpen && <div className="side-panel-overlay" onClick={onClose} />}
      <aside className={`side-panel ${isOpen ? 'open' : ''}`}>
        <div className="side-panel-content">
          <nav className="side-panel-nav">
            {navItems.map((item) => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`side-panel-nav-item ${active ? 'active' : ''}`}
                  onClick={onClose}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default SidePanel
