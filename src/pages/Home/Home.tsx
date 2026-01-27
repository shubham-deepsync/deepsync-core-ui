import { useAuth } from '../../contexts/AuthContext'
import ServiceCard from './components/ServiceCard'
import OrchestratorServices from './components/OrchestratorServices'

const Home = () => {
  const { authUser } = useAuth()
  const displayName = authUser?.userName ?? 'User'
  const orgName = authUser?.orgName

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const serviceCards = [
    {
      title: 'Agents',
      description: 'Manage the full lifecycle of intelligent agents — from creation and deployment to ongoing monitoring, optimization, and maintenance.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 26C8 21 11.5 17 16 17C20.5 17 24 21 24 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <rect x="20" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.3"/>
        </svg>
      ),
    },
    {
      title: 'Core Platform',
      description: 'Centrally manage and monitor robots and automation resources.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="16" cy="16" r="4" fill="currentColor"/>
          <path d="M16 6V10M16 22V26M26 16H22M10 16H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      title: 'Test Match Service',
      description: 'Run match reports, view job history, and analyze match intelligence.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="18" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="4" y="18" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="18" y="18" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="home-page">
      <div className="home-greeting">
        <h1>{getGreeting()}, {displayName}{orgName ? ` from ${orgName}` : ''}</h1>
      </div>

      <div className="service-cards-grid">
        {serviceCards.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>

      <OrchestratorServices />
    </div>
  )
}

export default Home
