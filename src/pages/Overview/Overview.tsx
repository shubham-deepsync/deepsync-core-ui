import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import { mockJobs, mockKpiData } from '../../utils/constants'
import { Job } from '../../types'

const Overview = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job)
  }

  const handleJobDoubleClick = (jobId: number) => {
    navigate(`/test-match-service/intelligence?jobId=${jobId}`)
  }

  const getMatchTypeClass = (matchType: string) => {
    return matchType.toLowerCase()
  }

  const getStatusClass = (status: string) => {
    return status
  }

  return (
    <>
      <Header
        title="Overview"
        subtitle="View and access previous match reports. Double-click any job to view its full report."
      />

      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <div className="kpi-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-label">Total Jobs Completed</h3>
            <p className="kpi-value">{mockKpiData.totalJobsCompleted}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-label">Total Records Processed</h3>
            <p className="kpi-value">{mockKpiData.totalRecordsProcessed.toLocaleString()}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-label">Average Match Rate</h3>
            <p className="kpi-value">{mockKpiData.averageMatchRate}%</p>
          </div>
        </div>
      </div>

      {/* Job List Section */}
      <div className="content-section">
        <div className="table-controls">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M15 15L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by file name..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <button className="filter-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>File Name</th>
                <th>Match Type</th>
                <th>Processed Date</th>
                <th>Match Rate</th>
                <th>Status</th>
                <th>Exported</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className={`job-row ${selectedJob?.id === job.id ? 'selected' : ''}`}
                  onClick={() => handleJobSelect(job)}
                  onDoubleClick={() => handleJobDoubleClick(job.id)}
                >
                  <td>
                    <input
                      type="radio"
                      name="job-select"
                      checked={selectedJob?.id === job.id}
                      onChange={() => handleJobSelect(job)}
                    />
                  </td>
                  <td>{job.id}</td>
                  <td>{job.fileName}</td>
                  <td>
                    <span className={`match-type-tag ${getMatchTypeClass(job.matchType)}`}>
                      {job.matchType}
                    </span>
                  </td>
                  <td>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: 'inline-block', marginRight: '4px' }}>
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {job.processedDate}
                  </td>
                  <td>{job.matchRate}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`export-status ${job.exported ? 'yes' : 'no'}`}>
                      {job.exported ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Details Panel */}
      {selectedJob && (
        <div className="job-details-panel">
          <div className="panel-header">
            <h2 className="panel-title">{selectedJob.fileName}</h2>
            <div className="panel-actions">
              <button className="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Export Job
              </button>
              <button
                className="btn-primary"
                onClick={() => navigate(`/test-match-service/intelligence?jobId=${selectedJob.id}`)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M5 5H11M5 8H11M5 11H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                View Full Report
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="detail-cards">
              <div className="detail-card">
                <h3 className="detail-card-title">Summary</h3>
                <div className="detail-item">
                  <span className="detail-label">Total Records:</span>
                  <span className="detail-value">500,000</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Matched Records:</span>
                  <span className="detail-value">457,000</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Match Rate:</span>
                  <span className="detail-value">{selectedJob.matchRate}</span>
                </div>
              </div>
              <div className="detail-card">
                <h3 className="detail-card-title">Source Details</h3>
                <div className="detail-item">
                  <span className="detail-label">Source Name:</span>
                  <span className="detail-value">Snowflake</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Source Path:</span>
                  <span className="detail-value">s3://snowflake/{selectedJob.fileName}</span>
                </div>
              </div>
              <div className="detail-card">
                <h3 className="detail-card-title">Export Details</h3>
                <div className="detail-item">
                  <span className="detail-label">Destination Name:</span>
                  <span className="detail-value">AWS S3</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Destination Path:</span>
                  <span className="detail-value">s3://exports/{selectedJob.fileName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Export Date:</span>
                  <span className="detail-value">2024-12-28 15:00:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Overview
