interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <div className="service-card">
      <div className="service-card-icon">{icon}</div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
    </div>
  )
}

export default ServiceCard
