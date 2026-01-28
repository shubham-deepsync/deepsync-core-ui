import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import { mockJobs, mockKpiCards } from '../../utils/constants'
import { Job } from '../../types'
import KpiCard from './components/KpiCard'
import SectionHeader from './components/SectionHeader'
import FilterPills, { type MatchTypeFilter } from './components/FilterPills'
import MatchHistoryTable from './components/MatchHistoryTable'

const Overview = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [matchTypeFilters, setMatchTypeFilters] = useState<MatchTypeFilter[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.processedDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.matchType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType =
      matchTypeFilters.length === 0 || matchTypeFilters.includes(job.matchType)
    return matchesSearch && matchesType
  })

  const handleJobSelect = (job: Job) => setSelectedJob(job)
  const handleJobDoubleClick = (jobId: number) => {
    navigate(`/test-match-service/intelligence?jobId=${jobId}`)
  }

  const toggleMatchType = (type: MatchTypeFilter) => {
    setMatchTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }
  const clearFilters = () => setMatchTypeFilters([])

  const headerActions = (
    <div className="header-actions">
      <button className="nav-icon-btn" type="button" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2C8.9 2 8 2.9 8 4V5.5C6.2 6.1 5 7.7 5 9.5V13L3 15V16H17V15L15 13V9.5C15 7.7 13.8 6.1 12 5.5V4C12 2.9 11.1 2 10 2Z" fill="currentColor" />
        </svg>
      </button>
      <button className="nav-icon-btn" type="button" aria-label="Bookmark">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 2H15V18L10 15L5 18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="nav-icon-btn" type="button" aria-label="Help">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M10 7V10M10 13H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )

  const clockIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )

  const startNewAnalysisAction = (
    <Link to="/test-match-service/run" className="btn-primary btn-start-analysis">
      <span>Start New Analysis</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M6 4L12 8L6 12V4Z" fill="currentColor" />
      </svg>
    </Link>
  )

  return (
    <div className="overview">
      <Header
        title="Overview"
        subtitle="Track your match analysis jobs and performance metrics."
        actions={headerActions}
      />

      <section className="kpi-cards" aria-label="Key metrics">
        {mockKpiCards.map((card) => (
          <KpiCard key={card.label} card={card} />
        ))}
      </section>

      <section className="match-history-section content-section" aria-labelledby="match-history-title">
        <SectionHeader
          titleId="match-history-title"
          title="My Match History"
          count={filteredJobs.length}
          countLabel="jobs"
          action={startNewAnalysisAction}
          icon={clockIcon}
        />

        <div className="search-box match-history-search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M15 15L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search by file name, date, or match type..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search match history"
          />
        </div>

        <FilterPills
          selected={matchTypeFilters}
          onToggle={toggleMatchType}
          onClear={clearFilters}
        />

        <MatchHistoryTable
          jobs={filteredJobs}
          selectedJob={selectedJob}
          onSelect={handleJobSelect}
          onDoubleClick={handleJobDoubleClick}
        />
      </section>
    </div>
  )
}

export default Overview
