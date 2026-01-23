import { useState, useEffect } from 'react'

const PromotionalBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('promotionalBannerDismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem('promotionalBannerDismissed', 'true')
  }

  if (isDismissed) {
    return null
  }

  return (
    <div className="promotional-banner">
      <button className="banner-close-btn" onClick={handleDismiss} aria-label="Close banner">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="banner-content">
        <div className="banner-text">
          <h2 className="banner-title">Level up with DeepSync</h2>
          <p className="banner-description">
            Advance your agentic automation journey with free certifications and expert training. 
            Earn recognized credentials and open new doors in your AI career.
          </p>
          <button className="banner-cta-btn">
            Join the program
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="banner-illustration">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="50" fill="#3b82f6" opacity="0.1"/>
            <circle cx="60" cy="40" r="25" fill="#3b82f6"/>
            <rect x="50" y="65" width="20" height="30" rx="10" fill="#ef4444"/>
            <rect x="45" y="70" width="10" height="20" rx="5" fill="#ef4444"/>
            <rect x="65" y="70" width="10" height="20" rx="5" fill="#ef4444"/>
            <path d="M60 20L65 30L75 25L70 35L80 40L70 45L75 55L65 50L60 60L55 50L45 55L50 45L40 40L50 35L45 25L55 30L60 20Z" fill="#fbbf24"/>
          </svg>
        </div>
      </div>
      <div className="banner-pagination">
        <span className="pagination-dot active"></span>
        <span className="pagination-dot"></span>
        <span className="pagination-dot"></span>
      </div>
    </div>
  )
}

export default PromotionalBanner
