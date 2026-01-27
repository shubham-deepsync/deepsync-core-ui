import { useState } from 'react'
import Header from '../../components/layout/Header'

const Intelligence = () => {
  const [activeTab, setActiveTab] = useState<'clean-data' | 'identity-analysis' | 'enrich-data' | 'full-report'>('clean-data')
  const [distributionTab, setDistributionTab] = useState<'all' | 'selected'>('all')

  const tabs = [
    { id: 'clean-data', label: 'Clean Data' },
    { id: 'identity-analysis', label: 'Identity Analysis' },
    { id: 'enrich-data', label: 'Enrich Data' },
    { id: 'full-report', label: 'Full Report' },
  ]

  return (
    <>
      <Header
        title="Match Report Intelligence"
        subtitle="Metrics & Analytics Dashboard"
        actions={
          <>
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M5 5H11M5 8H11M5 11H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Saved Reports
            </button>
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M5 5H11M5 8H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Save Report
            </button>
            <button className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Export to PDF
            </button>
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V8L11 11M14 8C14 11.866 10.866 15 7 15C3.13401 15 0 11.866 0 8C0 4.13401 3.13401 1 7 1C10.866 1 14 4.13401 14 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Start Over
            </button>
            <button className="share-btn">Share</button>
          </>
        }
      />

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Clean Data Tab Content */}
      {activeTab === 'clean-data' && (
        <div className="tab-content active">
          {/* Clean & Hygiene Section */}
          <div className="metric-section">
            <div className="section-header">
              <div className="section-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h2 className="section-title">Clean & Hygiene</h2>
                <p className="section-description">Input data quality analysis and address validation.</p>
              </div>
            </div>
          </div>

          {/* Identity Resolution Section */}
          <div className="metric-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Identity Resolution</h2>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="metric-cards">
              <div className="metric-card">
                <div className="metric-value">7.2M</div>
                <div className="metric-label">TOTAL SOURCE IDS</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">4.8M</div>
                <div className="metric-label">TOTAL DEEP SYNC IDS</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">32.9%</div>
                <div className="metric-label">DEDUPLICATION RATE</div>
                <div className="metric-sublabel">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', marginRight: '4px' }}>
                    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" fill="currentColor"/>
                  </svg>
                  Lightning fast
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="progress-segment good" style={{ width: '85.1%' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" fill="currentColor"/>
                </svg>
                Good Data
                <span style={{ marginLeft: '8px' }}>85.1%</span>
              </div>
              <div className="progress-segment warning" style={{ width: '10.5%' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M8 2L12 14L4 14L8 2Z" fill="currentColor"/>
                </svg>
                Duplicates
                <span style={{ marginLeft: '8px' }}>10.5%</span>
              </div>
              <div className="progress-segment bad" style={{ width: '4.4%' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" fill="currentColor"/>
                </svg>
                Bad Data
                <span style={{ marginLeft: '8px' }}>4.4%</span>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <div>
                <strong style={{ color: 'var(--success-green)' }}>Good Data:</strong> 4,256,800 records
              </div>
              <div>
                <strong style={{ color: 'var(--warning-orange)' }}>Duplicates:</strong> 523,400 records
              </div>
              <div>
                <strong style={{ color: 'var(--error-red)' }}>Bad Data:</strong> 219,800 records
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <a href="#" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                View details
              </a>
            </div>
          </div>

          {/* Address Validation Section */}
          <div className="metric-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Address Validation</h2>
                <p className="section-description">USPS deliverability and address update analysis.</p>
              </div>
            </div>

            <div className="metric-cards">
              <div className="metric-card">
                <div className="metric-value">4,758,000</div>
                <div className="metric-label">Total Addresses Processed</div>
                <div className="metric-sublabel">94.5% matched</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">4,495,600</div>
                <div className="metric-label">Total Addresses Matched</div>
                <div className="metric-sublabel">Successfully validated</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">892,400</div>
                <div className="metric-label">Updatable Addresses</div>
                <div className="metric-sublabel">18.8% of total (Lower is better)</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">4,495,600</div>
                <div className="metric-label">Deliverable Addresses</div>
                <div className="metric-sublabel">94.5% USPS validated</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Identity Analysis Tab Content */}
      {activeTab === 'identity-analysis' && (
        <div className="tab-content active">
          <div className="identity-analysis-layout">
            {/* Left column: Identity Resolution, Match Rank Filter, Match Type Distribution */}
            <div className="identity-analysis-left">
              {/* Identity Resolution & Linking Section */}
              <div className="metric-section">
                <div className="section-header">
                  <div className="section-icon purple">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L22 8V16L12 22L2 16V8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
                      <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="section-title">Identity Resolution & Linking</h2>
                    <p className="section-description">Match accuracy analysis and identity graph connections</p>
                  </div>
                </div>
              </div>

              {/* Match Rank Filter */}
              <div className="match-rank-filter">
                <div className="filter-header">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--text-secondary)' }}>
                    <path d="M2 4H18M4 8H16M6 12H14M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3 className="filter-title">Match Rank Filter</h3>
                  <div className="filter-details">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>28/28 ranks • 633,560 records</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="filter-links">
                      <a href="#" className="filter-link">Deselect All</a>
                      <a href="#" className="filter-link">Show</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Type Distribution */}
              <div className="match-distribution">
            <h3 className="section-title" style={{ marginBottom: '16px' }}>Match Type Distribution</h3>
            <div className="distribution-tabs">
              <button
                className={`distribution-tab ${distributionTab === 'all' ? 'active' : ''}`}
                onClick={() => setDistributionTab('all')}
              >
                All Matches
              </button>
              <button
                className={`distribution-tab ${distributionTab === 'selected' ? 'active' : ''}`}
                onClick={() => setDistributionTab('selected')}
              >
                Selected Match Types Only
              </button>
            </div>

            <div className="chart-container">
              <div className="pie-chart-placeholder">
                <svg width="400" height="400" viewBox="0 0 400 400" style={{ maxWidth: '100%', height: 'auto' }}>
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <g filter="url(#shadow)">
                    <path d="M 200 200 L 200 50 A 150 150 0 0 1 267.5 50 Z" fill="#3b82f6" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 267.5 50 A 150 150 0 0 1 320 100 Z" fill="#8b5cf6" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 320 100 A 150 150 0 0 1 350 200 Z" fill="#10b981" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 350 200 A 150 150 0 0 1 320 300 Z" fill="#f59e0b" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 320 300 A 150 150 0 0 1 267.5 350 Z" fill="#ef4444" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 267.5 350 A 150 150 0 0 1 200 350 Z" fill="#06b6d4" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 200 350 A 150 150 0 0 1 132.5 350 Z" fill="#ec4899" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 132.5 350 A 150 150 0 0 1 80 300 Z" fill="#14b8a6" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 80 300 A 150 150 0 0 1 50 200 Z" fill="#a855f7" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 50 200 A 150 150 0 0 1 80 100 Z" fill="#6366f1" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 80 100 A 150 150 0 0 1 132.5 50 Z" fill="#f97316" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 132.5 50 A 150 150 0 0 1 200 50 Z" fill="#22c55e" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 200 50 A 150 150 0 0 1 250 80 Z" fill="#84cc16" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 250 80 A 150 150 0 0 1 290 130 Z" fill="#eab308" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 290 130 A 150 150 0 0 1 310 180 Z" fill="#64748b" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 310 180 A 150 150 0 0 1 320 200 Z" fill="#475569" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 320 200 A 150 150 0 0 1 310 250 Z" fill="#334155" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 310 250 A 150 150 0 0 1 280 290 Z" fill="#1e293b" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 280 290 A 150 150 0 0 1 240 320 Z" fill="#0f172a" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 240 320 A 150 150 0 0 1 200 350 Z" fill="#3b82f6" stroke="white" strokeWidth="2" opacity="0.7"/>
                    <path d="M 200 200 L 200 350 A 150 150 0 0 1 160 320 Z" fill="#8b5cf6" stroke="white" strokeWidth="2" opacity="0.7"/>
                  </g>
                  <circle cx="200" cy="200" r="100" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
                  <text x="200" y="190" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1f3a">Match Types</text>
                  <text x="200" y="215" textAnchor="middle" fontSize="14" fill="#6b7280">Distribution</text>
                </svg>
              </div>
              <div className="legend-container">
                {[
                  'Credit Card Matching',
                  'Exact First Name + Exact Last Name + Store Location',
                  'Exact First Name + Fuzzy Last Name + Store Location',
                  'First Name + Last Name + Addr1 + Zip',
                  'First Name + Last Name + Email',
                  'First Name + Last Name + Fuzzy Addr1',
                  'First Name + Last Name + Phone',
                  'First Name + Last Name + Postal',
                  'First Name + Last Name + Street Name',
                  'Fuzzy Email',
                  'Fuzzy First Name + Exact Last Name + Store Location',
                  'Fuzzy First Name + Fuzzy Last Name + Addr1 + Zip',
                  'Fuzzy First Name + Fuzzy Last Name + Email',
                  'Fuzzy First Name + Fuzzy Last Name + Phone',
                  'Fuzzy First Name + Fuzzy Last Name + Postal',
                  'Fuzzy First Name + Fuzzy Last Name + Street Name',
                  'Fuzzy First Name + Last Name + Addr1 + Zip',
                  'Fuzzy First Name + Last Name + Email',
                  'Fuzzy First Name + Last Name + Phone',
                  'Fuzzy First Name + Last Name + Postal',
                  'Fuzzy First Name + Last Name + Street Name',
                ].map((label, index) => {
                  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#14b8a6', '#a855f7', '#6366f1', '#f97316', '#22c55e', '#84cc16', '#eab308', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#3b82f6', '#8b5cf6']
                  return (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></div>
                      <span className="legend-label">{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', marginTop: '16px' }}>
              Use the Match Rank Filter above to toggle specific match types and see how they affect the overall distribution and stats.
            </p>
          </div>
            </div>

            {/* Right column: Summary Statistics */}
            <div className="identity-analysis-right">
              <div className="stats-panels stats-panels-vertical">
                <div className="stat-panel">
                  <div className="stat-panel-title">TOTAL CUSTOMERS</div>
                  <div className="stat-panel-value">4,800,000</div>
                  <div className="stat-panel-subtitle">Total records processed</div>
                </div>
                <div className="stat-panel">
                  <div className="stat-panel-title">TOTAL CUSTOMERS MATCHED</div>
                  <div className="stat-panel-value">633,550</div>
                  <div className="stat-panel-subtitle">13.2% of total customers</div>
                  <div className="stat-panel-progress">
                    <div className="stat-panel-progress-bar blue" style={{ width: '13.2%' }}></div>
                  </div>
                </div>
                <div className="stat-panel">
                  <div className="stat-panel-title">UNIQUE DEEP SYNC IDs</div>
                  <div className="stat-panel-value">
                    579,064
                    <span className="growth-indicator">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill="currentColor"/>
                      </svg>
                      +2.3%
                    </span>
                  </div>
                  <div className="stat-panel-subtitle">91.4% match rate</div>
                  <div className="stat-panel-progress">
                    <div className="stat-panel-progress-bar purple" style={{ width: '91.4%' }}></div>
                  </div>
                  <div className="stat-panel-details">
                    <div className="stat-detail-item">
                      <span className="stat-detail-label">Households Linked:</span>
                      <span className="stat-detail-value">536,983 (84.6%)</span>
                    </div>
                    <div className="stat-detail-item">
                      <span className="stat-detail-label">Total Identity Nodes:</span>
                      <span className="stat-detail-value">2,335,418</span>
                    </div>
                    <div className="stat-detail-item">
                      <span className="stat-detail-label">Avg Identifiers per DS_ID:</span>
                      <span className="stat-detail-value">4.04</span>
                    </div>
                    <div className="stat-detail-item">
                      <span className="stat-detail-label">Multi-Device Households:</span>
                      <span className="stat-detail-value">67.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Identifier Metrics */}
          <div className="identifier-metrics">
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Identifier Metrics</h2>
            <div className="distribution-tabs">
              <button
                className={`distribution-tab ${distributionTab === 'all' ? 'active' : ''}`}
                onClick={() => setDistributionTab('all')}
              >
                All Matches
              </button>
              <button
                className={`distribution-tab ${distributionTab === 'selected' ? 'active' : ''}`}
                onClick={() => setDistributionTab('selected')}
              >
                Selected Match Types Only
              </button>
            </div>
            <table className="metrics-table">
              <thead>
                <tr>
                  <th className="sortable">Attribute Type</th>
                  <th>Records Matched</th>
                  <th>Records Appended</th>
                  <th className="sortable">Match Rate</th>
                  <th>Avg per Record</th>
                  <th>Coverage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Names', matched: '618,016 / 633,550', appended: '580,153', rate: 97.5, avg: 1.1, coverage: 'excellent' },
                  { type: 'Phones', matched: '584,521 / 633,550', appended: '549,501', rate: 92.3, avg: 1.9, coverage: 'excellent' },
                  { type: 'Mobile Advertising IDs (MAIDs)', matched: '572,219 / 633,550', appended: '534,550', rate: 90.3, avg: 2.4, coverage: 'excellent' },
                  { type: 'Email Addresses', matched: '571,831 / 633,550', appended: '539,682', rate: 90.3, avg: 1.8, coverage: 'excellent' },
                  { type: 'Physical Addresses', matched: '568,919 / 633,550', appended: '533,829', rate: 89.8, avg: 1.1, coverage: 'good' },
                  { type: 'IP Addresses', matched: '562,331 / 633,550', appended: '502,318', rate: 87.2, avg: 3.1, coverage: 'good' },
                  { type: 'UID2s', matched: '414,345 / 633,550', appended: '377,023', rate: 65.4, avg: 1.2, coverage: 'fair' },
                ].map((row, index) => (
                  <tr key={index}>
                    <td><strong>{row.type}</strong></td>
                    <td>{row.matched}</td>
                    <td>{row.appended}</td>
                    <td>
                      {row.rate}%
                      <div className="match-rate-bar">
                        <div className="match-rate-fill" style={{ width: `${row.rate}%` }}></div>
                      </div>
                    </td>
                    <td>{row.avg}</td>
                    <td>
                      <span className={`coverage-badge ${row.coverage}`}>
                        {row.coverage.charAt(0).toUpperCase() + row.coverage.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enrich Data Tab Content */}
      {activeTab === 'enrich-data' && (
        <div className="tab-content active">
          <div className="metric-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Enrich Data</h2>
                <p className="section-description">Data enrichment and enhancement metrics coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Report Tab Content */}
      {activeTab === 'full-report' && (
        <div className="tab-content active">
          <div className="metric-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Full Report</h2>
                <p className="section-description">Complete report view coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Intelligence
