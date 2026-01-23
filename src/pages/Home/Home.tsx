import PromotionalBanner from './components/PromotionalBanner'
import ServiceCard from './components/ServiceCard'
import OrchestratorServices from './components/OrchestratorServices'

const Home = () => {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const serviceCards = [
    {
      title: 'Studio',
      description: 'Build processes, workflows, and agents in a no-code canvas.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M4 12H28M12 4V28" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
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
      title: 'Maestro',
      description: 'Orchestrate automated processes across systems.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L20 12L28 14L20 16L16 24L12 16L4 14L12 12L16 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="16" cy="16" r="2" fill="currentColor"/>
        </svg>
      ),
    },
    {
      title: 'Orchestrator',
      description: 'Centrally manage and monitor robots and automation resources.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="16" cy="16" r="4" fill="currentColor"/>
          <path d="M16 6V10M16 22V26M26 16H22M10 16H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="home-page">
      <div className="home-greeting">
        <h1>{getGreeting()}, Shubham Mondal</h1>
      </div>

      <PromotionalBanner />

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
